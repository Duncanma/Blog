---
date: 2004-05-13T11:55:00+00:00
title: Enabling/Disabling AutoRun from your .NET application...
type: posts
---
I answer quite a few questions on the forums on [GotDotNet](http://www.gotdotnet.com/), and sometimes those answers are interesting enough (in my opinion) to be exposed to a larger audience.... Coding [this particular one](http://www.gotdotnet.com/Community/MessageBoard/Thread.aspx?id=220170&Page=1#222216) caused [Brian Johnson](http://blogs.msdn.com/brianjo) to say... "cool", so it seems worth posting about here 🙂

The question was (paraphrased) "How do I stop AutoRun from happening while my app is running and the user puts in a CD?", and the answer is that if your app is the active application, then you can listen for and respond to a certain Windows Message (QueryCancelAutoPlay) and choose to cancel the AutoRun/AutoPlay action for that particular moment (the next CD inserted will result in the message being sent again, and your code gets to choose once again whether or not to cancel the event). Only one Win32 API call is required, RegisterWindowMessage, and overall it is pretty simple code. [More details on the underlying functionality is available on MSDN](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/programmersguide/shell_basics/shell_basics_extending/autorun/autoplay_reg.asp).

Not complicated, but neat enough.... and definitely something I'm going to add to my musicxp system.

Demo app with source available [on my personal site](http://www.duncanmackenzie.net/Samples/default.aspx)
