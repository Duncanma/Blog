---
date: 2005-04-15T15:33:00+00:00
title: Follow up on that label/line control...
type: posts
tags:
 - Coding
---
It seems a few people had questions about [the control I posted previously](http://blogs.duncanmackenzie.net/duncanma/archive/2005/04/14/1306.aspx), so here are answers to two of the questions that people might be running into:

  1. What about word wrapping? Good point, turns out I hadn't quite finished my code before I got distracted by food or coffee... and then I ended up leaving out word wrapping! You just need to modify 1 line to make wrapping work, though:

    Change
    `g.DrawString(Me.Text, f, b, 0, 0, sf)`

    to

    `g.DrawString(Me.Text, f, b, labelBounds, sf)`

    and you should be set.

      * I put the control on the form and I get nothing... no line, just text... what's up? The control draws a line between the end of your text (.Spacing past the end actually) and the right-most edge of the control. So... to make it work, you need to turn AutoSize off (AutoSize = False) and stretch the right edge of the control out to where you want the line to end. That should do it!

    Hope these little "tips" help anyone who wants to try out this control!
