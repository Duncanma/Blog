---
date: 2003-04-11T00:17:00+00:00
title: Command Line Switch Parser
type: posts
---
I didn't write it (Peter Hallam did), but I was just using it and thought "wow, this is cool, it needs to be found by more people!"

If you build console apps that take multiple arguments (generate.exe /vroot:vbasic /target:c:\files\ ... etc.) then [this](http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=62a0f27e-274e-4228-ba7f-bc0118ecc41e) makes it very easy. To use it, just compile the provided code into a library and reference from your own C#, VB.NET, etc. application.

From the readme;

<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">

    <font face="Courier New">[Command Line Argument Parser](http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=62a0f27e-274e-4228-ba7f-bc0118ecc41e)–––––––––-



    <font face="Courier New">Author: [<font face="Courier New">peterhal@microsoft.com](mailto:peterhal@microsoft.com)



    <font face="Courier New">Parsing command line arguments to a console application is a common problem. This library handles the common task of reading arguments from a command line and filling in the values in a type.



    <font face="Courier New">To use this library, define a class whose fields represent the data that your application wants to receive from arguments on the command line. Then call Utilities.Utility.ParseCommandLineArguments() to fill the object with the data from the command line. Each field in the class defines a command line argument. The type of the field is used to validate the data read from the command line. The name of the field defines the name of the command line option.



    <font face="Courier New">The parser can handle fields of the following types:



    <font face="Courier New">– string– int– uint– bool– enum– array of the above type

</blockquote>

