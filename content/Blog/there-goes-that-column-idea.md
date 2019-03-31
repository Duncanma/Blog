---
date: 2003-02-26T11:13:00+00:00
title: There goes that column idea...
type: posts
tags:
 - Writing
 - Web Development
---
Doesn't anyone use static web pages anymore? I was playing around with some code, just doing a quick prototype of an app for my [Coding4Fun](http://msdn.microsoft.com/columns/codefun.asp) column and (inspired by the cool and useful [PAINT](http://www.neilogic.com/paint.htm) tool) I decided to create an app that would check for changes to a website and give you a little quick-launch menu of updated sites on your system tray (who couldn't use one more icon there?). I thought it would be cool to show how to use the HTTP [If-Modified-Since](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.25) request header combined with the Last-Modified response header to show how quick and easy it is to check for new content using the System.Net classes. Well, the code works fine, it is the web that is broken 😉

Every site I tried this on ([Penny Arcade](http://www.penny-arcade.com), [PVP Online](http://www.pvponline.com), even [MSDN](http://msdn.microsoft.com)) happens to be a dynamic page (php, asp, aspx, whatever), so there is either no Last Modified header and the web server always says it has been modified (when it hasn't) or there is a Last Modified header but it is always equal to the date/time of your request. Either way, you can't use those headers to check if a site has been updated. Fine and dandy, I'm already losing interest in this as a sample for my column but I still want to finish it; so I figure that a quick hash of the HTML will accomplish the same thing. Save the hash and compare it against a hash of the new HTML later, and we'll be set. Nope, no go. If there is a single bit of HTML on the page that is dynamic (such as the page request time being embedded into the HTML somewhere) then, of course, the hash will change and I'll think the page has been updated.

I realize that by carefully scraping the page you could certainly get around these problems, but my two goals had been:

 1. to show how to use the headers to avoid having to even look at the response body (the HTML in this case) and
 2. to create a general purpose utility that would work with most websites.

On to the next idea!

Oh, and if you are wondering how that [PAINT](http://www.neilogic.com/paint.htm) tool handles this? They check a special (likely static!) file on the web site that is automatically updated when the page is changed. That is a perfectly good solution if you are dealing with a single site, but it doesn't really help me with the general case. And, if you are going to spit out a file that helps people (and their tools) know when your page has changed... why not just a RSS feed with links back to your page so that the advertisers are still getting all their hits?
