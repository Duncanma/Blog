---
date: 2003-08-12T22:41:00+00:00
title: And now for the last...
type: posts
---
With this final bit of text, this is the whole article... before any of your comments... and before my wonderful editor (Henry Borys) has attacked it. If you were to take the content from these blog entries and diff it with the published article... you'll see the amazing impact that a good editor can have on your writing.

* * *

### Storing and Retrieving the Feed Lists

Once I had the RSS feeds displaying, and I had tested the system with enough sample data (translation: it worked against [my blog's feed](http://weblogs.asp.net/duncanma)) to ensure it was working correctly, it was time to move onto creating code to support retrieving and editing the personal and master feed lists. For now, I only implemented two classes that used the IFeedList interface, one for accessing SQL and one that works with an xml settings file that is unique to the current user. See the code download for the source to the IFeedList interface and to the two implementations.

```vb
Public Interface IFeedList

    Function GetList() As Feeds
    Function AddFeed( _
             ByVal newFeed As Feed) As Boolean
    Function DeleteFeed( _
             ByVal feedToToast As Feed) As Boolean
    Function CanAdd() As Boolean
    Function CanDelete() As Boolean

End Interface
```

For the personal file based version, I assume that you can add and remove items freely, but for the SQL Server version (which is supposed to be used for accessing a master list shared across multiple users) I needed a bit more security. I use integrated authentication, so you could potentially handle all of your security issues by restricting user permissions in SQL Server, but I decided to use a server role and to check the user's rights by looking at their role membership. Of course, any underlying table or database object security restrictions will also be in affect, providing a second layer of security. The implementation of "CanAdd" is shown below, including the call to a StoredProc that checks for role membership.

```vb
Public Function CanAdd() As Boolean _
       Implements IFeedList.CanAdd
    'does the currently logged on user
    'have rights to add to a table?
    'check if is in the
    '"FeedAdministrator" role in SQL Server
    Return IsInRole("FeedAdministrator")
End Function

Private Function IsInRole( _
          ByVal Role As String) As Boolean
    Try
        Dim conn As New _
            SqlClient.SqlConnection( _
                Me.m_connectionString)
        conn.Open()
        Dim cmdIsInRole As New _
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

        Return CBool( _
            cmdIsInRole.Parameters( _
            "@Result").Value())
    Catch ex As Exception
        Return False
    End Try
End Function
```

I also updated the UI a bit, to support picking a feed from a list of available ones, and to allow you to add any loaded feed into your personal (local) list.

As I developed the system, I decided to break it up for easier reuse in the future, so the embedded browser is now combined with the XSL and RSS code into a custom control, which has been placed onto the form shown in Figure 4. To use this code in my actual application I will likely make a few additional changes to allow me to pass a SQL connection in and place the entire form and all of its associated code into a library project. In the end, I will have something that I can very easily launch from a button on my existing Windows Forms application, but I have built this sample as a standalone application so that you can run it all on its own.

### Resources

As always, I need to use some resources from various places on the web to build my finished application. I didn't use any GotDotNet user samples in this particular sample, but I did use:

  * Eric J. Smith's excellent "[CodeSmith](http://www.ericjsmith.net/codesmith/)" utility to generate my strongly-typed Feeds collection,
  * Some starter XSL stolen from the template folder of RSS Bandit ([check out the workspace](http://www.gotdotnet.com/Community/Workspaces/Workspace.aspx?id=cb8d3173-9f65-46fe-bf17-122e3703bb00)!), and
  * Various bits of XSL and "help desk support" from Kent Sharkey.

I will also point you to some good sources of RSS data, great material to display using the code from this article, as well as being great reading.

  * Weblogs @ ASP.NET, the main .NET blogging site, complete with an all-up RSS feed is located at [http://weblogs.asp.net]()
  * GotDotNet has feeds for all sorts of resources, including newly posted user samples, workspaces, and more. Check them all out at <http://www.gotdotnet.com/community/resources/rsshome.aspx>
  * MSDN also has RSS, providing listings of the most recently published articles for the whole site, or for individual topic areas such as Visual Basic. Read about them all at http://msdn.microsoft.com/aboutmsdn/rss.asp
  * I've compiled a selected list of .NET focused bloggers at <http://msdn.microsoft.com/vbasic/support/community/blogs>, and you can always test your code against my feed at <http://weblogs.asp.net/duncanma/rss.aspx>

Of course, there are a great many other RSS feeds out there, but the feeds from those sites should be enough to keep you going for quite awhile.</ul>

* * *Of course, I usually tack on some other material at the end of the article.... asking readers to submit their samples, etc... but I won't be sticking that into the blog...
