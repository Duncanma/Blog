---
date: 2024-05-05T12:38:55-07:00
title: Order fulfillment with Azure Functions and Stripe
type: posts
tags:
 - Web Development
 - Coding
 - Stripe
 - Photography
 - Azure
images:
 - /images/photo-gallery/azure-function-diagram.png
description: As the final step in my series on adding photo galleries to my site, I explain how I use Azure Functions to process incoming orders.
---

In the previous articles in this series, I covered how I [added photo galleries to my site](/blog/adding-photo-galleries), and then [how I enabled a feature to buy the original digital photo](/blog/adding-e-commerce-to-my-galleries). The last piece (for now at least) is how I automate delivery of those high-resolution images, so that everything *should* just happen without any manual steps.
There might be a better way to handle this, but after reading even more pages on [Stripe Docs](https://docs.stripe.com), I decided to create a system using three [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-csharp).

![Diagram of the steps in my 3 Azure Functions, also described in the following paragraph](/images/photo-gallery/azure-function-diagram.png)

First there would be an Azure Function triggered by a Stripe webhook, telling me a payment had successfully completed. That function would queue up a message with all the necessary info to process the order.

Another function would respond to that queued message by creating a customer-specific, time-limited URL to the original image and queuing up a message for use by the third and final function.

That last function would be responsible for sending the customer the link to the image using an email service.

{{% note %}}Just a note: I was going to use SendGrid for this, but when I tried to sign up with my Google account (one of the options they provided), I received an error and then an email (just moments later) saying “We appreciate your interest in Twilio SendGrid and your efforts in completing our account creation process. After a thorough review, we regret to inform you that we are unable to proceed with activating your account at this time.” I tried to sign in with a different account, but it wouldn’t stop auto-logging me in and showing me the same error. I moved onto using Azure’s own [Email Communication Service](https://learn.microsoft.com/en-us/azure/communication-services/).{{% /note %}}

Why three distinct functions instead of doing it all in response to the webhook? Mostly because that’s how I like to code, giving me independent blocks of functionality that I can test and monitor independently, but also because they really are distinct actions. If my email integration fails, I won’t have to write my code to handle a partial execution case (have I already created the image?), and it should be easier to get things running again. Another benefit here is that my response to the Stripe webhook returns as quickly as possible, which is good in this case because the hosted checkout process blocks (for up to 10 seconds) on the webhook.

## Receiving the Stripe webhook

Stripe provides a way to run code when events happen with your integration, you can register a URL and select which events you wish to be sent, and whenever one of these events occurs, you'll get a message POSTed to you. My scenario, [fulfilling orders after a checkout, is exactly covered by a tutorial on Stripe Docs](https://docs.stripe.com/payments/checkout/fulfill-orders), so I followed these steps (including testing with the Stripe CLI) almost exactly. I did have to change the code a bit, because it was written as if I was spinning up a regular ASP.NET web application and I wanted to use Azure Functions. Similar to AWS's Lambda, this feature allows me to write small bits of code that respond to triggers such as HTTP requests or new items being added to a Queue.

The whole function (all 3 functions) is available on GitHub in [Functions.cs](https://github.com/Duncanma/PhotoWebhooks/blob/main/Functions.cs), but I'll go through it in pieces here.

First, I have the function signature that identifies that it should respond to a HTTP POST request as it's trigger.

```csharp
[FunctionName("CheckoutComplete")]
public static async Task<IActionResult> checkoutComplete(
    [HttpTrigger(
        AuthorizationLevel.Function,
        "post", Route = null)] HttpRequest req,
    ILogger log)
{
}
```

Setting up the SDK involves passing in an API key, which I store in application settings in Azure & as a 'user secret' when debugging locally, so that it is never checked into Git.

```csharp
//get stripe key
var stripeKey
    = Environment.GetEnvironmentVariable("StripeKey");
var webhookSigningSecret
    = Environment.GetEnvironmentVariable("WebhookSigningSecret");
string connectionString
    = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
```

I'm using a [Restricted Access Key](https://docs.stripe.com/keys#limit-access), limited to only being able to read Checkout Sessions as a second layer of security. Even if this key leaked, it has limited ability to cause trouble, and having a distinct key for each part of my system means it is easy to roll (replace with a new key and deactivating the leaked one) just this key without impacting the rest of my code.

![image of the key management area of the Stripe dashboard, showing the two restricted keys](/images/photo-gallery/restricted-access-key-functions.png)

Then, following [the instructions from the documentation](https://docs.stripe.com/webhooks#verify-official-libraries), I use the Stripe .NET SDK and the webhook signing secret (which I can get from the Stripe Dashboard, and in this case have it saved in the application settings) to validate that this is really a message *from* Stripe.

```csharp
string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
StripeConfiguration.ApiKey = stripeKey;

var stripeEvent = EventUtility.ConstructEvent(
    requestBody,
    req.Headers["Stripe-Signature"],
    webhookSigningSecret
);
```

`ConstructEvent` will throw an error if this is an invalid event (protecting me against someone just posting a fake event against this endpoint), in the full code I have a `try..catch` around this to handle that case (not showing here just for simplicity). After that, now that I have this `stripeEvent` object, I check if it is the type of event I can handle, [`checkout.session.completed`](https://docs.stripe.com/api/events/types#event_types-checkout.session.completed), retrieve the full session including the individual line items (there will only be one in my case) using the Stripe SDK.

```csharp
if (stripeEvent.Type == Events.CheckoutSessionCompleted)
{
    log.LogInformation(
        $"Checkout Session Completed Event: {stripeEvent.Id}");

    var session = stripeEvent.Data.Object as Session;
    var options = new SessionGetOptions();
    options.AddExpand("line_items");

    var service = new SessionService();
    Session sessionWithLineItems = service.Get(session.Id, options);
    StripeList<LineItem> lineItems = sessionWithLineItems.LineItems;
```

With the session and the line item, I validate that I have the information I need (the product ID, customer email and their name if available), and create an object to push into a Queue for the next function.

```csharp
//get the product id, create an object to pass to the next step
//productId, Customer Email, Customer Name (optional)
//put into a queue
if (lineItems != null
    && lineItems.Count() == 1
    && session.CustomerDetails != null
    && session.CustomerDetails.Email != null)
{
    var lineItem = lineItems.First();
    var productId = lineItem.Price.ProductId;
    var customerEmail = sessionWithLineItems.CustomerDetails.Email;
    var customerName = sessionWithLineItems.CustomerDetails.Name;
    if (customerName == null) {
        customerName = customerEmail;
    }
    IncomingOrder order
        = new IncomingOrder() {
            CustomerEmail = customerEmail,
            CustomerName = customerName,
            ProductId = productId };
    string message = JsonSerializer.Serialize(order);
    await queueClient.SendMessageAsync(message);
}
else
{
    string message = $"Insufficient details on session {session.Id}";
    log.LogError(message);
    throw new Exception(message);
}
```

At this point, the function returns a 200 OK message, and the webhook handling work is done. By pushing a message into my incoming order queue, the next Function will get triggered.

## Get the image and create a custom link

The second function is setup with a QueueTrigger, which means it is called whenever a new message arrives in a specific Azure Storage Queue.

```csharp
[FunctionName("ProcessOrder")]
public static async Task processOrder(
    [QueueTrigger(
        incomingQueue,
        Connection = "AZURE_STORAGE_CONNECTION_STRING")
    ] string queueMessage,
    ILogger log)
```

There isn't any Stripe specific code in this function, I just need to find the right original image, create a link so that it can be retrieved for the next 30 days, and send that link along with the customer information to another Queue.

```csharp
IncomingOrder order
    = JsonSerializer.Deserialize<IncomingOrder>(queueMessage);

log.LogInformation(
    $"Process Order Called : {order.ProductId} {order.CustomerEmail}");
```

Retrieving the image relies on the way I structured my products and files. I created a unique ID for each image back in the previous article, then used that ID for the product and for the filename of the original image.

```csharp
//fetch image blob
string imageFile = $"{order.ProductId}.jpg";

BlobServiceClient blobServiceClient
    = new BlobServiceClient(connectionString);
BlobContainerClient containerClient
    = blobServiceClient.GetBlobContainerClient("originals");
BlobClient blobClient
    = containerClient.GetBlobClient(imageFile);
```

The original images are stored in a private blob container, so a direct link to them won't work. Instead, I create a SAS (Shared Access Signature) based link that has a time limit. This doesn't prevent someone from downloading the file once and re-sharing, but I am not that concerned right now. I could always add in some more security measures if I end up selling some photos!

```csharp
//create a unique URL to the image for this customer, with 30-day expiry
Azure.Storage.Sas.BlobSasBuilder builder
    = new Azure.Storage.Sas.BlobSasBuilder(
        Azure.Storage.Sas.BlobSasPermissions.Read,
        DateTimeOffset.Now.AddDays(30));

builder.ContentDisposition = $"attachment; filename={imageFile}";

var imageURL = blobClient.GenerateSasUri(builder);
```

With the image URL created, I add that to the incoming order message and send it along to the 2nd and final step, sending email.

```csharp
//add to the order, using my custom domain
order.ImageURL
    = imageURL.ToString().Replace(
        "https://duncanmackenzieblog.blob.core.windows.net/originals/",
        "https://originals.duncanmackenzie.net/");

string message = JsonSerializer.Serialize(order);
await queueClient.SendMessageAsync(message);
```

## Create an email message and send it to the customer

This last step is using a whole new Azure product I had never tried before, and it involved setting a custom email domain, creating various DNS records and more. I'm not going to go into all of that, but [the docs are available](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?tabs=windows%2Cconnection-string&pivots=programming-language-csharp) (on the site I used to work on in my last job). It does take some time though, getting it all set up and working correctly.

Once the service was ready though, the code has only a couple steps.

Another function signature, again using the Queue trigger.

```csharp
[FunctionName("SendLink")]
public static async Task sendLink(
    [QueueTrigger(sendEmailQueue,
    Connection = "AZURE_STORAGE_CONNECTION_STRING")
    ] string queueMessage,
    ILogger log)
```

Then I create an instance of the email service, after getting the incoming object.

```csharp
IncomingOrder order
    = JsonSerializer.Deserialize<IncomingOrder>(queueMessage);

log.LogInformation(
    $"Request to send message: {order.ProductId} {order.CustomerEmail}");

string connectionString
    = Environment.GetEnvironmentVariable("EmailServiceConnectionString");

var emailClient = new EmailClient(connectionString);
```

I construct both an HTML and plain text version of my message. This is a bit messy, I should pull the message text out as a pair of string resources, but it works for now.

```csharp
string htmlMessage = "<html><h1>Your photo order</h1>" +
    "<p>Thank you for your order from DuncanMackenzie.net.</p>" +
    $"<p>To <a href=\"{order.ImageURL}\">retrieve the full size" +
    " version of your photo, click this link</a>. " +
    "The file will be large, but should download to your device.</p>" +
    "<p>Once downloaded, you should save this image somewhere safe, " +
    "as this link will only work for 30 days.</p>" +
    "<p>If you have any questions, please feel free to email me " +
    "at <a href=\"mailto:support@duncanmackenzie.net\">" +
    "support@duncanmackenzie.net</a></p>" +
    "</html>";

string plainMessage = "Your photo order\n\n" +
    "Thank you for your order from DuncanMackenzie.net.\n" +
    "To retrieve the full size version of your photo, "
    + $"click this link: {order.ImageURL} \n\n" +
    "The file will be large, but should download to your device.\n" +
    "Once downloaded, you should save this image somewhere safe, " +
    "as this link will only work for 30 days.\n\n" +
    "If you have any questions, please feel free to email"
    + "me at support@duncanmackenzie.net\n\n";
```

Finally, I use the customer's email, create the right email objects, and send it off.

```csharp
EmailRecipients recipients = new EmailRecipients();
recipients.To.Add(
    new EmailAddress(order.CustomerEmail, order.CustomerName));
recipients.BCC.Add(
    new EmailAddress("support@duncanmackenzie.net", "Support"));

EmailContent content
    = new EmailContent("Your photo order from DuncanMackenzie.net");
content.PlainText = plainMessage;
content.Html = htmlMessage;

EmailMessage messageToSend
    = new EmailMessage("DoNotReply@messaging.duncanmackenzie.net",
    recipients, content);

await emailClient.SendAsync(WaitUntil.Started, messageToSend);
```

That's it. It ignores a few possible issues, what if the customer's email is incorrect or if the email fails to deliver for other reasons, for example. I can use the Stripe dashboard to compare completed orders with my own data on emails sent and look for issues as a manual process, and perhaps I might add in some more checks in the future. The email client returns an operation ID that [I could use to check for delivery issues](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?tabs=windows%2Cconnection-string&pivots=programming-language-csharp#getting-email-delivery-status) as a start.

## Wrapping it up

In creating this system, and then again in writing this article, I can see many ways to improve or add to it. I find this to be normal with any project, but it is important not to let it stop you from shipping. This code, the v1 as it were, works in my limited testing. If I end up getting tons of orders and that reveals some issues, well that's a nice problem to have and I'll evolve this code and process as needed.

Feel free to checkout [my photo albums](/albums), and since you made it this far, I've created a promo code, `THANKSFORREADING`, that will give you 50% off any image you want to buy.
