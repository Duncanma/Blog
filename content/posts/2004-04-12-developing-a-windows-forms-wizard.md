I have to admit that I haven&#8217;t developed a &#8220;wizard&#8221; framework yet in .NET, I&#8217;ve just been stacking panels on top of each other, naming them step1&#8230;stepN and then showing and hiding them as necessary. Not exactly an easy-to-reuse approach, but it works. [Justin Rogers](http://weblogs.asp.net/justin_rogers){.broken_link}, a developer who has worked on the GDN Workspaces system, the ASP.NET forums, Terrarium and more&#8230; has released an article on his blog that details a structured approach to create a Windows Forms Wizard:

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
  <p>
    <strong><a id="viewpost.ascx_TitleUrl" href="/justin_rogers/articles/111146.aspx" class="broken_link">A slightly better WinForms wizard, and slightly more work.</a> </strong>
  </p>
  
  <p>
    <strong>Abstract:<br /></strong>I commented that there were some optimizations we could make to the basic wizard described in my previous article <a id="CategoryEntryList.ascx_EntryStoryList_Entries__ctl0_TitleUrl" href="/justin_rogers/articles/60155.aspx" class="broken_link"><font color="#0000ff">Make a Wizard faster than you can take a Wiz.</font></a>&nbsp; The primary items of interest were getting rid of the custom message pump, which shouldn&#8217;t be too hard, and wondering if we could add in some validation logic.&nbsp; I&#8217;m going to take an intermediate step before I get to the validation logic and clean up the look of the UI using an extra layer of abstraction from the original dialog only design.
  </p>
</blockquote>

Update: Justin has posted [a 3rd installment in this series](http://weblogs.asp.net/justin_rogers/articles/111939.aspx){.broken_link}&#8230;