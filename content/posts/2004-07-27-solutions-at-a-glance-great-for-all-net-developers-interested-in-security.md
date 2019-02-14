I was just talking with J.D. Meier ([from PAG](http://www.microsoft.com/practices)) about [the Improving Application Security](http://msdn.microsoft.com/library/en-us/dnnetsec/html/ThreatCounter.asp){.broken_link} book and he pointed out a great page to me&#8230; the &#8220;[Solutions At A Glance](http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMGlance.asp){.broken_link}&#8221; list&#8230; this page lists a ton of very frequently asked questions around .NET security and provides links deep into all that great PAG security info.

Some examples;

  * **How to write secure managed code** 
    
    Use strong names to digitally sign your assemblies and to make them tamperproof. At the&nbsp;same time you need to be aware of strong name issues when you use strong name assemblies with ASP.NET. Reduce your assembly attack profile by adhering to solid object oriented design principles, and then use code access security to further restrict which code can call your code. Use structured exception handling to prevent sensitive information from propagating beyond your current trust boundary and to develop more robust code. Avoid canonicalization issues, particularly with input file names and URLs. 
    
    For information about how to improve the security of your managed code, see Chapter 7, &#8220;[Building Secure Assemblies](http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMCh07.asp){.broken_link}.&#8221; For more information about how to use&nbsp;code access security effectively to further improve security, see Chapter 8, &#8220;[Code Access Security in Practice](http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMCh08.asp){.broken_link}.&#8221; For information about performing managed code reviews, see Chapter 21, &#8220;[Code Review](http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMCh21.asp){.broken_link}.&#8221; </p> 

and

  * **How to prevent SQL injection** 
    
    Use parameterized stored procedures for data access. The use of parameters ensures that input values are checked for type and length. Parameters are also treated as safe literal values and not executable code within the database. If you cannot use stored procedures, use SQL statements with parameters. Do not build SQL statements by concatenating input values with SQL commands. Also, ensure that your application uses a least privileged database login to constrain its capabilities in the database. 
    
    For more information about SQL injection and for further countermeasures, see &#8220;SQL Injection&#8221; in Chapter 14, &#8220;[Building Secure Data Access](http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMCh14.asp){.broken_link}.&#8221; </p> 

For a ton more questions and answers, you can check out the entire page <a href="http://msdn.microsoft.com/library/en-us/dnnetsec/html/THCMGlance.asp" target="_blank" class="broken_link">here</a>