**UPDATE: I&#8217;ve [updated this application](http://www.duncanmackenzie.net/blog/using-the-xbox-to-twitter-app-please-update-your-client/){.broken_link} since the original version, addressing most of the &#8216;known issues&#8217; listed below**

hey folks, the first version of my xbox to twitter app is done (at least done enough to share!) &#8230; </p> 

  * <a href="http://www.microsoft.com/downloads/details.aspx?familyid=0856eacb-4362-4b0d-8edd-aab15c5e04f5&displaylang=en" target="_blank">Install the .NET Framework 2.0 (if you don&#8217;t have it)</a>
  * <a href="http://www.duncanmackenzie.net/XboxToTwitter/Install/XboxTwitterInstaller.msi" target="_blank" class="broken_link">Install the app</a>
  * Run it (from the &#8220;Duncan Mackenzie&#8221; folder in your Start Menu)
  * Right click the little &#8216;twitter&#8217; icon on your notification area, pick Settings &#8230; enter in your
  * Twitter Email Address
  * Twitter Screen Name
  * Twitter Password
  * Gamertag
  * check &#8220;Updates Enabled&#8221;
  * Click OK to save these settings&#8230; 

  * Now fire up your Xbox 360 and <a href="http://twitter.com/Duncanma/statuses/60427042" target="_blank">updates</a> will be sent to Twitter every few minutes (if you are online and your status has changed)
  * Come back here to post any feedback/problems!

**Known Issues:**

  * &#8216;status has changed&#8217; is a bit too sensitive now&#8230; if you are playing Crackdown and you go from running to driving then your status on Xbox Live actually changes (from &#8220;Running around&#8221; to &#8220;Driving around&#8221;) and the app will post an update &#8230; I&#8217;m planning to add an option to &#8216;only post when the game changes, not the status&#8217;
  * Time delay, Xbox.com&#8217;s data and my app are all using various forms of caching&#8230; so if you put in a game it may be 10-15 minutes before the app notices and posts an update &#8230; also if you put one in, then stop playing a minute later&#8230; you may never see an update
  * The app checks status every 5 minutes, I can make that configurable in the future (but probably limited to no more often than 5 minutes&#8230; I&#8217;ll let you make it less often though)
  * Format of the update: Currently it is &#8220;playing <game title> (<additional info>)&#8221; &#8230; and if you are into config files and user specific isolated storage you can change that&#8230; I&#8217;ll make it part of the settings in a future release.
  * You have to leave it running on a logged in machine to work&#8230; yep&#8230; I have a web based version but I thought people might be worried about giving me their userid/password for twitter so for now I thought I&#8217;d start with this local version.

Security concerns? Yes, you have to enter in your Twitter credentials. Those are stored in plain text on the hard drive&#8230; but it is on your hard drive only &#8230; I never send your Twitter Credentials up to my site, although I do send them as credentials to Twitter when I call the Twitter APIs. Worried I might be sending to my site? Run a HTTP Trace if you&#8217;d like (<a href="http://www.fiddlertool.com/" target="_blank">Fiddler</a>), you&#8217;ll see calls to the Twitter API and calls to a web service on my site to get your gamertag info&#8230; nothing else.