---
date: 2004-04-12T02:28:00+00:00
title: Developing a Windows Forms Wizard...
type: posts
---
I have to admit that I haven't developed a "wizard" framework yet in .NET, I've just been stacking panels on top of each other, naming them step1...stepN and then showing and hiding them as necessary. Not exactly an easy-to-reuse approach, but it works. [Justin Rogers](http://weblogs.asp.net/justin_rogers), a developer who has worked on the GDN Workspaces system, the ASP.NET forums, Terrarium and more... has released an article on his blog that details a structured approach to create a Windows Forms Wizard:

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">

    **<a id="viewpost.ascx_TitleUrl" href="/justin_rogers/articles/111146.aspx">A slightly better WinForms wizard, and slightly more work.</a> **



    **Abstract:**I commented that there were some optimizations we could make to the basic wizard described in my previous article <a id="CategoryEntryList.ascx_EntryStoryList_Entries__ctl0_TitleUrl" href="/justin_rogers/articles/60155.aspx"><font color="#0000ff">Make a Wizard faster than you can take a Wiz.</a>  The primary items of interest were getting rid of the custom message pump, which shouldn't be too hard, and wondering if we could add in some validation logic.  I'm going to take an intermediate step before I get to the validation logic and clean up the look of the UI using an extra layer of abstraction from the original dialog only design.

</blockquote>

Update: Justin has posted [a 3rd installment in this series](http://weblogs.asp.net/justin_rogers/articles/111939.aspx)...
