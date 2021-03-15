---
date: 2021-03-15T08:03:32-07:00
title: Adding a special section to my Hugo posts based on a tag or tags
type: posts
tags:
 - Web Development
 - Coding
 - Hugo
description: By checking the tags collection you can add a conditional bit of content to your post pages in your Hugo template.
---
I recently [launched a newsletter](https://www.getrevue.co/profile/DuncanMackenzie), despite being assured email is dead, and like any good content creator I want to grow my audience.

It wouldn't be crazy to add an advertisement to subscribe to every page on this site, but I cover a wider range of topics here than what I will be putting in the newsletter. Someone visiting the site to read about [Beer Tourism in Shanghai](/blog/beer-tourism-shanghai/), would likely be disappointed by a newsletter that focuses on web performance and general software engineering. With that in mind, I wanted to add a little promotional mention only on posts that were related, based on whether or not they had [the "Web Development" tag](/tags/web-development/).

In my Hugo theme, I already had added a feedback section after **all** my posts to point people at twitter, so I decided to just add a new paragraph in there.

```go-html-template
<div class="feedback">
    <p>Thoughts on this post? <a href="https://twitter.com/duncanma">Feel free to reach out on Twitter!</a></p> 
    {{ if in .Params.tags "Web Development" }}
    <p>You may also like <a href="https://www.getrevue.co/profile/DuncanMackenzie">subscribing to my newsletter</a> where I share a weekly roundup of web development links and commentary.</p>
    {{ end }}
</div>
```

That's it, not sure how much traffic it will drive, but it may bring in a different set of folks than people who already follow me on Twitter.