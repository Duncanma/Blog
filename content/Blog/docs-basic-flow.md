---
date: 2020-05-23T10:52:00-08:00
title: The basic flow of Docs.Microsoft.com
type: posts
tags:
- Docs
- Microsoft
- Web Development
images:
- /images/docs/overview.png
description: It's a big site, with a lot of moving pieces, but I am going to zoom out and try to start at a simplified view and then drill down one step at a time.
docsfeatured: true
---

It's a big site, with a lot of moving pieces, but I am going to zoom out and try to start at a simplified view and then drill down one step at a time.

_People write some content, and it ends up on the web_

Ok, maybe not that simplified.

## A repo, a build step, a storage system, and a rendering layer

Starting with a little diagram, lets go through the different parts of the basic Docs system.

<img src="/images/docs/overview.png" alt="Docs authors work in Git repositories, which are built into content by a Build step, pushed to storage and then served up by the site" loading="lazy" height="500" width="900">

### Repositories

Content destined for Docs is authored in Git repositories, in each repository you have:

- your articles as markdown files (.md),
- a Table of Contents file (TOC), which used to be a .md file, but we now prefer YAML (.yml),
- a breadcrumb file (yml), and
- any media you need (images)

Already I'm simplifying a bit... there are lots of other files in a given content repo ([check out this one, for our contributors' guide](https://github.com/MicrosoftDocs/Contribute/tree/live)), including some configuration and files that are not part of the content (like a readme.md or a LICENSE file), but the content is represented by the markdown and yaml files listed above. I'll do an authoring specific discussion in a future article that will talk more about the experience of working with the content.

We 'onboard' a repo to Docs by creating an entry for it in our system, with a bit of info such as the URL path that this content should appear under on Docs, and setting up a webhook to let us know whenever a change is made in the repository.

### The build step

When a change is made in a repo, the webhook fires and a message ends up in a queue telling us the content needs to be rebuilt. A worker in the build system picks up this message, downloads the repo to it's local storage and 'builds' the content. This involves running [the DocFX process](https://dotnet.github.io/docfx/) against the files in the repo, turning the markdown into html and YML into JSON. For each file, we end up with a set of metadata about it, along with the blob of content it has been turned into. The resulting set of files are 'published' out to our storage system known as DHS (Document Hosting System).

### Storage

DHS exposes APIs for publishing, querying and retrieving content. The end of the build step produces a set of data that has to be pushed into DHS, with metadata about each file being put into a SQL database. Each record in the database also contains a reference to a blob in storage where the actual output content is placed. We publish content into DHS for all branches of onboarded repositories, so for a given page on Docs, DHS would contain many different rows and content versions for all of the current branches that contain the source file.

### Rendering

The actual 'docs.microsoft.com' site is an Azure App Service. It handles some logic itself, like the `Accept-Language` portion of [the Locale Fallback I discussed recently]({{< relref "docs-locale-fallback.md" >}}), but for any content request it will query the DHS layer. To make this call, the incoming URL is broken up, so a request like `https://docs.microsoft.com/en-us/visualstudio/online/overview/what-is-vsonline`, turns into an API request for the `en-us` version of `online/overview/what-is-vsonline` with a base path of `visualstudio`.

{{% note %}}
One of the things we have to configure when we onboard a content repository is what base path it will live under, and that is a critical element of how content from that repo is stored in DHS. More than one repo can be under the same base path though, which is how we end up with a page like [Ten design principles for Azure applications](https://docs.microsoft.com/en-us/azure/architecture/guide/design-principles/) and the [Get started guide for Azure developers](https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide) both being under `/azure` but with their source content living in two different repositories (try clicking Edit on each of them and you'll see two different GitHub repos).
{{% /note %}}

Once the content is retrieved, it is wrapped in the site chrome (so nicely [illustrated by this completely correct tweet by James Pain](https://twitter.com/jpainio/status/1263159199476920321?s=20)) and the whole result is sent back to the browser.

<img src="/images/docs/chrome.jpg" alt="James Pain&amp;rsquo;s illustration of the chrome around a Docs page" loading="lazy" width="1920" height="1001">

This lookup, retrieval and 'chrome wrapping' step doesn't happen that often, as the final output is cached by our CDN.

## Coming up next

I mentioned that we wrap the chrome around the page in the Rendering layer, I will talk about that step, along with another set of templates that are used at build time, in the next post. Coming along soon after will be posts about how we use the CDN, the authoring workflow, a dive into our structured content (landing pages, API reference and Microsoft Learn), and then some details about how we handle private content in our repos, localization and more.
