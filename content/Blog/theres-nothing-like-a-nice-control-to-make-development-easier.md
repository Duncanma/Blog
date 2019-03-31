---
date: 2004-03-15T04:41:00+00:00
title: There's nothing like a nice control to make development easier...
type: posts
---
I'm just playing around with an internal application, just a tool that hits our internal web services for article ratings (you know, the little box that says "7 out of 9" next to MSDN articles...) and displays the results in a grid. Well, there are a lot of things I've been hoping to add to the Windows Forms Data Grid, and while I've done quite a few of them (3 or 4 custom column types) I've never gotten around to adding the really cool stuff.... but by using someone else's grid, I get all of that functionality for free. I've been a big Janus fan since before .NET... but I never used it in a real project before, since I had already purchased [the excellent "TrueDB Grid" ](http://www.componentone.com/products.aspx?ProductCode=1&#038;ProductID=67)for VB5/6 and ... well... once you've paid for a grid that works well, there is little incentive to try out another one. Anyway, I grabbed the trial edition of [Janus's .NET controls](http://www.janusys.com/janus/library/default.aspx?url=/janus/download/downloadcenter.aspx) and I have to say that I'm impressed... very nice stuff feature wise, and as graphically appealing as I have always thought from looking at their demos.

<img src="http://www.duncanmackenzie.net/JanusGrid.png" border="0" />

I especially like the grouping features, which work a lot like Outlook... and the Field Chooser (shown in the picture above) which knows about all of the available fields from the data source and lets you pick and choose which ones to display in the grid. It doesn't automatically appear though, but it was easy to add. I just created a context menu with a single item "Show Field Chooser" and a teeny bit of code in it (Me.ratingsGrid.ShowFieldChooser())

Anyway, I'm going to get back to coding, but I thought I'd post my thoughts on this....

I hope everyone carefully considers the **build vs buy** decision when they are looking at their UI requirements.... it is often a very cost-effective choice to pick up a control or two... and, on that note.... check out [the VB Control Gallery](http://msdn.microsoft.com/vbasic/vbrkit/component/) that appears to have grown out of the Visual Basic Resource Kit.
