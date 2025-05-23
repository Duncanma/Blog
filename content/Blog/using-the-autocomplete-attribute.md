---
date: 2025-05-23T14:39:00-07:00
title: Using the correct autocomplete attribute value on input fields
type: posts
tags:
- Coding
- Web Development
description: Using the correct value for the autocomplete attribute will help the browser to provide a helpful experience for your users.
---
One of my common past times is viewing the source of web pages using 'Inspect' in the browser. Often I'm doing this to fix a problem, such as removing `readonly` from a field I need to change, deleting an `onpaste` handler to allow me to paste some text in, or even just putting the value I want into `value` to get around odd form restrictions.

Other times though, I'm just curious why something is happening the way it is. Today, for example, I received an invite to a Slack workspace, and when I put focus on the 'Your name' field, Chrome popped up a list of my credit cards to autofill.

![Chrome's handy credit card autofill UX](/images/CreditCardAutoFill.png)

This honestly happens occasionally, but I was curious why. So I grabbed the source for this `input` element:

```html
<input spellcheck="false" autocorrect="off"
  data-qa="full-name-field" min="0" max="0"
  width="0" aria-describedby="real_name_hint"
  aria-invalid="false" aria-required="false"
  aria-label="Full name" autocomplete="off"
  class="c-input_text c-input_text--large
  c-form--large margin_bottom_100" id="real_name"
  name="real_name" placeholder="Your name"
  type="text" value="">
```

Simplifying this down to only the relevant bits:

```html
<input autocomplete="off" id="real_name"
  name="real_name" placeholder="Your name"
  type="text">
```

The Slack dev team has set autocomplete to `off`, which **should** prevent any form of autocomplete, except it seems to be a known issue that Chrome ignores that ([open chromium bug from 2018](https://issues.chromium.org/issues/40093420)), and seems to be trying to infer the type of field this is (which is the behavior with no `autocomplete` attribute). As to why it decides it is a credit card field, given the values for the id/name you see above, no idea, but it's a bad user experience.

The fix is to use the **right** value for the `autocomplete` attribute though, setting it to `name`, which produces this result:

![Chrome's handy (and correct in this case) name autofill UX](/images/YourNameAutoFill.png)

From this HTML (simplified again):

```html
<input autocomplete="name" id="real_name"
  name="real_name" placeholder="Your name"
  type="text">
```

You can read [the full list of valid tokens for the autocomplete attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete#token_list_tokens), with great details on how they are intended to be used.
