---
date: 2004-08-10T11:16:00+00:00
title: The Updater Application Block... various additions...
type: posts
---
One of the nice things about [the Updater Application Block](http://www.gotdotnet.com/Community/Workspaces/workspace.aspx?id=83c68646-befb-4586-ba9f-fdf1301902f5) is that it was written to be quite extensible... I saw [a post today](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=251828&Page=1#252347) where SamSantiago mentioned [he had created a custom class](http://www.softitechture.com/discussions/) to delete all those old versions on your machine whenever you do an update.... very cool, I'll be trying that out right away...

Personally, I've _updated the updater_ in [a few different ways](http://weblogs.asp.net/duncanma/archive/2003/08/12/23901.aspx), but the most recent changes have been the most reusable, in my opinon;

  * I fixed the code so that it no longer requires users to have admin rights...
  * I added a 'mandatory' flag to the updates (and updated the manifestutility in a few different ways), so that for some updates the client app would know not to ask the user if they want to upgrade... great for occasionally forcing everyone up to the same build...
  * and I modified the manifest retrieval code so that it can call an ASP or ASP.NET page, which in turn allowed me to create a manifest.aspx page that returns different manifests based on the user's credentials (so I can have a 'beta' group who are given one version, and everyone else gets the last major release...)

I've got to work out a way to get these bits of code online.... it isn't hard, but it takes time that I haven't planned in yet 🙂
