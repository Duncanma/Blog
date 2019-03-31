---
date: 2007-08-30T02:34:00+00:00
title: Added Support for Soapbox Videos on Channel 9
type: posts
tags:
 - Channel9
 - Microsoft
 - Video
---
When I started on the C9 dev team, one of the first things I did was to **remove** the ability for users to post embed, object and script tags. We had a couple of people abusing this feature and I wanted to lock it right down. The downside to this move was that it prevented some forms of user interaction/posts that we didn't really mind and in some cases would even like to encourage.

As a small step towards a more community-driven future, [I added support to C9 today to allow you to embed Soapbox videos in any forum post](http://channel9.msdn.com/ShowPost.aspx?PostID=338082). Simple use the following markup in your post:

`[soapbox video="(soapbox video id)"]`

![Soapbox video on Channel 9](/images/8c137ad7-737a-4ae6-9a2b-08156604e749.png)

and it will turn it into a full blown embed tag with a link to the source material underneath. The Soapbox video id is simply the GUID that appears on the permalink url (<http://soapbox.msn.com/video.aspx?vid=5699dafe-d864-4d1f-976c-d5f4d9ed78db> for example) for a video and also shows up in its embed code if you take a look at that as well.
