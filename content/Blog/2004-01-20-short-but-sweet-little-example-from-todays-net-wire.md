I was just reading the latest <a href="http://www.dotnetwire.com/default.asp" target="_blank">dotnetwire</a> newsletter and this article caught my eye.

> <a href="http://www.dotnetwire.com/redirect.asp?newsid=5329" target="_blank">Synchronize Identity Values between Database and DataSet During Updates</a>
  
> After inserting the rows in the database your DataTable does not automatically reflect the identity values of as assigned by the database. The problem can be solved by the clever use of stored procedures and output parameters.

It gives a **very brief** description of an important idea, how to return identity values from an insert without having to do another complete select query (even if you batch it together). I see only one small problem with the sample (besides how little detail it covers) and it is a very common mistake; the use of **@@IDENTITY** to return the PK value from an INSERT.

Assuming you have SQL Server 2000 or later, I wouldn&#8217;t recommend using **@@IDENTITY** to return the PK of the last inserted record, I&#8217;d use **SCOPE_IDENTITY( )** instead. **@@IDENTITY** returns the last inserted identity value, which isn&#8217;t necessarily the record you were just inserted. If a trigger, or multiple chained triggers, has fired in response to your insert it is possible you will retrieve a PK value from a completely different table. **SCOPE_IDENTITY( )**, on the other hand, returns the last identity value **in the same scope, which is the Insert you just executed**.

If you are looking for information on this topic, check out William Vaughn&#8217;s article on just this subject: <a href="http://msdn.microsoft.com/vbasic/using/understanding/data/default.aspx?pull=/library/en-us/dnadonet/html/manidcrisis.asp" target="_blank" class="broken_link"><b>Managing an @@IDENTITY Crisis</b></a>.

The SQL docs on <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/tsqlref/ts_globals_50u1.asp" target="_blank"><b>@@IDENTITY</b></a> and <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/tsqlref/ts_sa-ses_6n8p.asp?frame=true" target="_blank"><b>SCOPE_IDENTITY()</b></a> might also be useful.