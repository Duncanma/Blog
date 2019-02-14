I took Scott Watermasysk&#8217;s <a href="http://scottwater.com/blog/articles/BookControl.aspx" target="_blank">&#8216;book control&#8217; </a>and modified it recently to display more than one book (moving it to VB.NET along the way), and I reduced the file it pulls from down to just a list of ISBN #s&#8230;. but then I wasn&#8217;t able to display the title of the book as a tooltip (like the original does)&#8230; so I signed up for <a href="http://www.amazon.com/gp/aws/landing.html/ref=gw1_mm_4/104-8667232-8399159" target="_blank">Amazon&#8217;s web services</a> and added some code to pull the book&#8217;s info through the web services and cache it for use in the control.

Neat, yes&#8230; simple to code, even&#8230;. but totally illogical.

It would have been much better to build the use of web services as part of creating the source xml file&#8230; and store the book info (title, link URL, image URL) along with the isbn right into that file. That way the web services calls would be reduced to once when adding a book, not every few hours (depending on your caching choices). Normally, when I&#8217;m thinking clearly, I like to always go for the cleanest/simplest solution and that is certainly not what I did in this case&#8230; but it got me to thinking, now that I&#8217;ve tried these web services, how could I use them in a useful manner on my site?

I didn&#8217;t come up with any ideas.

Do you use the Amazon Web Services? What for?