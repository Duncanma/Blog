With this final bit of text, this is the whole article... before any of your comments... and before my wonderful editor (Henry Borys) has attacked it. If you were to take the content from these blog entries and diff it with the published article... you'll see the amazing impact that a good editor can have on your writing.

* * *

### Storing and Retrieving the Feed Lists

Once I had the RSS feeds displaying, and I had tested the system with enough sample data (translation: it worked against [my blog's feed](http://weblogs.asp.net/duncanma){.broken_link}) to ensure it was working correctly, it was time to move onto creating code to support retrieving and editing the personal and master feed lists. For now, I only implemented two classes that used the IFeedList interface, one for accessing SQL and one that works with an xml settings file that is unique to the current user. See the code download for the source to the IFeedList interface and to the two implementations.

<pre class="code"><font color="#000000">
<font color="#0000ff">Public Interface <font color="#000000">IFeedList

    <font color="#0000ff">Function <font color="#000000">GetList() <font color="#0000ff">As <font color="#000000">Feeds
    <font color="#0000ff">Function <font color="#000000">AddFeed( _
             <font color="#0000ff">ByVal <font color="#000000">newFeed <font color="#0000ff">As <font color="#000000">Feed) <font color="#0000ff">As Boolean
    Function <font color="#000000">DeleteFeed( _
             <font color="#0000ff">ByVal <font color="#000000">feedToToast <font color="#0000ff">As <font color="#000000">Feed) <font color="#0000ff">As Boolean
    Function <font color="#000000">CanAdd() <font color="#0000ff">As Boolean
    Function <font color="#000000">CanDelete() <font color="#0000ff">As Boolean

End Interface
</pre>

For the personal file based version, I assume that you can add and remove items freely, but for the SQL Server version (which is supposed to be used for accessing a master list shared across multiple users) I needed a bit more security. I use integrated authentication, so you could potentially handle all of your security issues by restricting user permissions in SQL Server, but I decided to use a server role and to check the user's rights by looking at their role membership. Of course, any underlying table or database object security restrictions will also be in affect, providing a second layer of security. The implementation of "CanAdd" is shown below, including the call to a StoredProc that checks for role membership. 

<pre class="code"><font color="#000000"><font color="#0000ff">Public Function <font color="#000000">CanAdd() <font color="#0000ff">As Boolean <font color="#000000">_
       <font color="#0000ff">Implements <font color="#000000">IFeedList.CanAdd
    <font color="#008000">'does the currently logged on user 
    'have rights to add to a table?
    'check if is in the 
    '"FeedAdministrator" role in SQL Server
    <font color="#0000ff">Return <font color="#000000">IsInRole("FeedAdministrator")
<font color="#0000ff">End Function
<font color="#000000">
<font color="#0000ff">Private Function <font color="#000000">IsInRole( _
          <font color="#0000ff">ByVal <font color="#000000">Role <font color="#0000ff">As String<font color="#000000">) <font color="#0000ff">As Boolean
    Try
        Dim <font color="#000000">conn <font color="#0000ff">As New <font color="#000000">_
            SqlClient.SqlConnection( _
                <font color="#0000ff">Me<font color="#000000">.m_connectionString)
        conn.Open()
        <font color="#0000ff">Dim <font color="#000000">cmdIsInRole <font color="#0000ff">As New <font color="#000000">_
            SqlClient.SqlCommand( _
                "IsInRole", conn)
        cmdIsInRole.Parameters.Add( _
            "@Role", SqlDbType.NVarChar, _
            128).Value = Role
        cmdIsInRole.Parameters.Add( _
            "@RC", SqlDbType.Int)
        cmdIsInRole.Parameters( _
            "@RC").Direction = _
            ParameterDirection.ReturnValue
        cmdIsInRole.Parameters.Add( _
            "@Result", SqlDbType.Bit)
        cmdIsInRole.Parameters( _
            "@Result").Direction = _
            ParameterDirection.InputOutput
        cmdIsInRole.Parameters( _
            "@Result").Value = 0
        cmdIsInRole.ExecuteNonQuery()

        <font color="#0000ff">Return CBool<font color="#000000">( _
            cmdIsInRole.Parameters( _
            "@Result").Value())
    <font color="#0000ff">Catch <font color="#000000">ex <font color="#0000ff">As <font color="#000000">Exception
        <font color="#0000ff">Return False
    End Try
End Function

</pre>

I also updated the UI a bit, to support picking a feed from a list of available ones, and to allow you to add any loaded feed into your personal (local) list. Figure 4 shows the completed interface, complete with the new "Save" button and a combo box that you can either use to pick from one of the saved feeds or directly enter the URL of a RSS feed. 

<img src="http://www.duncanmackenzie.net/Figure4.png" border="0" />  
**Figure 4** 

As I developed the system, I decided to break it up for easier reuse in the future, so the embedded browser is now combined with the XSL and RSS code into a custom control, which has been placed onto the form shown in Figure 4. To use this code in my actual application I will likely make a few additional changes to allow me to pass a SQL connection in and place the entire form and all of its associated code into a library project. In the end, I will have something that I can very easily launch from a button on my existing Windows Forms application, but I have built this sample as a standalone application so that you can run it all on its own.

### Resources 

As always, I need to use some resources from various places on the web to build my finished application. I didn't use any GotDotNet user samples in this particular sample, but I did use:

  * Eric J. Smith's excellent "[CodeSmith](http://www.ericjsmith.net/codesmith/){.broken_link}" utility to generate my strongly-typed Feeds collection, 
  * Some starter XSL stolen from the template folder of RSS Bandit ([check out the workspace](http://www.gotdotnet.com/Community/Workspaces/Workspace.aspx?id=cb8d3173-9f65-46fe-bf17-122e3703bb00){.broken_link}!), and 
  * Various bits of XSL and "help desk support" from Kent Sharkey. 

I will also point you to some good sources of RSS data, great material to display using the code from this article, as well as being great reading.

  * Weblogs @ ASP.NET, the main .NET blogging site, complete with an all-up RSS feed is located at [http://weblogs.asp.net]() 
  * GotDotNet has feeds for all sorts of resources, including newly posted user samples, workspaces, and more. Check them all out at <http://www.gotdotnet.com/community/resources/rsshome.aspx>{.broken_link} 
  * MSDN also has RSS, providing listings of the most recently published articles for the whole site, or for individual topic areas such as Visual Basic. Read about them all at http://msdn.microsoft.com/aboutmsdn/rss.asp 
  * I've compiled a selected list of .NET focused bloggers at <http://msdn.microsoft.com/vbasic/support/community/blogs>{.broken_link}, and you can always test your code against my feed at <http://weblogs.asp.net/duncanma/rss.aspx>{.broken_link} 

Of course, there are a great many other RSS feeds out there, but the feeds from those sites should be enough to keep you going for quite awhile.</ul> 

* * *Of course, I usually tack on some other material at the end of the article.... asking readers to submit their samples, etc... but I won't be sticking that into the blog...