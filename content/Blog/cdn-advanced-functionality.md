---
date: 2020-03-17T17:00:00-08:00
title: Beyond content caching and distribution, what else can a CDN do?
type: posts
tags:
- Web Development
- CDN
- Performance
description: The basic functionality of a CDN is to cache and distribute content, but many CDN providers bundle advanced features together with their service
draft: false
techfeatured: false
---
The core purpose of a content distribution network (CDN), is to provide your users with endpoints to hit all over the world instead of having everyone go all the way back to your origin server. Caching is a core part of that, to bring some of your content closer to the user as well as the server they connect to. If you've looked into CDNs though, or tried to compare various companies, you will see they offer a lot of 'extras' on top of the basic functionality.

> This post is one of [a series about CDNs](/tags/cdn), starting with [an overview of what they are and how they work]({{< relref "overview-of-cdn.md" >}}).

## Web Application Firewalls

If all your traffic is already flowing through another endpoint before it gets to your origin servers, it's a perfect time to do some filtering for security. A web application firewall (WAF) inspects traffic flowing through it, and based on a set of built-in rules along with custom rules you can configure, can block 'bad' traffic before it ever hits your servers. This can include:

* Rate limiting (no more than x requests per second from a given IP or IP range),
* XSS (Cross Site Scripting) blocking by detecting an attempt to inject script via query string and POST requests, and
* Blocking malformed requests (such as invalid or overly large form submissions)

This is a great extra layer of protection, as long as it is configured correctly. For Docs, we accidentally blocked tons of valid users at launch, because the # of requests per second coming from the same IP range was too high. Turns out we had underestimated how much traffic would come from within large companies that end up appearing as a small # of distinct IP addresses. Easily fixed, but you should be monitoring and looking for possible 'false positives'.

Some examples of WAFs that are part of the services of a CDN include [Akamai's Kona Site Defender](https://www.akamai.com/us/en/products/security/kona-site-defender.jsp), [Cloudflare's offering](https://www.cloudflare.com/waf/), [Azure's WAF as part of Azure Front Door](https://docs.microsoft.com/en-us/azure/web-application-firewall/afds/afds-overview), and [AWS's WAF product](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html).

## Performance optimization including image compression/conversion

In many cases, the page you send out from your origin server could be optimized differently for different users (based on device and browser for example). Some users, if they are using Chrome, could benefit from images in WEBP format, as an example, or if they are on a small device perhaps a lower quality or resolution image would be more appropriate. Overall, for the best experience, you should be looking at:

* image resolution based on the width of the user's browser,
* image format based on the user's browser, and
* reducing the size of the image with compression, possibly compressing more for lower-bandwith users.

It is definitely possible to take all of this into account in your original HTML, compressing your images at the source and then using an `<image>` element with a `srcset` to specify different versions of the same image, but it is a lot of work and might not be an option if you are using a web platform that you can't alter in significant ways. Another option is to do this optimization as the 'edge' (the servers out around the world that the user is hitting since you are using a CDN), updating images and possibly even transforming your HTML for higher performance. [Cloudflare offers this](https://www.cloudflare.com/website-optimization/), as does [Akamai](https://www.akamai.com/us/en/products/performance/image-and-video-manager.jsp#test-your-sites-image-weight), and there are several image-focused CDN services that do this as well (check out [this article on exactly this topic from smashing magazine](https://www.smashingmagazine.com/2017/04/content-delivery-network-optimize-images/)).

Personally, I would say you should try and do this optimization yourself, if possible, by making it part of your site framework and automate the creation/conversion of optimized images in your workflow. It takes time and effort to do this though, making the use of an external service to be a great solution if needed.

## Path rewriting and multiple origins

When you setup a CDN, you map the incoming CDN requests to your origin server, so any request for `www.duncanmackenzie.net/*` should hit `someazurestaticsize.azurewebsite.net/*`, but even with the simplest configuration you can rewrite the path. For example, if you had all of your content stored under /content on your origin, then you could map all incoming `/*` requests to `/content/*` and the CDN is handling that path rewriting for you. You can get fancier though, using regular expressions to map every request for `/blog/yyy-mm-dd.aspx` to something like `/blog/yyyy/mm/dd/index.html` if you've changed how your origin handles URLs. Getting **even** fancier, you can have different paths mapped to **different** origin servers. For example, lets say you have been uploading all your images to `images.duncanmackenzie.net` and your HTML to `www.duncanmackenzie.net`, but now (after reading [a random post about using a second domain]({{< relref "cdn-separate-domain.md" >}}) perhaps) you'd like those images to show up at `www.duncanmackenzie.net/images/*`. Without having to move them, you can configure your CDN so that the default mapping for `www.duncanmackenzie.net/*` is to the source of your web pages, but `www.duncanmackenzie.net/images/*` is setup with `images.duncanmackenzie.net/*` as the origin. Exactly how you configure this is different with each CDN, but it is often described as a 'path rewrite' and here are some selected instructions for doing it with [Akamai](https://www.akamai.com/us/en/products/performance/cloudlets/forward-rewrite.jsp) and [AWS's CloudFront](https://advancedweb.hu/how-to-route-to-multiple-origins-with-cloudfront/).