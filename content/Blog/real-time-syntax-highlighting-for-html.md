---
date: 2004-04-07T20:22:00+00:00
title: Real-Time Syntax highlighting for HTML...
type: posts
---
Bah... I've been digging around the web for a couple of days now, and I'm getting frustrated, so I thought I would share my pain with you

Here's the scenario (and see if you can spot my key mistake here, it will be pretty obvious to most developers who have worked with customers before);
In a system I've written, the user's have the ability to enter HTML formatted text into various areas of the application. People liked that... they could **bold** pieces of text, insert hyperlinks etc... but it was just plain-text entry (just multi-line textboxes, baby!).... well, eventually (as you might have expected) people wanted a 'richer' HTML editing experience. First pass, I gave them (through the coding genius of Kent Sharkey) the ability to launch their HTML editor of choice (whatever is registered on their machine to edit HTML), giving them all the features of Front Page or VS.NET to edit their HTML snippets. Still, the users wanted richer edting **right in the application**... fine, second pass I gave them [Nikhil's HTML design time editor](http://www.nikhilk.net/Entry.aspx?id=11)... but **they** want HTML editing, not design-time.... so here I am.... heading down the path of writing Front Page's HTML editor...

I'm hoping to just give them basic syntax highlighting (real-time) like w.bloggar does would be enough to me... and I'm currently investigating an article I found on Code Project ([which is available here](http://www.codeproject.com/vb/net/RTBClass.asp))... and [a really full-featured 3rd party control from Actipro](http://www.actiprosoftware.com/Products/DotNet/SyntaxEditor/Default.aspx)... but I'm leaning to the Code Project sample more, because I get to play with the code and I don't have to ask my boss for $$ for a new control 🙂
