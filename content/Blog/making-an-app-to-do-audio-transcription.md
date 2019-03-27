---
date: 2013-09-08T19:02:19+00:00
title: Making an app to do audio transcription
type: posts
tags:
 - Coding
 - Projects
 - Downloads
 - Open Source
---
Back in the day, [I used to write articles for MSDN](http://www.duncanmackenzie.net/articles/), and I started up this column called “Coding 4 Fun” ([the name lives on today along with some of the same spirit](http://channel9.msdn.com/coding4fun)). The premise was that I would write about code I wrote for my own personal use. [An app to sync photos from my computer to my mother’s so that she would get updates of the kid’s pictures](http://msdn.microsoft.com/en-us/magazine/cc163893.aspx). [A remote control using my Pocket PC (yep, that was a while ago).](http://msdn.microsoft.com/en-us/library/ms973247.aspx) You get the idea.

That mostly all stopped when I joined the Channel 9 team. I didn’t just stop writing articles, I mostly stopped writing code for any reason other than work. Perhaps that’s a bad thing, but either way … no more writing about code for a few years.

A month or so ago though, I was searching the internet for a solution to a problem for my wife Laura. [She writes articles for ParentMap](http://www.parentmap.com/article/fears-fables-and-facts-what-parents-of-babies-and-toddler-worry-about-most-) (a local parenting publication here in the Seattle area), and as part of that job she records interviews with people on digital recorder. I noticed that after recording the interview, she would spend a long time transcribing the interview from the sound file into text. You can probably understand how time-consuming that is using something like Windows Media Player. Press play, type for a bit, use your mouse to move the slider back because you missed something, go back to typing, slide it back, pause it, play it… it took **ages** to turn the audio into text. My first thought was some sort of speech recognition, but:

  * since she would be quoting people it had to be exact, not close and
  * the results I experienced running a few of her recordings through a few apps ranged from hilarious to terrible.

So I downloaded a bunch of apps, free or trial versions, that seemed to be what I wanted … an app for you to control audio playback while you typed up the transcript. Some of the high-priced ones, meant for legal or medical transcription, looked perfect… but Laura is not getting paid doctor or lawyer money to write these articles, so paying those types of prices seemed very wrong. Instead I decided to write something myself. This is the result of maybe 30-45 minutes work, and most of that was spent fiddling with different key bindings for controlling the playback.

![Screenshot of the audio transcription app ui](/images/AudioTranscription.png)

The key bindings I settled on were designed to allow you to keep your hands on the keyboard during the entire transcription.

  * Tab pauses the audio, press it again to jump back 5 seconds (configurable) and resume playback
  * \ (which happens to be in a good spot on my keyboard and my wife’s … opposite side but same spot as Tab) just jumps back 5 seconds without pausing.

It works really well for her purposes; well enough that I thought I should post it. [So here you go, it is a Visual Studio 2012 package, written in C# and posted here in a zip](/downloads/AudioTranscription.zip).
