---
date: 2003-03-16T14:18:00+00:00
title: HREF EXEs are cool.
type: posts
---
I have been, since I started using .NET, a big supporter of the ['Smart Client' or 'Rich Client' application](http://msdn.microsoft.com/msdnmag/issues/02/07/NetSmartClients/toc.asp). I've talked about it to people, I've dug deep into the underlying technology, I've built samples... **big fan of the whole idea**


  . On a parallel track, I wrote several systems internal to MSDN using VB.NET and Windows Forms, but I didn't make any of them into auto-deploying apps (aka no-touch apps, aka HREF EXEs, etc.). Why not? Habit I suppose, it just really didn't occur to me, until after I had sent out a few updates for each of them, then I felt really silly... I'm not supposed to have to do this anymore, sending out updates is a thing of the past!



  Tonight I converted them all to HREF EXEs. I had a little snag, it turns out that when IEExec hosts your EXE it doesn't run it in the same type of Apartment as when you execute it directly (which doesn't matter for most things, but it screws up COM automation and drag and drop), but just adding



  <font face="Courier New" size="2">


    System.Threading.Thread.CurrentThread.ApartmentState = Threading.ApartmentState.STA







    to the start of my app fixed that right up. (and, no, just adding the STA attribute wouldn't do it... in case you are wondering)



    Now, if I build a new version and copy those files to the appropriate web server directory... **bang**, everyone is running the new version the next time they launch the app. No update, no need to send out a "new version" email, unless I just want to let the users know what is new... it is a good thing.



    Tired now, must stop coding...
