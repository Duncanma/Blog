---
date: 2004-06-16T00:55:00+00:00
title: I just like to make things complicated...
type: posts
---
When I started out to build a voting control, I drew up a set of requirements that led to a 5+ table system... some form of UI for creating/editing polls... plus the control itself. Then, when I had SQL running behind my web site, I wanted something up fast.... so I just grabbed a simple voting control from [www.asp.net](http://www.asp.net/) (by Rob Howard). The simplicity of this control (and its database structure) is a big plus, especially for me ... it is a great place to start to play around with ASP.NET.

[<img src="http://msdn.microsoft.com/vbasic/art/blogart/VotingDatabaseBefore_sml.jpg" border="0" />](http://msdn.microsoft.com/vbasic/art/blogart/VotingDatabaseBefore.PNG" rel="lightbox[95]" title="I just like to make things complicated...)

It is nice enough, but it doesn't do what I need, so it is time to go back to my original design and build my own code instead of just messing around with Rob's.

My set of requirements, documented in the tried and true UBL (universal bulleted list) format... which isn't approved by Rational, or even by me, for use on **real** projects but works fairly well when I am the designer/user/developer/tester ...

I need a polling system that allows me to

  * Display different polls on different areas of my site,
      * Specify dates for a poll to appear in different locations (without touching any of my actual site pages)
          * Allow the user to view results without voting, and then to be able to go back and vote if they wish to
              * Allow reporting of poll results, with full details (text displayed, etc..), even after the poll has ceased to be displayed
                  * Track votes by date, so that votes can be summed across all time or for a specific date range
                      * Track the site location from which the vote was submitted, so that response rate and actual results can be compared by location

I think that is about it for requirements... noting that I didn't specify anything about how polls are created, controlled, edited, scheduled... I am a strong believer in incremental development so I can build the first poll or two manually while I finish that side of the system... and now I'm back at my 5 or so tables 🙂

[<img src="http://msdn.microsoft.com/vbasic/art/blogart/VotingDatabaseAfter_sml.jpg" border="0" />](http://msdn.microsoft.com/vbasic/art/blogart/VotingDatabaseAfter.PNG" rel="lightbox[95]" title="I just like to make things complicated...)

There are still changes to make to this design, I want to be able to control the order of Options in the poll, for example... but I think I have enough to start building a proof-of-concept control...

<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Nautical Disaster [[The Tragically Hip](http://www.windowsmedia.com/mg/search.asp?srch=The+Tragically+Hip) / Day for Night])
</div>
