Ron Krauter posted this comment to [one of my earlier posts](http://weblogs.asp.net/duncanma/posts/34182.aspx){.broken_link};

> **re: Reading Blogs&#8230; 11/2/2003 9:59 AM Ron Krauter** 
  
> Hi, 
  
> I read your excellent article about ClickOnce on msdn. One of the problems we are having is deploying applications to users machine that have user only access. Unfortunately, the users are not able to install the application as they do not have admin priviledges. We, the admins, end up going to the client machine and installing the application by using &#8220;RUNAS&#8221;. Is there an easier way to do this with clickonce where admins don&#8217;t have to go to client workstations. Thanks 

Well, Ron&#8230; and anyone else who is wondering about the exact same thing; I have some good news for you. Locked down desktops are one of the key scenarios that ClickOnce is designed to deal with. ClickOnce applications are installed and run on a per-user basis, allowing them to be launched/deployed without administrative level privileges.

So no more running to each machine to do a &#8216;RUNAS&#8217; administrative install.</p> 

It is worth pointing out though, that installing the framework is an &#8216;impactful&#8217; install, using a standard .msi, so getting the framework out ahead of your ClickOnce applications will likely require higher privileges.

_looking for more info on ClickOnce? check out [the first chapter of my book up on MSDN](http://msdn.microsoft.com/vbasic/default.aspx?pull=/library/en-us/dnwinforms/html/clickonce.asp)_