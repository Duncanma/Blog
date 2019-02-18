I&#8217;ve been using [the Application Updater Block](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnbda/html/updater.asp), as you may have gathered from some of my previous posts, and I like it a lot&#8230; but I&#8217;ve been wanting to add a few features to it. Well, I have it all planned out in my head, but I haven&#8217;t gotten around to it, so I thought I would at least throw out my feature ideas and see what people say about them&#8230;

**I would like to add:** 

  * The ability to include a mandatory flag when creating the manifest file for a new version/update. Client applications could see that flag and adjust their UI and UI options accordingly. This could be broken into two levels&#8230; mandatory update (download the update and make it the current version&#8230; then ask the user if they want to restart) or mandatory update and restart (download the update, make it the current version and then **tell** the user that the app is now restarting&#8230; Now, you can implement this in the client now, and make all updates mandatory&#8230; which is what I would do for an application without a UI (such as a service, or system tray app)&#8230; but I&#8217;d like to be able to specify it for only **some** updates via settings in the manifest file.
  * I&#8217;d like to be able to include &#8220;what&#8217;s new&#8221; information in the new manifest file, either as XHTML right in the manifest or as a URL to a &#8220;what&#8217;s new&#8221; page&#8230; and then provide in the updater assembly a nice UI for displaying the complete &#8220;new version available&#8221; message along with this &#8220;What&#8217;s New&#8221; information.

I&#8217;ve implemented part of the 2nd already, but I don&#8217;t include the what&#8217;s new URL with the manifest file, I specify it as a combination of a hard-coded (could be in the app.config) base URL with the version appended (http://server/whatsnew.aspx#1.6.3.2) and then navigate to that URL using an embedded instance of IE 

<img src="http://www.duncanmackenzie.net/UpdateBrowserWindow.png" border="0" />

There is a [workspace](http://www.gotdotnet.com/Community/Workspaces/workspace.aspx?id=83c68646-befb-4586-ba9f-fdf1301902f5){.broken_link} for the App Updater Block, so I suppose I could upload a modified version for people to use, but I just don&#8217;t have the time at the moment&#8230; and by the time I do, I suspect they&#8217;ll have released a new version! 

_On a related note&#8230; if you are looking for a URL where you can find a listing of the PAG application blocks, this (<http://msdn.microsoft.com/vbasic/letters/20030724>{.broken_link}) might do for the time being, but we are working on something better!_ 

<div class="media">
  (<a href="http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp" class="broken_link">Listening To</a>: Yawning or Snarling [<a href="http://www.windowsmedia.com/mg/search.asp?srch=The+Tragically+Hip">The Tragically Hip</a> / Day for Night])
</div>