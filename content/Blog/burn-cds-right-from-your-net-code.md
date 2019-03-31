---
date: 2003-11-18T01:57:00+00:00
title: Burn CDs right from your .NET code...
type: posts
---
Anson Horton gave me this cool .NET component and source code last night so I've uploaded it to microsoft.com for your burning fun

> The XPBurnComponent allows your .NET applications to burn files to CDR/W discs on a Window XP® or Windows 2003 Server system. This component does not work for systems which have a different OS installed; though it will detect that case and give a reasonable error message. This component talks directly to the system’s IMAPI interfaces and doesn’t use the Windows XP CD burning wizard, so it’s possible to create your own snazzy UI for burning CDs.
>
> Though the component is a UserControl, I wouldn’t recommend that you put it in the toolbox. Instead, simply reference it and use it like you would use any other framework type (the constructor can potentially throw exceptions, so for robust handling you should wrap it in a try…catch). The documentation and source for the component is included in the download.
>
> You can download the component, developer documentation, and source from [here](http://download.microsoft.com/download/6/9/c/69c5d1b7-e3ac-4986-99f1-0c55dc374d66/xpburn.msi). Send any feedback, comments, or bug reports to <ansonh@microsoft.com>.

In a few hours it should be happily living at http://msdn.microsoft.com/vcsharp/team/code/xpburn/default.aspx (future home of samples and any ongoing updates) but the download on its own is available now from [http://download.microsoft.com/download/6/9/c/69c5d1b7-e3ac-4986-99f1-0c55dc374d66/xpburn.msi](http://download.microsoft.com/download/6/9/c/69c5d1b7-e3ac-4986-99f1-0c55dc374d66/xpburn.msi)
