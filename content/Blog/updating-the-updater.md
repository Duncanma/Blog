---
date: 2003-08-13T09:34:00+00:00
title: Updating the Updater
type: posts
---
I've been using [the Application Updater Block](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnbda/html/updater.asp), as you may have gathered from some of my previous posts, and I like it a lot... but I've been wanting to add a few features to it. Well, I have it all planned out in my head, but I haven't gotten around to it, so I thought I would at least throw out my feature ideas and see what people say about them...

**I would like to add:**

  * The ability to include a mandatory flag when creating the manifest file for a new version/update. Client applications could see that flag and adjust their UI and UI options accordingly. This could be broken into two levels... mandatory update (download the update and make it the current version... then ask the user if they want to restart) or mandatory update and restart (download the update, make it the current version and then **tell** the user that the app is now restarting... Now, you can implement this in the client now, and make all updates mandatory... which is what I would do for an application without a UI (such as a service, or system tray app)... but I'd like to be able to specify it for only **some** updates via settings in the manifest file.
  * I'd like to be able to include "what's new" information in the new manifest file, either as XHTML right in the manifest or as a URL to a "what's new" page... and then provide in the updater assembly a nice UI for displaying the complete "new version available" message along with this "What's New" information.

I've implemented part of the 2nd already, but I don't include the what's new URL with the manifest file, I specify it as a combination of a hard-coded (could be in the app.config) base URL with the version appended (http://server/whatsnew.aspx#1.6.3.2) and then navigate to that URL using an embedded instance of IE

<img src="http://www.duncanmackenzie.net/UpdateBrowserWindow.png" border="0" />

There is a [workspace](http://www.gotdotnet.com/Community/Workspaces/workspace.aspx?id=83c68646-befb-4586-ba9f-fdf1301902f5) for the App Updater Block, so I suppose I could upload a modified version for people to use, but I just don't have the time at the moment... and by the time I do, I suspect they'll have released a new version!

_On a related note... if you are looking for a URL where you can find a listing of the PAG application blocks, this (<http://msdn.microsoft.com/vbasic/letters/20030724>) might do for the time being, but we are working on something better!_

<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Yawning or Snarling [[The Tragically Hip](http://www.windowsmedia.com/mg/search.asp?srch=The+Tragically+Hip) / Day for Night])
</div>
