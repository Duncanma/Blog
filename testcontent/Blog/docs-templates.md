---
date: 2020-09-16T14:00:00-08:00
title: Templates used when building and rendering docs.microsoft.com
type: posts
tags:
- Docs
- Microsoft
- Web Development
images:
- /images/docs/templates_chrome.png
description: Content on Docs goes through a build process, and is then served from our rendering layer. At both stages, templates are used to control the output.
docsfeatured: true
---

Content on Docs goes through a build process, and is then served from our rendering layer. At both stages, templates are used to control the output.

Revisiting the overview diagram from an earlier article:

![Docs authors work in Git repositories, which are built into content by a Build step, pushed to storage and then served up by the site](/images/docs/overview.png)

During the build stage, we create the 'content' area of the image below (shown in green, essentially the body of the article and nothing outside of that).

<img src="/images/docs/templates.png" alt="Docs page, highlighting the very center piece of the content" loading="lazy" width="500" height="595">

To create that content area, we take the source document (markdown in many cases, but it could also be YML for more structured data like our API reference) and run it through a template process at build time. This is done with a mix of JavaScript to manipulate the incoming data model, and 'nustache' style templates. For example, to create [this page in our sample browser](https://docs.microsoft.com/en-us/samples/azure-samples/netappfiles-python-smb-sdk-sample/azure-netappfiles-smb-sdk-sample-for-python/), we have this template

```html
<div class="modular-content-container">
	<div class="section is-small is-uniform">
		<h1>{{title}}</h1>

		<ul class="metadata page-metadata" data-bi-name="page info">
			{{#date}}
			<li class="displayDate">
				<time role="presentation" datetime={{dateTime}} data-article-date-source="{{dateSource}}">{{date}}</time>
			</li>
			{{/date}}
			<li class="contributors-holder">
				{{{contributorsHTML}}}
			</li>
		</ul>
		<div class="buttons has-margin-top-medium">
			{{#azureDeployUrl}}
				<a href="{{.}}" class="button is-small" data-bi-name="deploy-to-azure"><span>{{__global.deployToAzure}}</span><span class="icon docon docon-deploy"></span></a>
			{{/azureDeployUrl}}
			{{#codeUrl}}
				<a href="{{.}}" class="button is-small" data-bi-name="browse-to-github"><span>{{__global.browseCode}}</span><span class="icon docon docon-brand-github"></span></a>
			{{/codeUrl}}
			{{#zipUrl}}
				<a href="{{.}}" class="button is-small is-primary" data-bi-name="download-zip-file"><span>{{__global.downloadZIP}}</span><span class="icon docon docon-arrow-down"></span></a>
			{{/zipUrl}}
		</div>

		{{{content}}}
	</div>
</div>
```

This template is only for the content though and does nothing to wrap the page in the 'chrome' such as the header, table of contents along the left side, etc. That work happens later, not at build time, because it needs to know the user's desired language as represented by the locale in the URL (the en-us in a url like `https://docs.microsoft.com/en-us/foo`). We **could** proactively build all possible combinations of chrome locale and content locale at build time, but it would increase that process by a massive level. Instead, at the server, when a request comes in for a given page with a given locale, we fetch the content and then execute a Liquid template based process to wrap it with our header/footer/etc chrome. Everything green in the image below.

<img src="/images/docs/templates_chrome.png" alt="Docs page, highlighting the non-content areas" loading="lazy" width="500" height="595">

This is still not **user specific**, it is **URL specific**, so that we can cache the output of the server for anyone who might request that URL. The Liquid templates are quite large and complex, handling all the details related to the current context of the request. What locale is requested, what locale the content is in, what site this request is for (we use these templates for more than just docs.microsoft.com), and more. Given their size, I'm only including a small snippet below.

```html
<body lang="{{ userLocale }}" dir="{{ userDir }}">
<div class="header-holder has-default-focus">
	<a href="#main" class="skip-to-main-link has-outline-color-text visually-hidden-until-focused is-fixed has-inner-focus focus-visible has-top-zero has-left-zero has-right-zero has-padding-medium has-text-centered has-body-background-medium" tabindex="1">{%- loc skipToMainContent -%}</a>
		<div id="headerAreaHolder" data-bi-name="header">
		{%- include docsHeader.html -%}
		</div>
	{%- assign contentHeaderClasses = "content-header uhf-container has-padding has-default-focus" -%}
	{%- if pageTemplate != 'HubPage' and hasPageActions and page._op_interactive_layout != 'wide' -%}
		{%- assign contentHeaderClasses = contentHeaderClasses | append: " has-border-bottom-none" -%}
	{%- endif -%}
	{% if pageTemplate != 'HubPage' -%}
	<div class="{{contentHeaderClasses}}" data-bi-name="content-header">
		{%- if hasBreadcrumb -%}
			<nav class="has-padding-none has-padding-left-medium-tablet has-padding-right-medium-tablet has-padding-left-none-uhf-tablet has-padding-left-none-uhf-tablet has-padding-none-desktop has-flex-grow" data-bi-name="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList" role="navigation" aria-label="{%- loc breadcrumb -%}">
				<ul id="page-breadcrumbs" class="breadcrumbs">
				</ul>
			</nav>
		{%- endif -%}
```

All of the above describes templates in Docs as they exist now, but I do expect that we'll change them in the future. The core concept that the site returns the same HTML for a given URL should stay true for the vast majority of our pages though, as that is key to how we work with a CDN to enable scaling the site worldwide. In fact, how we work with our CDN is a topic I hope to cover in the next article in the Docs series!
