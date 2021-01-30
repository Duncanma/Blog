---
date: 2020-03-08T11:01:00-08:00
title: Should you have a separate domain for content served through the CDN?
type: posts
tags:
- Web Development
- CDN
- Performance
description: A common pattern on sites is to use a separate static or cdn domain, but is this a good idea?
techfeatured: false
---
Short answer is "No, you shouldn't". You will see this quite often on sites, where the site itself is served at www.mydomain.com, and then static resources (CSS, JS, images, etc.) are served from a secondary domain like cdn.mydomain.com or something similar. The second domain is routed through a CDN, the main domain is not.

> This post is one of [a series about CDNs](/tags/cdn), starting with [an overview of what they are and how they work]({{< relref "overview-of-cdn.md" >}}).

The argument for doing this generally follows one or both of these reasons:

1. cookies set on the main domain have to be sent along with every request for that domain, [that extra data is wasteful](https://blog.leaseweb.com/2014/06/05/need-cookie-less-domain/) and has a negative impact on performance
2. we only want to serve files that are going to be cached, or cached for a long time, through the CDN and this is the best way to do that

Neither of these points are completely invalid, but I'll tackle them one at a time below.

## Cookieless domains

Cookies are sent as headers in every request to a domain, so they take up space and increase the time it takes to make that request. Assuming cookies are being set on www.mydomain.com, they will not be sent on requests to cdn.mydomain.com **but** the savings from this has to be weighed against the cost of having another domain on the page. A second, different domain means:

* an additional DNS lookup,
* an additional SSL connection/negotiation, and
* you prevent the cool new HTTP/2 protocol from being able to [reuse the single connection to download everything](https://developers.google.com/web/fundamentals/performance/http2/#one_connection_per_origin)

You can read about [a specific developer's experience with this issue](https://blog.theodo.com/2019/09/cookieless-domain-http2-world/), or you can dig into [many examples of 'things we used to do to make pages faster that don't apply in a HTTP/2 world'](https://http2-explained.haxx.se/en/part3). Of course, this assumes you are serving your site up via HTTP/2, but you definitely should be and [you can check if you are using HTTP/2 through this utility](https://tools.keycdn.com/http2-test).

Also, the impact of cookie size, or any header, is reduced with HTTP/2 as another benefit of that protocol is that [headers are compressed](https://developers.google.com/web/fundamentals/performance/http2/#header_compression).

In the end though, you'd have to compare the cost of that second domain to how much you are saving with the reduced data due to cookies. If you have 1000s of images and a domain with a huge payload of cookies, then it *could* be worth it.

## Only content that can be cached should go through the CDN

This second rational for using a second domain also makes some sense. If our main site isn't cached at all, why make the user go through two hops to get to the page itself? Well, there are two reasons why it _still_ makes sense. First, consider the whole discussion above about a second domain name, even if it isn't cached, having your main site content come through the same domain as your images and other resources avoids a second DNS lookup, SSL negotiation and allows HTTP/2 to happily share a single connection for all those downloads. Yay! Second, one of the benefits of a CDN is to reduce latency, the time it takes for the user's request to get to your server. If you are getting all of your requests through the CDN, then that initial request **and the SSL negotiation** will all happen with a very close server. This will speed up the user's initial connection time, which is great _since they only have to connect to that one domain_.

Related to this, are you sure the main page can't be cached **at all**? Unless you are dealing with user-specific content, even rapidly changing output could potentially be cached for a few seconds or minutes. Imagine if you are currently receiving 100 requests per second (rps) on your homepage, this puts a load of 60000 requests per minute on your origin server. Add a 10 second cache on that page, and you will only get a few hundred hits per minute. That's a huge difference on your server load, and could save you a lot of money.

{{% note %}}
10 second cache, why not just **6** requests per minute then? Before you question my math, the reality is that each different edge node has it's own cache (there are middle tier caches by region, but this can vary between CDN providers), so you will get requests **every 10 seconds from every edge that is receiving traffic**. Your exact results will vary based on how your traffic is distributed.
{{% /note %}}

## Special note, why doesn't Docs do what I recommend?

If you go and check out [Docs](https://docs.microsoft.com), you may notice that it uses a 'static.docs.com' domain for some static resources. This is not inline with the guidance I'm giving above.

{{% note %}}
My dad used to always say "Do what I say, not what I do", in response to pointing out his smoking habit or other similar things, but that definitely reduces your credibility when providing guidance.
{{% /note %}}

This setup may not be ideal. We do have **all** of Docs running behind the CDN, so we get those benefits, but we have this second domain and the additional performance costs that entails. In reality, we haven't tried removing it and testing to see the benefit, but I can imagine that in pages like [the Azure docs landing page](https://docs.microsoft.com/azure/), with 100s of requests to images hosted on static.docs.com, this could be better than putting it all on a single domain, but that on the majority of pages it is a net negative. At some point, the Docs team will likely get around to testing this and changing it if needed, but it hasn't made it's way to the top of the stack yet. If I was to really assess Docs, I would honestly be more concerned about the overall # of domains we are using.

![List of domains accessed in a Docs page request](/images/cdn/docs-domains.png)

Most of those requests are deferred in some way, but [moving our fonts local]({{< relref "moving-my-google-fonts-local.md" >}}) could be a good optimization. Sure would be nice if some of our 3rd party providers consolidated their domains though; is it really necessary for clicktale to use 3 different host names?
