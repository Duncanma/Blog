---
date: 2003-07-25T20:31:00+00:00
title: You learn something new everyday...
type: posts
---
Ok, I know that [Paul](http://www.panopticoncentral.net/) knew this, but did anyone else notice that the [VB.NET Try...Catch syntax](http://msdn.microsoft.com/library/en-us/vblr7/html/vastmTryCatchFinally.asp) includes a 'when' clause?

<pre class="syntax"><b>Try
</b>   [ <i>tryStatements </i>]
[ <b>Catch</b> [ <i>exception</i> [ <b>As</b> <i>type</i><sub> </sub>] ] &lt;u>[ <b>When</b> <i>expression</i> ]&lt;/u>
   [ <i>catchStatements </i>] ]
[ <b>Exit Try </b>]
...
[ <b>Finally</b>
   [ <i>finallyStatements</i> ] ]
<b>End Try</b></pre>

**When**


_Optional. A Catch statement with a When clause will only catch exceptions when expression evaluates to True. A When clause is only applied after checking the type of the exception, and expression may refer to the identifier representing the exception._

I never did! I can't think of a good use for it right at this moment, but I'm still shocked that I never noticed it before... now what to do with it?
