---
date: 2020-05-17T16:22:00-08:00
title: How locale detection and fallback works on Docs
type: posts
tags:
- Docs
- Microsoft
- Localization
description: Docs.microsoft.com can have content in many different languages, requests without a locale in the path go through a discovery process to end up at the right page for the user
docsfeatured: false
---
A few explanations first:

- A locale is a multi-part identifier for a user’s location and language. For example, en-US == English (United States) vs. fr-CA == French (Canada).
- Docs content can exist in 1 to n locales, but if the content exists at all it is available in en-US.
- Localized content (fr-CA version of an en-US article) is either manual (high-quality) translation or machine translation (less accurate).
- The site UX (chrome) is also localized and is independent of the content locale.

## Types of Requests

Users can request a page either with or without a locale in the URL, so given a page like `/azure/article`, you could request it like `https://docs.microsoft.com/fr-ca/azure/article` or `https://docs.microsoft.com/azure/article`

### With Locale

If a user requests a document with a locale in the URL, like this `https://docs.microsoft.com/fr-ca/azure/article`, then a few different things could happen:

- No matter what, the user will see the site chrome in the requested language, fr-ca
- Also, no matter what, the URL will stay as the user requested
- If the content is available in the requested locale (fr-ca), that content will be displayed
  - If the content is **not** available in the requested locale (fr-ca), then a fallback process will happen
  - If the content is available in the fallback locale for the requested locale (in this case, for fr-ca, that is fr-fr … basically "French - France" is the fallback for all variations of French), then that is retrieved and displayed.
  - If the content is not available in the requested (fr-ca) or the fallback (fr-fr), then we will fallback to en-us which is supposed to always be available. In this case, the user would see fr-ca chrome, but en-us content.
- Once the user has requested this page, with a given content locale, they can use the locale picker at the bottom of the page to change to a different locale. If they do this, a cookie is set on the user’s machine to remember this choice.

URLs with locale are the canonical ones: they are what is given to search engines, they are the default URL that is shared to twitter when someone clicks on our sharing options, etc. Ideally though, we'd share the link **without** the locale, so that the user ends up at the appropriate experience for their preferences.

### Without a Locale

If a user requests a document without a locale, like `https://docs.microsoft.com/azure/article`, then a 'locale discovery process' happens.

- First, the site looks to see if the user has a cookie (which is set if the user has been to Docs before and made a personal choice of what locale they want using our locale picker), and if so redirects to a URL that includes that locale.
- Second, if no cookie is found, then the site inspects the incoming request’s Accept-Language header. That header specifies the user’s desired locale, so the site takes that input and redirects the user to a URL that includes the requested URL.
- Finally, if nothing is provided (which should almost never happen in a regular request, as browsers always send the Accept-Language header) the site will redirect the user to a URL including en-us as the locale.
