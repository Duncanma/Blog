---
date: 2005-04-12T16:14:00+00:00
title: Windows Media Player and Visual Studio .NET.... anyone else notice any interaction?
type: posts
---
Ok, this may seem really odd, but I swear it happened to me... 🙂

Yesterday I decided that I would hook up my headphones and listen to some music at work. I do this all the time at home, but not often in the office. I fired up media player on my laptop and started playing a variety of ripped WMA files. Then I opened up VS.NET 2003 and a fairly large project. I immediately got a bunch of errors about references and such, which was odd, since this project was working fine the last time I loaded it. I removed and re-added some references and managed to get rid of all the errors and then I tried to Build... the Build just hanged after awhile and wouldn't complete. VS was still completely responsive, so I just canceled the build and tried again... over and over again the build would just stop at the same point. I restarted VS, same problem... then I finally realized that I had seen this before, and it was because I was playing music. I closed WMP, tried to build.... worked perfectly. I switched to listening to music on my Rio Nitrus...

So before I bug someone on VS about this, has anyone else seen this sort of thing? I'm not sure if it is really to do with WMP, or if it just a high-CPU load background process... I have some fairly high-bitrate music and my laptop is not the fastest machine around (1 GHZ, with 1GB of RAM). This doesn't happen at all at home, but that is a 3.2 GHZ hyper threaded machine, so the difference in configuration could account for the different behaviour.
