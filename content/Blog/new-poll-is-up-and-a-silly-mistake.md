---
date: 2004-07-11T00:50:00+00:00
title: New Poll is up and a silly mistake...
type: posts
---
One of the big reasons [I redesigned the poll component](http://weblogs.asp.net/duncanma/archive/2004/06/15/156543.aspx), was so that I could track votes over time... I did this by adding a 'dateVoted' column to my vote table, and then using an “On Insert” trigger to set that column to the current date/time.... peachy keen, except when I exported the tables and stored procs to my live SQL box, I forgot to include my triggers... so all the votes on my previous poll have no date/time info. Yeesh. Oh well, not a big deal since I'm still in the testing/building stage, but still a very silly mistake.

I've put up [a new poll](http://www.duncanmackenzie.net) though... I have a lot of article ideas for my [Coding 4 Fun columns](http://msdn.microsoft.com/vbasic/using/columns/code4fun/default.aspx) and I thought I'd ask people what topic they would like to see sooner rather than later...

