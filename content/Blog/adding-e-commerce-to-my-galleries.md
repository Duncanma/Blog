---
date: 2024-05-04T18:47:17-07:00
title: Adding some e-commerce to my galleries
type: posts
tags:
 - Web Development
 - Coding
 - Stripe
 - Photography
images:
 - /images/photo-gallery/buy-links.png
description: As a weekend project, I decided to try coding against Stripe and adding the ability to buy original versions of my photos.
blueskyPostID: 3lbn5af5mp227
---
{{% note %}}This is a follow-up to my last post on [creating a photo gallery feature for my site](/blog/adding-photo-galleries/), so it might be worth a quick skim if you haven't read it before.{{% /note %}}

What if I wanted to integrate with Stripe to let people buy these photos? I don’t really need to make money from this hobby, but I’ve had a few people comment that various images would make great wall art, and I’ve wanted to try coding against Stripe’s APIs for real, so… here goes.

There are services that could do all of this for me and offer more features like producing prints or framed pieces, but that’s not my motivation here. I want to try designing and building something for this myself, I want to build something using Stripe and it’s fun!

I’ve read many of the pages on <docs.stripe.com>, but it’s different digging in with an actual goal in mind. As usual, I started with a quick requirements list.

- I’d like to enable someone to request an original quality version of my photos in my galleries.
- I currently don’t run any code on the backend of my website, it’s all static HTML, and I’d like to keep it that way.
- To start with, I don’t think I need a cart, one photo at a time is fine.
- No need for any configurable options (image size, prints vs. digital) just a simple “buy the original digital file”.

The second requirement in that list, that I want to do this with just a static website, points me towards a solution, [Payment Links](https://docs.stripe.com/payment-links). This Stripe feature lets me create a URL that will take the user through a complete checkout experience without having to write any code or deploy anything to my site. I can create these links manually, using the Stripe dashboard, which I will do a couple times to experiment with, or with the API. Given how many images I have and the way I am trying to automate processing them, the API will be the better way to go long term.

Reading the docs on [Products & Prices](https://docs.stripe.com/products-prices/overview), the API to create a payment link needs a Price object… and the API to create a Price object takes a Product. I think I have it clear, I’ll need to make a Product for each image I want to be able to sell, then create a Price for each one, and finally create a Payment Link… which will give me a URL I can use on the site (or anywhere else, like Instagram, Twitter/Bluesky, etc.). There are more options, I can create coupon codes to give people discounts, create additional prices for a given product, etc. but for now I think Product -> Price -> Payment Link is what I need.

![Products have prices, and prices can have payment links](/images/photo-gallery/Product-Price-PaymentLink.png)

## Uniquely identifying each image

To enable this new purchasing system, I’ll need to be able to uniquely identify each picture. The names I’ve been generating for the compressed and resized images are not unique and are just based on the index of each image inside its album (flowers-01, flowers-02, etc.). Tying that back to the specific *original* image could be done by comparing image data, such as the time the photo was taken, but I would prefer a more precise value that is easier to use in code. I decided to take the date/time of the photo, and combine it with the original file name (which comes out of the camera, and changes even if I take multiple pictures within a single second), and then hash that whole string into a new unique ID. This is not a method of encryption, just a way to get a nice searchable/indexable hash.

### Generating the identifying string

```csharp
string sourceID = $"{imageDate:u}{title}";
sourceID = CreateHashedID(sourceID);

private static string CreateHashedID(string sourceID) {
    System.Security.Cryptography.HMACMD5 hmac
        = new (Encoding.ASCII.GetBytes(hashKey));

    var hash = hmac.ComputeHash(Encoding.ASCII.GetBytes(sourceID));
    var sBuilder = new StringBuilder();

    // Loop through each byte of the hashed data
    // and format each one as a hexadecimal string.
    for (int i = 0; i < hash.Length; i++) {
        sBuilder.Append(hash[i].ToString("x2"));
    }

    // Return the hexadecimal string.
    sourceID = sBuilder.ToString();
    return sourceID;
}
```

My next step was to modify my gallery creation code to also upload a copy of the original file, to a non-publicly-accessible location in Azure Blob Storage, so that I can later access it to fulfill orders. While I was adding an upload for that single original file, I updated the code to upload the generated files as well (I was uploading them manually up to this point).

```csharp
private static void uploadToAzure(
      string localFilePath,
      string containerName,
      string cloudPath) {

    BlobServiceClient serviceClient
        = new BlobServiceClient(azureConnectionString);
    BlobContainerClient containerClient
        = serviceClient.GetBlobContainerClient(containerName);

    string fileName = Path.GetFileName(localFilePath);
    string blobName = cloudPath + "/" + fileName;

    BlobClient blobClient = containerClient.GetBlobClient(blobName);
    blobClient.Upload(localFilePath, true);
}
```

## Creating the Stripe objects for each image

One complication here is that I want to specify which images are *not* available for sale.

Some of my photos are not suitable for purchase because:

- The original is low quality, so there’s no benefit beyond the version already available (I’ll also add a check for that based on resolution), or
- It’s a photo of a person or location where I either would need permission, or it seems inappropriate to offer it for sale, or
- It’s a personal photo that I’m happy to share online but wouldn’t feel comfortable with someone purchasing to create a large print (or use in their own creations).

I make the calls to Stripe as part of generating each gallery but checking against a list of images “not for sale". For each of the rest of the images, we are going to turn each of them into a Stripe Product in my account. Using the unique ID, we’ll check if a product already exists, and if so, just skip the creation. This allows us to run this code on the same input more than once without creating duplicate products.

{{% note %}}Making calls to Stripe, using their .NET SDK, requires an API Key. I'm using a [Restricted Access Key](https://docs.stripe.com/keys#limit-access), limited to only being able to read and write Products, Prices and Payment Links as a second layer of security. Even if this key leaked, it has limited ability to cause trouble, and having a distinct key for different parts of my system means it is easy to roll (replace with a new key and deactivating the leaked one) just this key without impacting the rest of my code. In my next article, [order fulfillment](/blog/order-fulfillment/), I use a different key with the set of permissions required for that code.

![image of the key management area of the Stripe dashboard, showing the two restricted keys](/images/photo-gallery/restricted-access-key-gallery.png){{% /note %}}

This was my first attempt to write this code:

```csharp
var productService = new ProductService();

Product? product;

ProductGetOptions productGetOptions
    = new ProductGetOptions();
productGetOptions.AddExpand("default_price");

try {
    product = productService.Get(pictureId, productGetOptions);
}
catch {
    product = null;
}

if (product is null) {
    var productOptions = new ProductCreateOptions
    {
        Name = pictureTitle,
        Id = pictureId,
        Images = new List<string>() { stripeThumbnail },
        Type = "good",
        TaxCode = "txcd_10501000",
    };

    productOptions.AddExpand("default_price");

    string captionToAppend = "";
    if (!string.IsNullOrWhiteSpace(caption)) {
        captionToAppend = $"({caption})";
    }
    productOptions.Description =
        "Original digital file for this photograph, JPEG format, "  +
        $"uncompressed and {width}px x {height}px. {fileSize}MB. " +
        $"Suitable for large format printing. {captionToAppend}";

    product = productService.Create(productOptions);
}
```

After running this code for a while, I was spending some time on the Stripe dashboard, and was quite alarmed to see red spikes of API failures in the [workbench](https://beta.stripe.dev/?step=workbench) (this is an opt-in beta feature, at the moment). My code, which checked if a product exists by just trying to retrieve it, was (correctly) seen as an error.

![image of a recent error, a resource not found](/images/photo-gallery/recent-error.png)

This bothered me, because I find the recent error list a useful way to spot issues, but by filling it with ‘intentional errors’ I will start to ignore it. I rewrote my code, to pull all my products down into a local dictionary at the start of running my code, then I can retrieve the product I need (and check if it exists) without a failed API call.

```csharp
static Dictionary<string, Product> products
    = new Dictionary<string, Product>();

private static void LoadProducts() {
    var service = new ProductService();
    var options = new ProductListOptions {
        Expand = ["data.default_price"],
        Limit = 100
    };

    // Synchronously paginate
    foreach (var product in service.ListAutoPaging(options)) {
        products.Add(product.Id, product);
    }
}
```

And then replacing my previous product fetching code with

```csharp
if (products.ContainsKey(pictureId)) {
    product = products[pictureId];
}
```

It is debatable if this is an improvement. Avoiding a small # of errors by transferring a much larger amount of data? The exact # of failed calls and the quantity of products in your system could impact the decision here, or you may find [the search API](https://docs.stripe.com/api/pagination/search) a more useful way to pull back only the relevant products.

For each product, I create a $20 Price object, and then a Payment Link.

Price first:

```csharp
Price price;

if (product.DefaultPrice != null) {
    price = product.DefaultPrice;
}
else {
    var priceService = new PriceService();

    var priceOptions = new PriceCreateOptions {
        Nickname = "Original Image File Download",
        Currency = "usd",
        UnitAmount = 2000,
        Product = product.Id
    };

    price = priceService.Create(priceOptions);

    productService.Update(product.Id,
        new ProductUpdateOptions { DefaultPrice = price.Id });
}
```

Then the PaymentLink:

```csharp
var paymentLinkService = new PaymentLinkService();
PaymentLink paymentLink;

if (product.Metadata.ContainsKey("payment_link")) {
    paymentLink
        = paymentLinkService.Get(product.Metadata["payment_link"]);
}
else {
    var paymentLinkOptions = new PaymentLinkCreateOptions {
        LineItems = new List<PaymentLinkLineItemOptions> {
                new PaymentLinkLineItemOptions {
                    Price = price.Id,
                    Quantity = 1,
                },
            },
        AllowPromotionCodes = true
    };

    paymentLink = paymentLinkService.Create(paymentLinkOptions);
    productService.Update(product.Id,
        new ProductUpdateOptions {
            Metadata = new Dictionary<string, string>
            { { "payment_link", paymentLink.Id } } });
}

return paymentLink.Url;
```

Another little trick here is that I save the payment link Id back into the product’s data. While you can have many prices for a product and many payment links for any given price, I only have one of each and I want to avoid creating duplicates. Once again, there could be a better way to handle this with Stripe's APIs, but this seemed reasonable and is working for me.

Finally, I save the URL of the Payment Link back into my json file. This will be [checked into my GitHub repo](https://github.com/Duncanma/Blog/blob/main/content/albums/brooklyn-bridge.md?plain=1), but it isn’t a secret… if people want to grab it and buy a bunch of my pictures, that’s cool with me.

## Adding these links to my site

It’s easy to slap a “Buy” link on every image, but selling these photos is not the real purpose of the site, so anything obvious will take away from the aesthetics. I could add it only in the zoomed image view, but that’s not discoverable to someone just browsing. I had a couple of ideas of how to handle this.

- Some JavaScript that turned the “buy” links on/off, which bothers my “no JavaScript” ideals, but it would work well, or
- Generating a second page for each album that lists the images for sale and provides the link. That is consistent with my approach to the rest of the site, but it’s a bunch of extra pages.

In the spirit of progressive enhancement, I’m going to go with both, a separate page *and* the ability to toggle links on the normal album view. If you have JavaScript, you get the option to show the purchase links right on the page, otherwise you can click to see a page with them turned on by default.

I’m not going to go into all the work around this, but if you are curious, you can check out the ‘singleImage.html’ partial and the ‘click-to-buy’ JavaScript file in my blog’s GitHub repo. Or ask me (contact info on the homepage) and I’ll write more about topics that seem interesting to folks!

The finished result is, when someone wants to, they can get to a view of my photos with “Buy original image” links on any that are available for sale.

![a narrow view of one of my albums, with the buy buttons visible](/images/photo-gallery/buy-links.png)

To provide the no-JS fallback, a page like [Olives & Spices](/albums/olives-and-spices/) also has a [purchase.html version](/albums/olives-and-spices/purchase.html) with the only difference that all the buy links are visible by default. This is accomplished with some CSS and a ‘noJS’ class on the `<body>` element.

## Order fulfillment

If I stopped there, I’d have a functional method to sell photos. In my Stripe dashboard, I could see a list of completed payments, and I could then manually email the original image to customers. Keeping track on my own, of which orders had been fulfilled. This is a fine solution, but I’m not excited about it. I don’t expect a lot of orders, so it isn’t the manual work that concerns me (in fact, coding up a solution here could be more work than processing a handful of orders), but the fact that it depends on me taking manual action on a regular basis. I get busy or travel, and suddenly people have paid me $ and are not happy with the service. What I want instead is for this to be completely automated, someone orders a picture at 2am, they get what they paid for within a few hours, I check the Stripe dashboard whenever I have time and see a list of happy orders.

It feels like I’ve covered a lot in this article already, so I’m going to break out the [order fulfillment into its own piece](/blog/order-fulfillment/).
