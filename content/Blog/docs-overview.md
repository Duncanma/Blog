---
date: 2020-05-19T09:25:00-08:00
title: An overview of Docs.Microsoft.com
type: posts
tags:
- Docs
- Microsoft
- Web Development
description: Docs.microsoft.com was built in 2016 to be a single home for all technical documentation at Microsoft, I'm going to give you an overview of it before I dive into the details of how it all works
docsfeatured: true
---
Up until just a couple of years ago, Microsoft had two main technical documentation sites, MSDN and TechNet, and a ton of product-specific ones. Despite some of the issues that now existed with MSDN, one of its strengths had been that a high percentage of the documentation a developer would need to work with Microsoft products was all available in a single place, with a consistent user experience. Docs was built to bring us back to that idea, but also to take it further, getting rid of the somewhat artificial distinction between developer content (MSDN) and IT Pro content (TechNet). In my own career, while I'm officially a developer, I've often been involved in system management, deployment, scripting and many other topics that were traditionally documented on TechNet. So, at least for technical content, we would move to a world where we had only **one system and one destination**, [docs.microsoft.com](https://docs.microsoft.com). [Our official launch post is up on the Docs blog](https://docs.microsoft.com/teamblog/introducing-docs-microsoft-com) with some more background and lots of images!

## Key design principles

Having built this type of system more than once at Microsoft, there was a lot of existing knowledge about what we needed, what has worked well, and what ended up causing us trouble over the years. Some changes, like a mobile friendly experience, were just a reflection of the evolution of the web over time, but the single biggest driver of the new site was the idea of 'content needs to be up-to-date'. This manifests in two major aspects of the site:

- content that is open to user contributions and
- content that is automatically generated out of our product's source code

Neither of these ideas were completely new or revolutionary, but they are key changes from the world in which MSDN and TechNet were originally created. There are tons of other special features about Docs, and a few other critical principles we focus on, but these two are definitely at the heart of how the platform was envisioned and built.

The desire to support easy community contributions led to the content being stored in Git repositories, written in markdown to make it easy to edit without a ton of special knowledge of our publishing system.

For reference content, (documenting APIs), a series of CI processes using intermediate tooling like [DocFX](https://dotnet.github.io/docfx/), [mdoc](https://github.com/mono/api-doc-tools), [Swagger](https://swagger.io/), [pydoc](https://docs.python.org/3/library/pydoc.html) and others are used to connect our source code repositories with our documentation system. When code changes are made, commits are pushed into our documentation repositories to keep the docs in sync with the product or SDK.

## Localization

One of our guiding principles is that Docs should be 'available for everyone', which includes a set of things including accessibility, stability, web performance and more, but we've also built the concept of localization right into the platform. For any given set of documentation, we configure a set of languages that it should be available in, and when changes are made (this is a reoccurring aspect of the system, [using webhooks to pick up on changes in a repository](https://developer.github.com/webhooks/)) the content is submitted into a system to be translated. Different languages can take different amounts of time, so this is an asynchronous process where content is updated as it is completed. I talked recently about [how locale fallback works on Docs URLs]({{< relref "docs-locale-fallback.md" >}}), which is key as it helps our users end up at the right content based on their preferences. You can read [a complete article on how our localization team makes this all work](https://increment.com/internationalization/microsoft-beyond-translation/) if you are looking for a deeper dive into this aspect of the system.

## Coming Soon

So that's a brief overview of docs, just the top-level details on what it is and why we built it. Next, I'm going to dig into the actual process of how content moves through the system from GitHub up to the pages on the web. After that, we'll get into our templates, how we use the CDN, and then talk about the authoring experience. Lots more to come, links will be added as content is published. If you are looking for a very specific bit of info about Docs, [reach out to me on twitter](https://twitter.com/duncanma) and let me know.
