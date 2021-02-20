---
date: 2021-01-18T16:37:00-08:00
title: Why you should care about the performance of your site
type: posts
tags:
 - Web Development
 - Coding
 - Performance
 - Software Management
techfeatured: true
images:
- /images/performance/search-console-web-vitals.png
description: We often talk about assessing and improving the performance of a web page or a site, but why does this matter to you as a site owner?
---
We often talk about assessing and improving the performance (speed) of a web page or a site, but why does this matter to you as the site owner? Developers run their sites 
through pagespeed tests and talk about lighthouse scores, but does the load time (and other metrics) of your site actually impact your business?

## Visitor Experience and its impact on revenue, conversion, or satisfaction

The main reason that is usually given, is that people will close a site that is too slow, choosing to leave before reading your content, making a purchase, or taking whatever other action is critical to your business.

> "Half a second delay caused a 20% drop in traffic. Half a second delay killed user satisfaction."
> -- [Greg Linden, talking about a presentation on performance from Marissa Mayer of Google](https://glinden.blogspot.com/2006/11/marissa-mayer-at-web-20.html)

I don't dispute this idea, that performance can impact user satisfaction and potentially revenue, but there are two issues with this for most people. First, you might not be able to track the real impact of a change to your site. If your business has good analytics, it might be possible to link a change in site performance to revenue, or at least to user actions on the site, but few of us have the level of traffic that a site like Google or Amazon has. Second, I consider this to depend both on the nature of your site and with performance below a certain margin. If a user is viewing your site to get a specific bit of info (to read this article for example, or to get the hours of a restaurant) and if your site is fast **enough**, then they will be satisfied and they will stay long enough to accomplish their goal.

## Search Engine ranking

The experience of your actual visitors is not the only reason site performance matters though, [Google has indicated that it will be starting to use site performance as part of its search ranking system](https://developers.google.com/search/blog/2020/05/evaluating-page-experience). The goal will be to pro-actively steer users to faster sites, to ensure users are being directed to results where they will have a good experience. Once that change rolls out, a particularly slow site is likely to show up lower in search results than faster alternatives. This could impact the traffic to your site a great deal more than the site experience itself.

## Inclusion and Accessibility

The final reason to be focused on the performance of your site, is how it can impact different audiences and determine how accessible you are to a wide range of users. If your site is slow because it is very large (sending down a lot of content, large images, etc.) then it can be particularly slow for a person on a low-speed connection or particularly expensive for a user with a data plan where they pay for data. This could make your site less usable for low-income users or users from different geographic regions. If the reason for your performance issues is instead due to a large amount of complex JavaScript, the site could be very slow on older devices, which would once again disproportionately impact low-income users.

You might have a fast connection and a recently released high-end device, but do you represent the audience you hope to attract to your site? Are you unintentionally excluding a segment of possible users by having a site that performs badly for them?

## How to determine if your site is slow?

In all of these cases, there is a point at which your site is fast enough, past which further improvements will have less impact. How do you know what that point is though, and how your site is doing relative to it? As with any complex problem, the answer is difficult and can depend on many different elements, but I believe the simplest and most useful place to start is with [Google's 'Web Vitals' metric](https://web.dev/vitals/). This set of measurements are intended to highlight the metrics that have the highest impact on a user's experience with your site, are available in many different tools from Google and others, and are the same metrics used by Google in their site ranking. You can [run an audit against your pages on Google's Web.Dev site](https://web.dev/measure/) and it also shows up in the [Google Search Console](https://search.google.com/search-console/about).

![Core Web Vitals in the Google Search Console](/images/performance/search-console-web-vitals.png)

The goal is to get your site (pages) into the green for the three main web vitals metrics (Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift). Improving past this point will definitely have positive impact on the experience of your site visitors but may not improve your actual results. After a point, improving the performance of your site is unlikely to be the most impactful change you could make. The audit tool linked above is one way to assess your pages, but the search console gives you details based on actual user experience making it more relevant. Unfortunately, if your site doesn't get enough traffic or is very new, the search console will not show you this info. If that's the case, or if you want to be able to assess the performance of a page before and after a change, I would suggest using tools that let you run a test on-demand such as the [web.dev measure page](https://web.dev/measure/) and [WebPageTest.org](https://www.webpagetest.org/). WebPageTest has the added advantage of letting your test the same page from various regions around the world, to help you understand how different users will experience your content.

I am interested in assessing the performance of a few select non-profit sites in addition to helping people do it themselves. If you are a non-profit organization, [submit your organization and site details into this form](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAEaZ0w4w3VURUdGQVg3Mk5COUFMSDhZNUZEM0xBSFNKQi4u) and I will let you know if am able to do an assessment of your site.

## Now what?

You have decided the performance of your site is important, and you have also determined that it isn't fast enough already, so now what do you do? I will be writing more about some next steps for you to take, but for the moment, check out [these articles from the Web Vitals intro](https://web.dev/learn-web-vitals/#improve-web-vitals).
