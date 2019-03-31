---
date: 2005-03-09T06:04:00+00:00
title: I need to implement an automated exception report system... it's about time!
type: posts
---
I use [the Exception Handling Block from PAG](http://msdn.microsoft.com/library/en-us/dnpag2/html/ehab.asp), so exceptions anywhere in my application generate a nice (full of data) XML file for me to use after the fact to track down the problem... but that file gets written to the user's local machine... so I have to ask folks to send it to me via email. What I need to implement is some system to upload those reports to me either automatically or on-demand.... Perhaps on application start I should check for the existance of an 'exception file', ask the user if they would like to submit a bug report into our bug tracking software... attach the file and then delete it?

Yeah, that might work...
