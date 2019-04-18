---
date: 2004-11-23T06:31:00+00:00
title: Halo 2 Stats via RSS... an interesting idea that I think could be improved
type: posts
tags:
 - Halo
 - Gaming
 - Xbox
 - RSS
---
I like that Bungie is exposing your stats as RSS ([see mine here](http://www.duncanmackenzie.net/halo2.aspx)), but it would be cooler if they had added some additional elements and attributes to the feed to describe the games in a more usable format, rather than just in HTML... instead of;

```xml
<item>
 <title>Rumble Pit: Oddball on Ascension</title>
 <link>http://www.bungie.net/stats/gamestats.aspx?gameid=8132172&player=Festive Turkey</link>
 <pubDate>Fri, 19 Nov 2004 07:45:07 GMT</pubDate>
 <guid>http://www.bungie.net/stats/gamestats.aspx?gameid=8132172&player=Festive Turkey</guid>
 <description>
 Game played at Fri, 19 Nov 2004 07:45:07 GMT<br/><br/>Playlist: Rumble Pit<br/>Oddball on Ascension<br/><br/>
 <b>Gamertag (Team): Score, Kills, Deaths, Assists</b>
 <br/>l obvious l (1): 59, 14, 9, 5<br/>ScottyAK (0): 52, 16, 10, 6<br/>
 BK Assassin (2): 29, 6, 9, 1<br/>MAXODeeZ (3): 18, 7, 12, 4<br/>
 BattlingWheel (4): 15, 10, 13, 5<br/>Festive Turkey (5): 6, 5, 11, 5<br/>
 snackasaurus (6): 0, 6, 7, 6<br/>LionWrath716 (7): 0, 1, 0, 0<br/>
 </description>
</item>
```

they could add a namespace reference for Halo or Bungie.... and end up with...

```xml
<item>
 <title>Rumble Pit: Oddball on Ascension</title>
 <link>http://www.bungie.net/stats/gamestats.aspx?gameid=8132172&player=Festive Turkey</link>
 <pubDate>Fri, 19 Nov 2004 07:45:07 GMT</pubDate>
 <guid>http://www.bungie.net/stats/gamestats.aspx?gameid=8132172&player=Festive Turkey</guid>
 <description>
 Game played at Fri, 19 Nov 2004 07:45:07 GMT<br/><br/>Playlist: Rumble Pit<br/>Oddball on Ascension<br/><br/>
 <b>Gamertag (Team): Score, Kills, Deaths, Assists</b>
 <br/>l obvious l (1): 59, 14, 9, 5<br/>ScottyAK (0): 52, 16, 10, 6<br/>
 BK Assassin (2): 29, 6, 9, 1<br/>MAXODeeZ (3): 18, 7, 12, 4<br/>
 BattlingWheel (4): 15, 10, 13, 5<br/>Festive Turkey (5): 6, 5, 11, 5<br/>
 snackasaurus (6): 0, 6, 7, 6<br/>LionWrath716 (7): 0, 1, 0, 0<br/>
 </description>
 <bungie:game>
    <bungie:datePlayed>Fri, 19 Nov 2004 07:45:07 GMT</bungie:datePlayed>
    <bungie:playlist>Playlist: Rumble Pit</bungieplaylist>
    <bungie:variant>Oddball</bungie:variant>
    <bungie:map>Ascension</bungie:map>
    <bungie:players>
       <bungie:player>
          <bungie:gamertag>Festive Turkey</bungie:gamertag>
          <bungie:score>6</bungie:score>
          <bungie:kills>5</bungie:kills>
          <bungie:deaths>11</bungie:deaths>
          <bungie:assists>5</bungie:assists>
       </bungie:player>
    </bungie:players>
 </bungie:game>
</item>
```

still valid RSS 2.0, still works in aggregators, but suddenly useful to anyone wanting to consume this information for more than just directly viewing it...
