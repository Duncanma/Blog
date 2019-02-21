---
date: 2003-04-06T10:50:00+00:00
title: Int32 or Integer/int?
type: posts
---
 [Brad Abrams posted about the use BCL types vs. language specific type names (in sample code) today](http://blogs.gotdotnet.com/BradA/permalink.aspx/a1ac850b-e21d-4d77-8b93-8832d48af1a1), which just happens to be a topic I've had to think about myself when writing sample code for my own articles, so I thought I would make a comment.

I'm with [Morty](http://morty.info/blog/2003/4.aspx#section-5e6d4e4d-9531-4760-a50d-5683f3252206) on this one... I have the general rule that sample code should be written following the style and convention guidelines for the language. I'm a VB guy, so this usually takes the form of "Write VB code the VB way", but there are exceptions.... For example, I use Integer in my Visual Basic .NET code, not Int32, but I like to use Int32 in Win32 API declarations; the specific size of integer is pretty important at that point so I like to make it clear... Beyond types it gets a little murky... I always use the System.IO classes for File access; VB.NET still has the Open/Put commands but I truly believe that those "legacy" statements are not as good/clear as the new System.IO classes... whereas in the case of Int32 vs. Integer (or MsgBox vs. MessageBox.Show()) it is merely a syntax/style difference.

I think using Int32 in a VB.NET/C# code sample makes it **slightly** less familar to a C++ developer (in the case of C#) or a VB6 developer (in the case of VB6)... and that makes the developer a **little** less comfortable, and therefore a **little** less likely to understand what they've been shown. The purpose of a sample is to explain the concept in terms of code. The purpose of doing in more than one language is to explain the concept in terms that the developer is _already familiar with_... well, following that same guideline and knowing that a VB.NET developer is more familar with Integer than Int32, **they will benefit more from seeing the sample written using the VB data type names.**

Of course, all of this can be ignored if Int32 was the class being demonstrated 🙂
