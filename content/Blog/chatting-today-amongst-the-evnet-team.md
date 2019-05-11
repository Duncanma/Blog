---
date: 2008-08-30T07:41:00+00:00
title: Chatting today amongst the EvNet team
type: posts
tags:
 - Channel9
 - Microsoft
---
Aug 29

10:20 AM

Duncan M.

source code formatting checked in

Duncan M.

[http://localhost/posts/Sampy/PAX-Day-3-In-...](http://localhost/posts/Sampy/PAX-Day-3-In-depth-coverage-from-the-Sampy-Cam/?CommentID=342016)

Aug 29

10:25 AM

Duncan M.

![Screenshot of development in progress](/images/chatting_1.png)

Duncan M.

![second screenshot of development in progress](/images/chatting_2.png)

Duncan M.

I started out with overflow-x:auto ... which would add a scroll bar (at least in FF3), but then I went with white-space:pre-wrap; ... but IE doesn't like that 🙂

Aug 29

10:55 AM

Duncan M.

Nathan, can you send me the link to those pre-wrap alternates?

Aug 29

11:00 AM

nathan h.

[http://users.tkk.fi/~tkarvine/pre-wrap-css...](http://users.tkk.fi/~tkarvine/pre-wrap-css3-mozilla-opera-ie.html)

Aug 29

11:05 AM

Duncan M.

thanks

Aug 29

2:35 PM

Duncan M.

I wonder if we should consider using this site to create/embed polls? <http://www.polldaddy.com>

Aug 29

2:45 PM

Erik P.

I've noticed a lot of people starting to use js includes and other stuff for polls, comments, ratings, etc.

Duncan M.

yep

Erik P.

For us, I think it's a matter of integration. Is it something we care to tightly integrate into our system to do custom queries and views things like that or is it something we just want to throw in? For polls, not sure which way is better. What do you think?

Duncan M.

I'm interested in the <http://disqus.com/> comment system as well ... but not for our core sites

Duncan M.

For polls, I don't think we'd want to do anything with the data that is user specific

Aug 29

2:50 PM

Duncan M.

I think they really just want to put it up on the site, gets lots of interaction (including non registered users) and then discuss the results

Aug 29

2:50 PM

Erik P.

Then I think those external things is a good idea. 🙂

Erik P.

is = are

Duncan M.

the ideal type of intergration I could picture with something like polldaddy.com would be to associate a discussion with it somehow (like making it an entry) so that we could show the poll on the home page (sidebar?) and then have a 'click to discuss' option

Duncan M.

this could be manual even, just create a forum thread about the poll, embed the poll in that thread \*and\* on the home page, and then put a link below the poll on the home page to the thread
