---
date: 2020-02-15T17:58:00+08:00
title: What is a CDN, how does it work, and should you use one?
type: posts
tags:
- Web Development
- CDN
- Performance
images:
- /images/azurecdn/custom-rule-list.png
description: In my day job, working on websites, the topics of CDNs often comes up. It seems like a few folks might find a general overview of CDNs useful, so here goes...
techfeatured: true
draft: true
---
I've been working on websites at my day job and on my own for many years now, and in that time I have ended up explaining CDNs (Content Delivery Networks) to a lot of people. I think most people have some idea of what they are (and many probably know them really well), but for anyone who doesn’t, or who might want a tiny refresher, I thought I would go through what they are, how they work and how to decide if they would work for your situation.

## What is the problem we are trying to solve?

The interaction of your browser with a website is primarily a whole bunch of requests to send data from the web server to the user’s machine. If you think about the initial request for a page (think https://www.duncanmackenzie.net), that’s a request, and then once that page comes down, the browser will have to request some CSS files, some images, maybe some fonts and probably some JavaScript. In the end, the browser will have made requests for, and then received, a ton of different pieces of content. Each of those requests has to travel from the user to your server, and the response has to travel back. That is a lot of travel time, and the farther away the user is (it isn’t really about actual physical distance, but it’s roughly accurate and easier to think about), the slower it takes for that request and response to happen. 

Looking at my site for an example, there is a server in ‘’ that is hosting my pages. If I request the page from various locations around the world, you can see the impact on response times back to the user in this table:


Making your page smaller, making fewer requests and making your server faster can all help to improve this experience, but after doing all of that, the only other good way to speed things up is to move your server closer to the user. Given that you may have users all around the world though, this is a tricky thing to do. Which brings us to CDNs

## What is a CDN and what does it do?

A CDN is just another form of cache, a way to hang onto data in a convenient place to avoid a more expensive action.  

A CDN is a system of machines that are setup to respond to requests for a given piece of content, and these machines are placed all around the world so that they are relatively close to any user who is making the request. You configure an account with the CDN provider (the company who owns all those machines around the world, like Akamai, Verizon, CloudFlare or others) and setup a mapping so that they know where to get your content when people ask for it. That source is called the ‘origin’, as opposed to all of those CDN servers which are called the ‘edge’. Going through this for my site, for example, I create an endpoint with the Azure CDN called ‘’ and tell it that my origin is ‘’.  The CDN provider setups up their domains so when a user tries to connect to their edge server at ‘’, they’ll be given the IP address of the closest physical server to their location. As before, ‘closest’ is often determined by ‘quickest to communicate with’ for that user, not physical location, but the two are related.

Now, if the user requests ‘’, they’ll be connected to a CDN edge server, which will in turn fetch ‘’ from the origin and return it back. If we stopped right there, we might see some benefits, because the user is connecting to and communicating with a closer server than going all the way back to my server in ‘’, but the edge is still making that request, so that long distance call is still happening. The CDN is smart though, and it can hang onto the response from our origin and serve it as a response to future requests. This removes the need to go back to the origin for that content after the first request, which is quicker, but also takes that load off our origin server.  CDNs can be configured to cache content either using rules in their configuration (keep copies of content for up to 24 hours), or by being configured to just respect whatever cache header comes back from the origin server (keep copies of the content for as long as the origin said was ok). With caching setup, now the user may be able to request a page from your site and all the traffic will happen just between them and the (close) edge server provided by the CDN. 

## Cache Hits and Misses
At certain points, when the user requests a given resource (a page, an image, a CSS file, etc), the CDN will check it’s local cache and realize that it doesn’t have a copy of that resource, or that the copy it has is too old (based on the cache settings we discussed earlier). At this point, the CDN will fetch a new copy of the resource from your origin, send it back to the user and update its local cache. When this happens, referred to as a ‘cache miss’ (and when the content *is* found in the edge cache, that’s a ‘cache hit’), that one request might take a bit longer than normal. At no point does the user ever connect directly to your origin, the CDN servers handle those requests when needed, the user only deals with the CDN. The goal when using a CDN is to try to end up with a higher # of hits than misses, so that the CDN is doing most of the work instead of your server. The amount of your traffic served by the CDN is the ‘offload %’, and a number above 90% is excellent.

## What should you use a CDN for, and when it doesn’t work as well


That is it, the basics of how a CDN works. Looking around you will find that there are tons of different CDN companies, and all of them do the basic functionality described above. Beyond that, they usually offer a bunch of extra functionalities that are awesome and might be perfect for you, but if all you care about is the basics then the various companies will differ based on:
•	How many edge servers do they have, and where? The CDN company’s marketing site will often talk about their ‘points of presence’ and show maps with tons of dots showing how broadly they are available around the world.
•	How fast their servers are, and how fast their internal network is. The first will impact how quickly they can respond to requests from the user, and the second will impact how long it will take them to fetch content from your site when needed. 
•	How much they charge to serve your content. This can be priced based on the # of requests they have to handle (and keep in mind that a single web page could take 10s to 100s of actual requests) or by the amount of data they are transmitting around for you. Some will even have free tiers if you are dealing with a small amount of traffic.





