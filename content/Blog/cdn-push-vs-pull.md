---
date: 2020-05-16T15:22:00-08:00
title: Pushing to the CDN
type: posts
tags:
- Web Development
- CDN
description: Many folks I work with have made comments about pushing content to a CDN, which isn't really how it works...
techfeatured: false
---
> This post is one of a series about CDNs, starting with [an overview of what they are and how they work]({{< relref "overview-of-cdn.md" >}}).

Throughout my many years in the web business, a lot of folks have made comments about "pushing content to a CDN" or "uploading an image to the CDN", which isn't really how it works. I generally understand the intent of their comment, so I don't correct them, but I hear it so often that I just had to write about it.

CDNs are set up to intercept a given set of URLs (often an entire domain) and then they turn around and request the appropriate content from another location. The source of content is known as the 'origin' and while it is often some form of web-exposed storage (AWS S3, Azure Blob Storage) it can really be any other web server. A WordPress site for example, could be the origin server behind a CDN profile.

If you want a new file to be available via a CDN URL, you push it up to the origin. When someone requests the appropriate URL, the CDN will go fetch it from the origin and return it to the user. You didn't push the file to the CDN, you pushed it to the origin, and the CDN is setup to get content from there.

As always, there can be some confusing situations that make this less clear. Some CDN providers will **also** provide a service to be your origin server ([BunnyCDN has this offering for example](https://bunnycdn.com/solutions/cdn-cloud-storage)) so it sort of seems like you are uploading your file to the CDN. It's still two separate things though, just provided by the same company and integrated together.

Another way in which this can be confusing, is sometimes people believe that when the content changes, we push the new version out to all the CDN nodes. That wouldn't be a crazy idea, and there are sometimes tools/features of CDNs that will pre-fetch a set of content to produce this effect, but it is not generally how it works. The content is updated on the origin server, but when it ends up cached by the CDN depends on:

- when it is requested by a user,
- how old the copy cached by the CDN is, and
- what cache expiry has been configured as part of setting up your CDN

I'll continue to say nothing when I hear someone say they are uploading their content to the CDN, because it's generally not helpful and it derails the conversation.

![Well actually cat looking smug](/images/well-actually-trollcat.jpg)

When you are architecting and building systems, these details are important though, so hopefully everyone involved knows how it **actually** works.
