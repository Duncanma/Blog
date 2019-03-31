---
date: 2007-05-11T19:58:00+00:00
title: Connect your Xbox 360 Gamertag to Twitter
type: posts
---
**UPDATE: I've [updated this application](http://www.duncanmackenzie.net/blog/using-the-xbox-to-twitter-app-please-update-your-client/) since the original version, addressing most of the 'known issues' listed below**

hey folks, the first version of my xbox to twitter app is done (at least done enough to share!) ...

  * [Install the .NET Framework 2.0 (if you don't have it)](http://www.microsoft.com/downloads/details.aspx?familyid=0856eacb-4362-4b0d-8edd-aab15c5e04f5&displaylang=en)
  * [Install the app](http://www.duncanmackenzie.net/XboxToTwitter/Install/XboxTwitterInstaller.msi)
  * Run it (from the "Duncan Mackenzie" folder in your Start Menu)
  * Right click the little 'twitter' icon on your notification area, pick Settings ... enter in your
  * Twitter Email Address
  * Twitter Screen Name
  * Twitter Password
  * Gamertag
  * check "Updates Enabled"
  * Click OK to save these settings...

  * Now fire up your Xbox 360 and [updates](http://twitter.com/Duncanma/statuses/60427042) will be sent to Twitter every few minutes (if you are online and your status has changed)
  * Come back here to post any feedback/problems!

**Known Issues:**

  * 'status has changed' is a bit too sensitive now... if you are playing Crackdown and you go from running to driving then your status on Xbox Live actually changes (from "Running around" to "Driving around") and the app will post an update ... I'm planning to add an option to 'only post when the game changes, not the status'
  * Time delay, Xbox.com's data and my app are all using various forms of caching... so if you put in a game it may be 10-15 minutes before the app notices and posts an update ... also if you put one in, then stop playing a minute later... you may never see an update
  * The app checks status every 5 minutes, I can make that configurable in the future (but probably limited to no more often than 5 minutes... I'll let you make it less often though)
  * Format of the update: Currently it is "playing <game title> (<additional info>)" ... and if you are into config files and user specific isolated storage you can change that... I'll make it part of the settings in a future release.
  * You have to leave it running on a logged in machine to work... yep... I have a web based version but I thought people might be worried about giving me their userid/password for twitter so for now I thought I'd start with this local version.

Security concerns? Yes, you have to enter in your Twitter credentials. Those are stored in plain text on the hard drive... but it is on your hard drive only ... I never send your Twitter Credentials up to my site, although I do send them as credentials to Twitter when I call the Twitter APIs. Worried I might be sending to my site? Run a HTTP Trace if you'd like ([Fiddler](http://www.fiddlertool.com/)), you'll see calls to the Twitter API and calls to a web service on my site to get your gamertag info... nothing else.
