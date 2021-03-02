---
date: 2021-02-02T16:30:06-08:00
title: Don't code links to open in a new tab or window.
type: posts
tags:
 - Web Development
 - Accessibility
techfeatured: true
description: Every few days someone will suggest we have our links open in a new tab by default, here is why that is a bad idea
---

This seems to come up every few days, so I thought I would put yet
another post out into the world to try and point out everything that is
wrong with this practice. This has been well documented and studied, so
if you'd rather read something with more data and examples, I definitely
encourage you to read [Opening Links in New Browser Windows and Tabs](https://www.nngroup.com/articles/new-browser-windows-and-tabs/).

## First, what are we talking about?

When you make a link on a web page, it is possible to provide an
attribute (target) that tells the browser to open that link into a new
tab or window. This is not the default. The default behavior is to stay
in the same context (tab) that you are already in. With the default
experience, the user has the option to right-click (or long press on a
mobile device) on the link and **decide** if they'd like to open it in a
new tab. If you code the link to open in a new tab though, the user does
not have any choice about what happens, the link will open outside of
their current context.

## Why is this bad?

The main objection to coding your links like this is that it is taking
control away from the user. In the default case, they can choose to open
in the same tab or a new one, but in this case that choice is removed.
To [quote Jakob
Nielsen](https://www.nngroup.com/articles/the-top-ten-web-design-mistakes-of-1999/),
this is a "user-hostile" action.

Why would a user care? Well, moving to a new tab breaks one of the
fundamental forms of navigation in a browser, the back button. As I
move through a series of links on the web, I've been trained to
understand that I can click on the back button whenever I want to go
back to the previous page I was looking at. Breaking this behavior is
confusing for the user, and the work (cognitive and physical) to go back
to the previous page has increased.

**This is especially true on a mobile device that has a back button always present in the same
location, making it much easier to use than to go up to the little tab
icon and try to find the content you were on before.** In my case, that
icon is a smiley face, which is what Chrome on Android shows when you
have more than 99 tabs open. 

In addition to being more effort to go back, it is more importantly inconsistent. I didn't ask to leave the
context I was in, and now I must realize that for this specific link the
rules have changed, and I can't use the back button like I could for the
last *n* links I clicked on.

## Ok, so that is terrible, why do people keep building links this way?

The argument is generally that we don't want the person to leave the
site and by leaving the original page open, we are making it easier for
them to come back.

As I discussed above, we haven't made it easier at
all. We have our original page still open but getting back to it has
become a bit more difficult. If the user **wanted** to keep it open,
because they were opening a set of resource links to read later, then
they could choose to open the link in a new tab. They'd know exactly why
it opened in a new place and where to look to find both it and the
original page (in their tab list).

## Is there ever a good reason to do this?

There are times when a user would appreciate having something open in a
new window, which is why the browser allows them to do that for any
link. The key is to determine if the positives outweigh the negatives in
your particular use case. If you have a link with some helpful
information on how to fill out the 20th form field in a loan
application, it makes sense to open in a new window (or perhaps in a
sidebar/popup in the same window) so as to not lose any of their work.
If the user is going through a multiple step tutorial, that might be a
good scenario for a new tab.

In any of these cases though, **you should clearly indicate what is
about to happen**. Adding text to the link like "(opens in a new tab)"
communicates to the user what will happen when they click on it. Imagine
in the loan application scenario, without that message a user could be
scared to click on the help link out of fear that they'd lose all their
work.

## References

In addition to the two posts I already mentioned ([The Top 10 Web Design Mistakes of 1999](https://www.nngroup.com/articles/the-top-ten-web-design-mistakes-of-1999/)
and [Opening Links in New Browser Windows and Tabs](https://www.nngroup.com/articles/new-browser-windows-and-tabs/)),
this page from Washington University in St. Louis has a good explanation
of the accessibility side to this discussion **and** a set of even more
reference material: [Links Opening in New Tabs - Diversity & Inclusion](https://diversity.wustl.edu/framework/advisory-best-practice-groups/website-accessibility/links-opening-new-tabs/)
