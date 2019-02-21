---
date: 2003-03-02T13:55:00+00:00
title: Code Samples and VS.NET
type: posts
---
[

Jimski

](http://dotnetweblogs.com/JArnold)



[

blogged about the IDE

](http://dotnetweblogs.com/JArnold/posts/2740.aspx)

the other day... since I am a writer for MSDN and other places, this a topic that I've thought about quite a bit... sadly, the only real solution seems to be posting code that works with both situations (VS.NET and non-VS.NET) because posting code that doesn't work well in the Windows Forms designer is a bad-experience for people using VS.NET and designer-generated code produces a bad experience for those who are not using VS.NET.

Web Matrix makes this even more interesting as now there are multiple IDEs from Microsoft that might require different code samples/downloads to illustrate the same topic...

To me this is very similar to the idea of posting code in both C# and VB.NET for every article... it is a good idea, but I don't always have the time to produce two versions, so I pick one. Same with the IDE vs. no-IDE, I pick one... and actually I don't always pick the same one. It generally depends on what I am building and who it is for. VB.NET programmers, in general, use the IDE, especially for Windows Forms, so I will provide them with a project file and all that generated code.

On the other hand, the code I wrote for the [Dr. GUI .NET columns ](http://msdn.microsoft.com/library/en-us/dnguinet/html/drguinetnhp.asp)(I'm not Dr. GUI, I just write code for him sometimes) was aimed at people trying to understand the framework, so it was written targetting someone with a text editor and csc/vbc. I wish there were more times when it was easy to do both, but that generally only happens when I do console or library apps; I wrote [some MSMQ articles ](http://msdn.microsoft.com/library/en-us/dnbda/html/bdadotnetasync1.asp)for MSDN that had the vbc and csc command lines as a comment in the first line of each code file, but also included a project file... and I think that would have worked well for both "types" of people. I wrote lots of code in my [book](http://www.duncanmackenzie.net/books/Teach%20Yourself%20Visual%20Basic.NET%20in%2021%20Days.htm) that was aimed at the command line compiler, in an attempt to keep it simple and avoid confusing the beginning programmer with the IDE, but I think it was a mistake; command line compiling just isn't a good experience for a new developer who isn't used to it already.

What do you think I should do about these issues (IDE and language, go ahead and fire away) for my writing? And, while we are on a IDE-related topic, what about the visual tools for building database code? I never use them, I never drag and drop a connection, a data-adapter, or anything like it onto my Forms. So I never use them in my articles. They seem cool enough though, and lots of people like them... I've just had something against wizard-generated code ever since my Fox Pro 2.6 days, and I think my internal "control-freak" is appeased by writing all my data access code by hand... am I crazy? Should I use the tools, do you use them?
