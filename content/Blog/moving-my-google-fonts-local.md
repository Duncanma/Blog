---
title: "Moving my Google fonts local"
date: 2019-06-07T08:43:14-07:00
updated: 2019-06-14T17:03:00-07:00
type: posts
tags:
 - Blogging
 - Coding
 - Performance
images:
- /images/performance/Baseline_New_Waterfall.png
summary: Moving my Google fonts local seemed to be one of the remaining
techfeatured: false
---

As you may have read, [I've been trying to improve the performance of my site]({{< relref "new-blog-performance.md" >}}) and I have gotten it to a pretty low set of #s, but one possible area for improvement has always been in my use of external fonts.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto|Source+Code+Pro&display=swap" rel="stylesheet">
```

It seemed that moving these fonts (Source Code Pro and Roboto) local would improve the performance of my site. Benefits would include the removal of the additional external CSS file and the delay it adds before the browser knows about my external font information, and it would also remove the need to go fetch that font from yet another domain. The negative though, is that the user may have had the Google font(s) cached on their machine already from another site, and if I host it locally then they'll end up downloading it again. Running pure synthetic testing, like WebPageTest, won't be able to help you understand which of these two are better for your situation, because it is always running from a clean browser instance that definitely will **not** have any existing fonts downloaded. The extra load on my server and my CDN is another downside, but I'm more concerned with the negative impact of loading some large font files into the GitHub repo for my theme.

## Downloading the fonts and giving it a go

I wasn't going to get to a decision by just sitting and thinking about it, so I decided to give it a try and see what the data showed me. Luckily, [Mario Ranftl](https://mranftl.com/2014/12/23/self-hosting-google-web-fonts/) has done the hard work already of building a tool to download the fonts you need and the css snippets associated with them. Just jump to [his google web font downloader tool](https://google-webfonts-helper.herokuapp.com/fonts), and follow the steps for each font you need to download. In my case, this is Roboto and Source Code Pro, and (picking Modern Browsers as an option, because I'm fine with older browsers getting my fallback fonts) I ended up with this css

```css
/* roboto-regular - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'),
       url('../fonts/roboto-v19-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../fonts/roboto-v19-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* source-code-pro-regular - latin */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Code Pro'), local('SourceCodePro-Regular'),
       url('../fonts/source-code-pro-v9-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../fonts/source-code-pro-v9-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
```

and two zip files full of the fonts to be loaded into a 'fonts' folder in my theme's static directory.

After I add the CSS from above into my site's css file (another small benefit, instead of a separate css file, now these font-face declarations are mixed into my single global CSS file), I need to remove the `<link>` to the google hosted font, and I might as well remove the `<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>` from my pages, as we shouldn't end up hitting that domain at all. Quick run local to make sure I didn't mess up the relative paths in the CSS, and we should be good to go. (You can see [the changes I made to my theme](https://github.com/DuncanmaMSFT/hugo-theme-hello-friend-ng/commit/fd76227038fd1ea966f61737c1d5d9e11e6027f1) in GitHub).

After pushing up my theme changes to GitHub, my blog itself needs to be pushed to reference the newer version of the theme, and that then kicks off [the CI build that makes everything](https://dev.azure.com/festiveturkey0771/festiveturkey/_build/results?buildId=81). I hit the site in my local browser to make sure we're getting the new 'local fonts' version, and then start up a new WebPageTest run against my sample page. I did an earlier run before I started the font work, so that I would have something to compare it to, and [you can see the two results compared here](http://webpagetest.org/video/compare.php?tests=190527_EM_3bb87be6c02822dc594adc4b97a35402%2C190527_GY_fc0c01e4ba17d5c04c0055d31a486dff&thumbSize=200&ival=500&end=visual). The timeline, and the Visually Complete metric seem off, but every other metric suggests that moving the fonts local is an improvement. This is what I expected, if we ignore the idea that some real users will have the font cached, this should be an overall win. Still good to have the data verify my assumption though.

The Visually Complete # being **higher** was confusing, so I ran the test again to see if this was a momentary problem in the testing (how presumptuous of me, to think something might be wrong with the test instead of my code!) and it was much improved. You can't just re-run the test until you get the result you want though, so I ran it again to see if it would stay consistently better and [the third time](http://webpagetest.org/video/compare.php?tests=190527_71_67fb9b11b9367197ac663fc7d61ed2c1,190527_3W_b10bd32e62fab4c49d65a43099b0a9f9,190527_GY_fc0c01e4ba17d5c04c0055d31a486dff) was even higher on the 'Visually Complete' #. So at this point, I was a bit confused, but then I realized that I had changed something when I moved local that I didn't intend to. Recently the Google fonts team added the ability to specify `display=swap` in your call to their API, and it would add `font-display: swap;` into the returned CSS. I had already made that change, but when I generated the CSS, it didn't have that option. Not knowing if this could cause the issue I was seeing, I made the change anyway, to bring my new local-font version as close as possible to the earlier google-hosted state. Another theme update, another push up to GitHub, another CI build... [and the results are still inconclusive](http://webpagetest.org/video/compare.php?tests=190527_MN_abde3e00da9cd689d3d3819c1544657e,190527_2B_0d3098903974a8443ffae1e66883bc30,190527_KZ_07e92030f40f5dd386092035e5bddc91,190527_3R_6cb9cd8b00fea3a43d2034c44bc8c487,190527_71_67fb9b11b9367197ac663fc7d61ed2c1,190527_3W_b10bd32e62fab4c49d65a43099b0a9f9,190527_EM_3bb87be6c02822dc594adc4b97a35402,190527_GY_fc0c01e4ba17d5c04c0055d31a486dff).

## Results... mixed

At this point, I was torn. I decided to leave it up for a few days and see if my reports through [Speedcurve](https://speedcurve.com) showed an overall improvement.

> My limited experience with SpeedCurve's LUX product makes me think it would work a lot better on a more well trafficked site. With such a small amount of traffic hitting my pages, the data is limited and much more impacted by my own visits and my synthetic testing. If I was to run LUX on [Docs](https://docs.microsoft.com), for example, with 200 million page views per month, the data would likely be more interesting.

Quick answer, data seemed to indicate that it was slower than the previous version. The right thing to do at this point would be to roll back my change, because that is what the data is telling me. I didn't though, and instead I decided to just come back to it in a bit and see what a longer test period produced.

## Update

After [a bit of help from Patrick Meenan](https://twitter.com/Duncanma/status/1137097030679928832), I decided to look into a third-party, externally-hosted, CSS link that is included in my theme. This reference enables the theme to drop [nice svg flags](https://github.com/lipis/flag-icon-css) onto the page when we have translated versions of our posts. Awesome feature and I'm sure it looks great, but I don't translate any of my content, so it will **never** get used. Boom, added a flag to specify if the translation feature is being used and made the inclusion of this file conditional.

```go-html-template
{{ if .Site.Params.hasTranslations }}
<!-- CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/css/flag-icon.min.css" rel="stylesheet"
    type="text/css">
{{ end }}
```

[CSS file references without media queries are render-blocking](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css), so this completely unused set of icons was having a noticeable impact on the performance of the site. That issue was obscuring any benefit from locally-hosting my own fonts. With the change made, I was finally seeing [a substantial improvement in performance from the original baseline](http://webpagetest.org/video/compare.php?tests=190607_AJ_bd594db0b597a35cabfb2245bbaa612b,190527_GY_fc0c01e4ba17d5c04c0055d31a486dff). Since they look so good, here are a few Speedcurve dashboard screenshots showing the performance change (using synthetic monitoring).

![H1 rendering time shows the improvement after getting that unnecessary css file out of there](/images/performance/2019-06-14_H1Render.png)

I was very confused by the high 'visually complete' times I was getting from all of my various testing, but it occurred to me that the little flashing console cursor in my header might be confusing the tests. Since the page kept _changing_, it wasn't ending up visually complete for a long time. Turning off the animation produced this impressive change in the metric, but in reality this had almost no impact on real users.

![Better visually complete metric after turning off my header animation](/images/performance/2019-06-14_SpeedCurve.png)
