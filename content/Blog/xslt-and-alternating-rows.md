---
date: 2007-08-17T18:54:00+00:00
title: XSLT and Alternating Rows
type: posts
---
Saw this today (it is over a year old though) on [Roger Hartford's blog](http://blogs.dev.bayshoresolutions.com/roger/default.aspx);

> #### [XSLT alternating rows](http://blogs.dev.bayshoresolutions.com/roger/archive/2006/07/31/4008.aspx)
>
> In an XSLT template tag you can simulate the same functionality as in  GridView/DataGrid "AlternatingRowClass" property using this syntax:
> <div class="MyClass">
>     <xsl:if test="position() mod 2 != 1">
>         <xsl:attribute  name="class">AnotherClass</xsl:attribute>
>     </xsl:if>
> </div>
> It's that simple!
> Roger

I'm a big fan of XSLT based processing... and it is great to see ways to get exactly the results you want without additional server or client side code...
