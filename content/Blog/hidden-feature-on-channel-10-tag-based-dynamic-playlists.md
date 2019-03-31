---
date: 2007-01-20T01:09:00+00:00
title: Hidden Feature on Channel 10, tag based dynamic playlists
type: posts
---
While working on a certificate issue for the 'next' iteration of on10.net, I decided to code up a new feature that has been sitting on our feature list for quite some time. ASX files are very simple files that let you list out a series of media files and Windows Media Player will happily play them in sequence, so I wrote some code so that a URL like this:

[http://www.on10.net/tags/E3/asx/](http://www.on10.net/tags/E3/asx/ "http://www.on10.net/tags/E3/asx/")

Will output an ASX file containing recent videos tagged with 'E3'.

Woo hoo, exciting... well, maybe not **that** exciting, but it does mean that you can pick a topic you are interested in (like Xbox 360), go to [one link](http://on10.net/tags/Xbox+360/asx/) and have a bunch of videos play through without any more clicking/navigating...

A couple of notes:

  * When they are playing if you want to jump to the next one, just use the Next track button in WMP.
  * If your shuffle option is on, the videos will play in random order, which might surprise you (it suprised me)
