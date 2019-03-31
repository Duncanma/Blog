---
date: 2004-01-20T21:48:00+00:00
title: Short but sweet little example from today's .NET Wire
type: posts
---
I was just reading the latest [dotnetwire](http://www.dotnetwire.com/default.asp) newsletter and this article caught my eye.

> [Synchronize Identity Values between Database and DataSet During Updates](http://www.dotnetwire.com/redirect.asp?newsid=5329)

> After inserting the rows in the database your DataTable does not automatically reflect the identity values of as assigned by the database. The problem can be solved by the clever use of stored procedures and output parameters.

It gives a **very brief** description of an important idea, how to return identity values from an insert without having to do another complete select query (even if you batch it together). I see only one small problem with the sample (besides how little detail it covers) and it is a very common mistake; the use of **@@IDENTITY** to return the PK value from an INSERT.

Assuming you have SQL Server 2000 or later, I wouldn't recommend using **@@IDENTITY** to return the PK of the last inserted record, I'd use **SCOPE_IDENTITY( )** instead. **@@IDENTITY** returns the last inserted identity value, which isn't necessarily the record you were just inserted. If a trigger, or multiple chained triggers, has fired in response to your insert it is possible you will retrieve a PK value from a completely different table. **SCOPE_IDENTITY( )**, on the other hand, returns the last identity value **in the same scope, which is the Insert you just executed**.

If you are looking for information on this topic, check out William Vaughn's article on just this subject: [<b>Managing an @@IDENTITY Crisis</b>](http://msdn.microsoft.com/vbasic/using/understanding/data/default.aspx?pull=/library/en-us/dnadonet/html/manidcrisis.asp).

The SQL docs on [<b>@@IDENTITY</b>](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/tsqlref/ts_globals_50u1.asp) and [<b>SCOPE_IDENTITY()</b>](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/tsqlref/ts_sa-ses_6n8p.asp?frame=true) might also be useful.
