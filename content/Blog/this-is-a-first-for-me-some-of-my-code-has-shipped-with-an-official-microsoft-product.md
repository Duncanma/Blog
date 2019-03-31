---
date: 2005-04-08T17:29:00+00:00
title: This is a first for me, some of my code has shipped with an official Microsoft product...
type: posts
---
That may not seem like a big deal to most MIcrosoft developers, since most of them write code for that exact purpose, but I have spent most of my time in Redmond writing sample code and even with my switch to development I'm focused on writing internal systems that are not likely to ever be exposed outside of our own users. Recently, the Tablet PC folks released the "[Experience Pack for Windows XP Tablet PC Edition 2005](http://www.microsoft.com/windowsxp/downloads/tabletpc/experiencepack/default.mspx)", which includes the Media Transfer application/power toy.

> [Getting started with Media Transfer](http://www.microsoft.com/windowsxp/using/tabletpc/experiencepack/mediatransfer.mspx)
> <emphasis>Easily copy photos, music, and videos from your desktop PC to your Tablet PC, even over your wireless network.</emphasis>

Well, behind the scences, that application uses [my BITS code](http://www.duncanmackenzie.net/pull.aspx?pageToPull=http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncodefun/html/code4fun02282003.asp) to handle its file transfers. This Visual Basic .NET library is really [a wrapper around the BITS APIs](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnwxp/html/WinXP_BITS.asp?frame=true), but it is a pretty major abstraction (adding OO concepts and .NET niceties like collections to what is really a flat Win32 style API) that makes it a lot easier to work with the BITS features.

I've seen a demo of the application itself, and the rest of that experience pack, and it looks amazing... but I wouldn't ask me for any more info about it, because I don't have a Tablet PC, so I can't even run it!
