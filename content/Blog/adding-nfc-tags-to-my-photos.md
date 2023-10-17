---
date: 2022-11-28T14:39:41-08:00
title: Adding NFC tags to my photos
type: posts
tags:
- Photography
- Hugo
- NFC
- Home Automation
featured: true
description: A not super useful experiment to add NFC tags to the various photos around home.
---

I like to take pictures, way too many pictures, and I love putting them up as part of our home decor. Most of my favorite images come from our various trips to interesting places, and even when the picture is mostly focused on a family member it was probably taken somewhere interesting.

Sometimes people ask me where a particular shot is from, when was I there, or what is in that photo, and I am proud to say that most of the time I can just tell them off the top of my head. The other day though, I was looking at a photo of an inscribed flagstone, and I thought it was from [Chartres, France](https://en.wikipedia.org/wiki/Chartres). I was partially right in that it was from outside of a cathedral, but it was from Segovia, Spain. This bit of confusion led me to thinking that I should figure out a way to label my photos.

## Proactively compensating for my own poor memory

My first thought was something small in the bottom corner of the frame, like a classy gallery info box, but I decided it would look cruddy. Next idea was to just add something to the back of the frame, like writing the location and date on the back of a photo print. That would work, and it wouldn't take away from the appearance of the photo, but looking at it means taking the picture off the wall. Not a great option. I started thinking that a better idea would be to have the info on my web site, and to just link to it. A QR code seemed easy, but it has all the same issues as some sort of label or caption. No way to make it visible without detracting from the appearance of the framed photo. The entire plan kind of fell apart at this point and I shelved it away into the backlog of things in my head, possibly never to be thought of again.

## Enter NFC tags

It wasn't long after this though, that I started seeing a few interesting uses of Near Field Communication (NFC) tags. These fascinating little bits of circuitry are completely unpowered and yet can provide information to a device brought near them. They are 'turned on' through the use of magnetic fields that provide them a bit of electricity, activating their circuitry and letting the device read information they have stored. In some ways, they are very similar to QR codes, providing a way to store a URL to be easily available to a mobile device without the user having to type it in manually. I saw some Etsy listings that used NFC tags to let folks connect to your home wi-fi, as an example, or virtual 'business cards' for use at a conference booth, so users could be taken to your website contact page, etc. All cool stuff, and I have plans to do a few more things with these tags, but for now I thought I might have a solution to my original photo info problem.

I did [the bare minimum amount of research](https://www.rfidfuture.com/difference-between-ntag213-ntag215-and-ntag216.html#How-Does-NFC-Work) to determine that NFC tags come in different sizes, which impacts how many bytes of information you can store on them, and in a few distinct versions that controlled their other features. One feature in particular, the ability to add a password to your tags to prevent them from being overwritten, seemed critical to have. Even though, in my case, the tags are going to be in my home, the lack of a password/pin means that anyone with a mobile phone and a free app could overwrite the URL I've stored in them. I have enough 'funny' friends and family members that this would definitely happen. With the ability to lock the tag as read-only or to set a password, I can feel comfortable that it is going to take folks to the URL I intended. I went ahead and ordered [a set of NFC tags (in sticker form) from Amazon](https://www.amazon.com/gp/product/B07P9G1GK4/), installed the free version of [NFC Tools](https://www.wakdev.com/en/apps.html) onto my Android phone, and started playing around. It turned out to be relatively easy to put URLs onto the tag, to update them, to set the password protection, etc. At least with my Android phone, for some reason I have found the two iPhones I have access to (an 11 and a 14) to be much more finicky. It was time to move onto creating the actual content for these tags.

## Making a photo info page in Hugo

I had planned on going with some sort of data file that generated pages, but I ended up just creating a new post type "photos", and adding the fields I wanted in the frontmatter of a markdown file.

```markdown
---
date: 2013-04-19T12:38:00+00:00
title: Flagstone
type: photos
source: "/images/photos/segovia/IMG_2005.JPG"
locationName: Segovia, Spain
locationLat: 40.950069
locationLong: -4.124713
---
We were on a trip to Paris and the UK, and took the train up to Segovia to see the cathedral and the aqueduct. This was a shot of flagstone in the courtyard outside of the cathedral.
```

With those fields added, I could create a new layout for the photo post type, by adding `single.html` to layouts/photos in my theme. You can see [the full source to that file on GitHub](https://github.com/Duncanma/hugo-theme-hello-friend-ng/blob/master/layouts/photos/single.html), but essentially it is just a ton of code to load the best available image formats and to use the new frontmatter variables.

```go-html-template
<p class="location">
  <a href="https://www.google.com/maps/search/?api=1&query={{ .Params.locationLat }},{{ .Params.locationLong }}">{{ .Params.locationName }}</a>
</p>
```

I picked a few of the photos from around the house, [created pages for them](/photos/), put NFC stickers onto the inner side of the frame's filler board, and encoded the URLs onto the tags.

![NFC taped to the frame back](/images/nfc/tag_on_back.jpg)

I attached the tags using scotch tape, even though they are stickers, because I wasn't 100% of the best positioning. I decided on the middle of the photo for now, as it felt like the most natural position, but we'll see if real usage changes my mind.

![Encoding the tag using NFC Tools](/images/nfc/encoding_the_tag.png)

The end result has been great, once again with Android devices, you move your phone towards the middle of the picture and a page opens in your default browser.

![shot of an android phone held near the picture frame, photo info page visible on the device](/images/nfc/tag_in_use_android.jpg)

It *does* work on iPhones as well, but in my experience it was very unreliable, required multiple attempts to move the device near the tag, etc.

![shot of an iOS phone held near the picture frame, photo info page visible on the device](/images/nfc/tag_in_use_iphone.jpg)

## What's next?

I have created my template in a very 'happy path' way, because I'm the only target user. Right now if you don't provide lat/long, the build will just break, which isn't that helpful. Ideally, it could fallback to just calling the same Google Map URL with the location name, and a nice 'no location specified' if the name is missing as well. For the photo itself, that's required at the moment, but I already have plans to update that to be optional. I have many photos of my kids around the house and while it would still be great to get a description of the photo (location, date), I have tried to avoid putting their images up online. Making the source image optional would let me still add info and a tag to those photo frames, without making those photos public.
