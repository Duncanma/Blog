---
date: 2004-09-19T08:10:00+00:00
title: Amazon Web Services 4.0 ... what are you using them for?
type: posts
---
I took Scott Watermasysk's ['book control' ](http://scottwater.com/blog/articles/BookControl.aspx)and modified it recently to display more than one book (moving it to VB.NET along the way), and I reduced the file it pulls from down to just a list of ISBN #s.... but then I wasn't able to display the title of the book as a tooltip (like the original does)... so I signed up for [Amazon's web services](http://www.amazon.com/gp/aws/landing.html/ref=gw1_mm_4/104-8667232-8399159) and added some code to pull the book's info through the web services and cache it for use in the control.

Neat, yes... simple to code, even.... but totally illogical.

It would have been much better to build the use of web services as part of creating the source xml file... and store the book info (title, link URL, image URL) along with the isbn right into that file. That way the web services calls would be reduced to once when adding a book, not every few hours (depending on your caching choices). Normally, when I'm thinking clearly, I like to always go for the cleanest/simplest solution and that is certainly not what I did in this case... but it got me to thinking, now that I've tried these web services, how could I use them in a useful manner on my site?

I didn't come up with any ideas.

Do you use the Amazon Web Services? What for?
