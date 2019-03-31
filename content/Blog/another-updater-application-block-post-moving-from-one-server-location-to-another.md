---
date: 2003-07-21T09:52:00+00:00
title: Another Updater Application Block Post... moving from one server location to another
type: posts
---
The app I am currently working on, and the one that I just recently moved from being an href-exe to being an application that updates itself via the [PAG Updater Application Block](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnbda/html/updater.asp), has always been located on my own Windows XP machine, that is to say... that is the web server where the .exe and other assemblies reside. Well, that causes me all sorts of problems, because it effectively makes my desktop machine into a production box, and one that many people depend upon... restarting is not a possibility, and I even try to minimize the load on the box as it will tend to wreak havoc on some of my users if I fire up 2 copies of VS.NET and Office 2003...

So, I decided to move my web server files onto another machine... one that is already sitting in a operations center, is being maintained by people who make that their business, and is running a Server OS!!!! Well the process for doing that when you have active users using your application and that application was written using the Updater Application Block is pretty easy... but I had to think it through for a few moments to make sure I didn't screw it up... so I thought I would share the process with anyone who is interested.

If you've used the Updater before, then you probably know about the function of the 3 different XML files (as relates to the location of update files), but I'll go through them anyway;

  * The AppStart.exe.config file points at the local directory of your app... that's it, **no server paths are stored here**... which is good because there is no mechanism built into the system to allow you to update this file.
  * YourApp.exe.config contains a http path to the manifest file (an XML file that you generate to say what files make up a new version), so that will have to change, but this file is updated with every new version downloaded
  * The Manifest file contains a http path to the directory that contains the new application files, so that will need to change as well, but you can change this file whenever you want because it is on the server

To start with, the deployed version of your app (lets say it is version 3.0.0.0) has a http path to the Manifest file, lets say it is http://server1/yourapp/manifest.xml, so you will need to put a copy of your manifest file there as usual. In the Manifest file, provide the old server location for the updated (version 3.0.1.0) binaries. (http://server1/yourapp/update/ for example). The new binaries include an updated .config file that points at the new server address for the manifest (http://server2/yourapp/manifest.xml) so any future queries for updated versions will now be pointing at the new server. To avoid any confusion put a new manifest file on the new server that indicates the same version # (3.0.1.0) but points at a server2 install location.

At this point, so after all of the currently deployed applcations perform the next update, your server will never get hit again by that particular install (for that machine) of the application.

The only real problem with this solution is that if anyone ever fires up an old version of the software (3.0.0.0 or earlier) then you will need to have that manifest file available on your old server... so if you wanted to retire or repurpose that server then you have a bit of a problem.

Depending on the # of users you could either use a certain period of time (after which old apps will fail to update) or some programmatic method of confirming the list of users and the version being used by each one... but if it is a large # of users (an Internet distributed application, for example) then you would likely be better off using a different solution in the first place; Don't use the name of any real server in your config file URLs, use a special name that corresponds to a custom DNS entry... and then you can point that entry to one or more servers (it could point at a cluster) however you see fit. Changing servers is merely a DNS update...

In my case, I will leave the files up on my Windows XP server, but with the knowledge that within a few days most or all of the users will have been automatically udpated to point at the new files, so there will be little problem with my machine being offline from time to time.

By leaving the files up, then if it is a year later and someone runs a 3.0.0.0 (or earlier) client, then their application will auto-update (against my desktop) to 3.0.1.0 and then, after the app has been restarted and has retrieved the current manifest file from the new server, update to whatever the current version is on the new server. They get a double-update, which isn't perfect, but it is certainly acceptable for a solution with no coding requred.

If you want to avoid that initial double-update after the server move, then you could do a redirect on the manifest file (using an ISAPI filter, or the like) to automatically redirect them to the new server's manifest file... but that would (as far as I can imagine) require code and I'm going to stick with just updating the xml files as required.

<div class="media">
  ([Listening To](http://msdn.microsoft.com/library/en-us/dncodefun/html/code4fun04252003.asp): Reload [[Rob Zombie](http://www.windowsmedia.com/mg/search.asp?srch=Rob+Zombie) / Matrix Reloaded: The Album Disc 1])
</div>
