---
date: 2025-02-09T17:43:45-08:00
title: Adding llms.txt & markdown output to your Hugo site
type: posts
featured: true
tags:
 - Web Development
 - Coding
 - Hugo
 - Azure
description: Learn how to add LLMs.txt and markdown output support to your Hugo site. Make your content AI-friendly with markdown versions, copy buttons, and proper content headers for better LLM ingestion.
---

If you've been online at all for the past year, you will have been hearing about LLMs (Large Language Models) and AI assistants non-stop. I'm not going to be talking about those systems or products here, but in the end, they are all relying on being able to pull content from the web, your content for example. If you or your company want your content to be accurately ingested by these systems, then one possible solution is to follow the proposal on [the LLMs.txt site](https://llmstxt.org/). This proposal describes how to make your content easier to be consumed by various LLMs, by adding two features to your site.

First, you create a markdown file that describes your site and its content, then make it available at /llms.txt online. This file has a recommended format, detailed in the proposal.
Second, you add plain text (in markdown format) versions of all your content pages, available with a `.md` extension. In the case of my blog, I added this support for my blog posts, my plain content pages, and my tag pages.

To do this yourself, using Hugo, there are only a few steps.

## Adding a llms.txt file

Since this is just a text file, it should be quite easy to add to your Hugo site. Creating a new llms.txt file in your [static assets folder](https://gohugo.io/getting-started/directory-structure/#static) is all it should take. The real trick is writing the content for this file. In my case, I decided to have a quick intro, then a list of top categories of content, and some recent posts.

```md
# Duncan Mackenzie

> Duncan Mackenzie is an engineering manager who writes about web performance, software architecture, and a lot of various topics related to running software teams.
> For every post, you can add `index.md` to the URL to get a markdown version in plain text that you can use as context for calls to LLMs.

You can find [more information about me on this page](/about/index.md).

## Categories

- [Web Performance](/tags/performance/index.md)
- [Engineering Management](/tags/engineering-management/index.md)
- [Web Development](/tags/web-development/index.md)
- [Hugo](/tags/hugo/index.md), the markdown based content publishing system I use, and
- [Photography](/tags/photography/index.md)

## Recent posts

- [Adding photo galleries to my site](/blog/adding-photo-galleries/index.md)
- [A Defensive Approach to Engineering Quality](/blog/a-defensive-approach-to-engineering-quality/index.md)
- [Adding prefetch and prerender using the Speculation Rules API](/blog/speculation-rules/index.md)
- [The inevitable result of focusing only on shipping features](/blog/inevitable-cost-of-focusing-on-only-features/index.md)
- [The importance of visibility to individuals, teams, and companies](/blog/importance-of-visibility/index.md)
- [The Benefits of Peer Feedback](/blog/benefits-of-peer-feedback/index.md)
```

You could put whatever you want in there though but remember to link to the markdown version of your pages and keep it simple. Some folks have suggested providing your entire site in the llms.txt file, but my view is that a large file will be harder to ingest, so it is better to have an introduction and then link out to more content.

## Creating markdown version of your pages

To handle this in Hugo, we need to create a new output format and then new template files for each page type we want to support. Creating the output format is handled in your config file, like this (in `toml` in my case):

```toml
[outputFormats]
  [outputFormats.markdown]
    name = "markdown"
    baseName = "index"
    mediaType = "text/markdown"
    isPlainText = true
```

This defines the format, `markdown`, and then we add it to our `[outputs]` section as well:

```toml
[outputs]
    home = ["HTML", "RSS", "JSON", "OEMBED", "IFRAME"]
    page = ["HTML", "OEMBED", "IFRAME", "MARKDOWN"]
    term = ["HTML", "MARKDOWN"]
```

> More [details on custom output formats are available in the Hugo documentation](https://gohugo.io/configuration/output-formats/).

Once those configuration options are added, you need to have templates created for each page kind (‘page’ and ‘term’ from above) to tell Hugo how to create these new output files.

For my blog posts, and the standalone content pages (such as About), this is handled by adding a single.md file in my `_default` layouts folder (/layouts/_default/). The file itself is ridiculously simple:

```go-html-template
# {{ .Title }}
{{ .RawContent  }}
```

`.RawContent` outputs the source of your page content, which is in markdown, so that's all there is to it. The single heading above this is to bring in the page title, which in Hugo is in your frontmatter.

For the tag pages, this required adding a `list.md` file in my _default layouts folder, but the code was a bit more complex.

```go-html-template
# {{ .Title }}
{{- range .Data.Pages.GroupByDate "2006" }}
## {{ .Key }}
{{- range .Pages }}
- [{{.Title}}]({{.RelPermalink}}index.md)
{{- end }}
{{- end }}
```

This template code creates a single H1 with the tag name, then an H2 for each year of tagged posts, then list items for each specific page. I added `index.md` after the page permalink because I wanted to link to the markdown version of each post.

Finally, I added a `<link>` element into the `<head>` of my pages to indicate the markdown alternative was available.
(This is in the `head.html` partial)

```go-html-template
{{ if .OutputFormats.Get "MARKDOWN" }}
<link href="{{ with .OutputFormats.Get "MARKDOWN" }}{{ .Permalink }}{{ end }}" rel="alternate" type="text/markdown" title="{{ .Title }}" />
{{ end }}
```

## Bonus points, adding a 'copy as markdown' action to my pages

After I originally read about this idea, and did the steps above, I heard that Open AI [added a 'Copy Page' button](https://community.openai.com/t/added-a-copy-page-button-for-docs/1043188) that puts the markdown of the current documentation page into your clipboard. I figured I might as well do the same, so I added a little partial to my pages.

```html
<span class="copyAsMarkdown"><button><svg>…</svg>Copy as Markdown</button></span>
```

Some associated CSS

```css
span.copyAsMarkdown {
  padding-right: 15px;
  float:right;
  display: none;
  button {
    background: none;
    border: none;
    padding: unset;
  }
}
body.hasMarkdown span.copyAsMarkdown {
  display: inline;
}
```

I set the button to be hidden by default (`display: none;`) and then make it visible only if the page has markdown and JavaScript is enabled. This script checks to see if the current page has a markdown equivalent and if so, it adds a class to the body (`hasMarkdown`) to make the button visible, and adds code to the click event of the button to grab the markdown for this page and put it on the clipboard.

```js
const hasMarkdown = "hasMarkdown";
const copySpans = document.querySelectorAll(".copyAsMarkdown");
let markdownLink = null;
const markdownLinks = document.head.querySelectorAll("link[type='text/markdown']");
if (markdownLinks && markdownLinks.length > 0) {
    markdownLink = markdownLinks[0].getAttribute("href");
}
if (markdownLink) {
    document.body.classList.add(hasMarkdown);
}
else {
    document.body.classList.remove(hasMarkdown);
}
copySpans.forEach(element => {
    element.onclick = function(e) {
        e.preventDefault();
        fetch(markdownLink)
            .then(response => response.text())
            .then(markdown => navigator.clipboard.writeText(markdown));
        return false;
    }
});
```

## A small note about configuring file types and response headers

The way I publish and host my content (in Azure Blob Storage, built and uploaded via an Azure DevOps pipeline) means that I don't have direct control over the response headers. To get everything to behave correctly, I wanted these new files (.txt and .md) to have text mime-types (via the `content-type` header) and a `content-disposition` value of `inline` so that they wouldn't be automatically downloaded when opened in a browser. Since I'm not running any server-side code, I can't change the headers programmatically, but I am running Azure Front Door, so I added a rule to set these headers based on the extension of the request.

![Azure Front Door rule configuration showing setting two headers for requests with a md or txt file extension](/images/content-type.png)

## The end result

With all of these changes done and deployed, my site now [has a llms.txt file](/llms.txt), all of my blog posts are available as markdown (for example: [/blog/homegrown-analytics/index.md](/blog/homegrown-analytics/index.md)), so are my tag pages (another example:[/tags/coding/index.md]( /tags/coding/index.md)), and my posts have a little 'copy as markdown' button on the top.
