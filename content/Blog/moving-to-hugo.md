---
date: 2019-04-26T07:34:00-08:00
title: Moving this site to Hugo
type: posts
tags:
 - Blogging
 - Coding
---
This blog has been around a while, started back in 2003 on a Microsoft blogging site for employees, and over the years I've moved it around a lot in terms of hosting and platforms. It started out on a blog platform from Telligent, then when it moved to my own server it was on a variety of open-source engines (.Text was the one I remember), a blog engine Adam Kinney and I wrote for our blogs, and a project built by my team at Microsoft called Oxite.

Eventually, I discovered that whenever I was running the site on code I could change, that I was obsessive about working on it. I would fix any bug I saw, [add features to it](../moved-my-text-blog-from-atom-0-3-to-atom-1-0/), and just generally spend too much time working on it. Given that I wasn't using very widely adopted software, my site would often **need** that ongoing work, and no one else was going to do it for me. Finally, in an effort to save my coding time for other projects, I made the decision to move to WordPress. I didn't suddenly become happy with any issues I found, but I just told myself that it _wasn't my problem_ and tried to ignore the many aspects of WordPress that I was unhappy with (the horrible markup and extremely slow page loading).

That worked for a long time, but the end result was that I was embarrassed by my own website. I didn't want anyone to think I was ok with the performance of it, or to **view source** and think this reflected my idea of web development. The idea was to just focus on the writing and not care about the platform, but a lack of pride in the pages was one of the reasons I slowly stopped blogging.

At the same time, I was working on larger and larger sites at Microsoft ([Channel 9](https://channel9.msdn.com) and now [Docs](https://docs.microsoft.com)) with teams that shared my views on how web sites should be built (there isn't **one** way, but I have some strong opinions). This made my personal site even more bothersome to me. I spent a great deal of my work time evangelizing semantic markup, high performance page loads, minimal JavaScript and accessibility ... and then if anyone ended up on my personal site, it's implementation represented none of my real principles.

So it is time to fix this, and luckily [the world of static site generators](https://www.staticgen.com/) is at a great place to jump in. I could have used my own team's project [DocFX](https://dotnet.github.io/docfx/) but it is **not** intended for blogging and I would have ended up wanting to add features that don't belong in that project. Instead, I went with Hugo, mostly because I had to pick something. It seems awesome, but so did Jekyll and many others. Spending the next year trying to decide seemed like a terrible idea though, so I narrowed down the list based on a few things that are important to me and made a decision.

I haven't changed that much though, and I've been obsessively tweaking and changing my pages and my CI/CD process to get it to where I want, but I like how it has been going so far. Expect more **meta** posts about that work in the near future. :)