---
date: 2020-06-13T20:52:00+08:00
title: Templates used when building and rendering docs.microsoft.com
type: posts
tags:
- Docs
- Microsoft
- Web Development
images:
- /images/docs/overview.png
description: Content on Docs goes through a build process, and is then served from our rendering layer. At both stages, templates are used to control the output.
docsfeatured: true
draft: true
---

Content on Docs goes through a build process, and is then served from our rendering layer. At both stages, templates are used to control the output.

Revisiting the overview diagram from an earlier article:

![Docs authors work in Git repositories, which are built into content by a Build step, pushed to storage and then served up by the site](/images/docs/overview.png)

In the simplest case, which is a plain markdown file, the build process is essentially just running a markdown to HTML conversion on that content. Metadata is extracted from the 'top matter' yaml block and included as data with the html content.