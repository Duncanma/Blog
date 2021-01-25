---
title: "Celebrating the 'Craft' in our Engineering work"
date: 2020-03-02T09:30:00-08:00
type: posts
tags:
 - Docs
 - Microsoft
 - Performance
 - Team
 - Software Management
images:
- /images/craft/speedcurve_before_after.png
summary: Iterating towards quality is the real difference in a great engineering team
docsfeatured: true
---
Recently I watched the team go through a launch, and then do some quick investigation and iteration. This exercise really brought to mind [Jeff’s](https://twitter.com/jeffsand) comments at an internal team event that we are all _masters of our craft_. I liked the sound of that phrase, and I see it in a lot of what we do… including this one example.

The [Azure documentation page](https://docs.microsoft.com/azure) is a critical landing experience for our site, but it has often been a performance low-light for us with a page load time (in the US, on a good connection) of around **4 seconds**. That's not great, but the page is **huge** and has **100s of product images** on it, so there is a limit to what can be done if we want it all on the same page like this.

Last week, we rolled out this great new page [as described on the docs twitter feed](https://twitter.com/docsmsft/status/1232337249502519301) (thanks Den!), which is an improvement in a ton of ways.

![Azure docs landing page before the update](/images/craft/page_before.png)
_The Azure docs landing page before_

![Azure docs landing page after the update](/images/craft/page_after.png)
_The Azure docs landing page after_

Unfortunately, it was **slower** than the page it replaced (going from 4s to 4.5s page load, or **12% slower**). This type of impact is often hard to see until something is live, as our staging system isn't cached the same as production, we are on a fast network, etc. We **do** automatically run perf tests after a deployment though, in production, and that's what spotted this decrease.

That's not great, as one of our principles for feature development is 'first, do no harm'. We shouldn't make our fundamental experience worse when we make a change, even if it makes other things better.

In the afternoon, after the page shipped, the main dev on this new page (Dillan) had a chat with a few other folks on the team, made a couple of changes (made those 100s of images [lazy loaded](https://web.dev/native-lazy-loading/), added dimensions to them to reduce reflow/recalc time as they load in) and had a new version up for testing in less than an hour. We also identified a possible improvement in cache configuration that the SRE team could do and Antony from that team had that staged as well. A bunch of folks piled-in to test/verify these changes and the changes are now live.

The azure docs page is now 25% faster than it was before this new version launched, down to a **3s page load** ([test details from WebPageTest.org](https://webpagetest.org/video/compare.php?tests=200228_6Q_0ea18bc28d457968fa3885b601adb7ff,200225_73_9ec560bc97660b49b340f19fbfe34cff,200204_RR_8a079e1adfdbd2491bbc453f02ed31e2)). Return visits were improved even more, due to the cache changes, going from 2.6s to 1.9s, a 37% increase ([test details](https://webpagetest.org/video/compare.php?tests=200228_6Q_0ea18bc28d457968fa3885b601adb7ff-c:1,200225_73_9ec560bc97660b49b340f19fbfe34cff-c:1,200204_RR_8a079e1adfdbd2491bbc453f02ed31e2-c:1)).

![Table of data showing a 12% faster DOM load time, a 14% improvement in 'start render' and greater than 30% improvement in both speedindex and visually complete](/images/craft/speedcurve_before_after.png)

Appreciate all the great work across both the Dev and SRE teams on this (and of course, the original work to build the new page that involved even more teams including PM and Design!), and happy to be working on a team that embraces this type of focus on quality.
