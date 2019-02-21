---
date: 2003-06-22T17:59:00+00:00
title: Multiple Methods for Auto-Updating, which to choose?
type: posts
---
My last two posts mentioned two different ways of achieving similar results; deploying and updating an application over the Internet. Not suprisingly, I received a comment asking how do you determine which of the two methods to use, a very good question which I will try to answer here.

The first thing to understand is that, while the two methods have similar goals, they are different in a key respect; one deploys over the network when you run it, the other uses the network to retrieve updates. No Touch Deployment, or href-exes as they are sometimes called, deploy over the network, reside in the cache, and are kept up-to-date simply because they are always running from their original location and (when run) they always pull down the latest files. Jamie Cool's or PAG's application updater is for update only; the application is installed just like any other application and resides on the local system, but uses the network to check for updated files from one or more servers.

**What does this difference mean?**

**Security**

The first effect of this difference is that href-exes run, by default, in a very limited security context... the Intranet or Internet zone (depending on where you are running it from). In most cases the default permissions provided for those zones will not be enough for your application, which means alterting the permission settings of the target machine in some way. Hopefully, that doesn't mean just giving the Internet zone Full Trust; it is quite possible to trust just the site the exe is coming from or (better yet) trust exes based on the Strong Name public key. Applications using the Application Updater are deployed normally onto the target machine (using an .msi file perhaps) and therefore their default permissions are already Full Trust.

**Offline Support**

Although it is possible, by putting IE into "work offline" mode, href exes do not have a good offline story. Although, with the right permissions, they could be storing data locally, they cannot be run without access to the original server... even if you have no need to update them. This restriction is not a problem for quite a few applications, if they aren't designed for offline on their own. As another result of applications using the Application Updater being installed normally, they can run fine without network access (assuming the application code itself can handle being offline), although attempts to update will fail.

**Simplicity**

To sum up the differences I would have to say that href-exes are simple to use and update, there are no manifest files and there is no code to write, but they are also limited by the security restrictions of applications running in the browser and by the lack of offline support. If you want to build a complex Windows Forms system that stays completely up-to-date using the network... I would go with the application updater solution. There are many more details to be discussed around this topic, but if you want more... I'd suggest you follow some of the links below...

**Resources:**

  * [Application Updater by Jamie Cool](http://windowsforms.net/articles/appupdater.aspx)
  * [GotDotNet Workspace of new PAG version of the same concept](http://www.gotdotnet.com/Community/Workspaces/workspace.aspx?id=83c68646-befb-4586-ba9f-fdf1301902f5)
  * [The WIndows Forms Deployment area of the Visual Basic Developer Center](http://msdn.microsoft.com/vbasic/using/building/windows/deploy/default.aspx)
  * [Deployment Articles on WindowsForms.net](http://www.windowsforms.net/Default.aspx?tabindex=3&tabid=40#Deployment)
  * [Wahoo! An Href-Exe Application Example](http://www.sellsbrothers.com/wahoo) by Chris Sells (and [an associated article](http://msdn.microsoft.com/vbasic/using/columns/wonders/default.aspx?pull=/library/en-us/dnforms/html/winforms11122002.asp))



<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Still Got This Thing [[Alannah Myles](http://www.windowsmedia.com/mg/search.asp?srch=Alannah+Myles) / Alannah Myles])
</div>
