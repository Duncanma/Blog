Aug 29

10:20 AM

Duncan M.

source code formatting checked in

Duncan M.

[http://localhost/posts/Sampy/PAX-Day-3-In-&#8230;](http://localhost/posts/Sampy/PAX-Day-3-In-depth-coverage-from-the-Sampy-Cam/?CommentID=342016){.broken_link}

Aug 29

10:25 AM

Duncan M.

<a href="http://duncanmackenzie.net/images/ChattingtodayamongsttheEvNetteam_DBBD/sourcecodeFF.png" rel="lightbox" title="sourcecodeFF"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="205" alt="sourcecodeFF" src="http://duncanmackenzie.net/images/ChattingtodayamongsttheEvNetteam_DBBD/sourcecodeFF_thumb.png" width="260" border="0" /></a> 

Duncan M.

<a href="http://duncanmackenzie.net/images/ChattingtodayamongsttheEvNetteam_DBBD/sourcecodeIE.png" rel="lightbox" title="sourcecodeIE"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="183" alt="sourcecodeIE" src="http://duncanmackenzie.net/images/ChattingtodayamongsttheEvNetteam_DBBD/sourcecodeIE_thumb.png" width="260" border="0" /></a> 

Duncan M.

I started out with overflow-x:auto &#8230; which would add a scroll bar (at least in FF3), but then I went with white-space:pre-wrap; &#8230; but IE doesn&#8217;t like that 🙂

Aug 29

10:55 AM

Duncan M.

Nathan, can you send me the link to those pre-wrap alternates?

Aug 29

11:00 AM

nathan h.

[http://users.tkk.fi/~tkarvine/pre-wrap-css&#8230;](http://users.tkk.fi/~tkarvine/pre-wrap-css3-mozilla-opera-ie.html){.broken_link}

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

I&#8217;ve noticed a lot of people starting to use js includes and other stuff for polls, comments, ratings, etc.

Duncan M.

yep

Erik P.

For us, I think it&#8217;s a matter of integration. Is it something we care to tightly integrate into our system to do custom queries and views things like that or is it something we just want to throw in? For polls, not sure which way is better. What do you think?

Duncan M.

I&#8217;m interested in the <http://disqus.com/> comment system as well &#8230; but not for our core sites

Duncan M.

For polls, I don&#8217;t think we&#8217;d want to do anything with the data that is user specific

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

the ideal type of intergration I could picture with something like polldaddy.com would be to associate a discussion with it somehow (like making it an entry) so that we could show the poll on the home page (sidebar?) and then have a &#8216;click to discuss&#8217; option

Duncan M.

this could be manual even, just create a forum thread about the poll, embed the poll in that thread \*and\* on the home page, and then put a link below the poll on the home page to the thread