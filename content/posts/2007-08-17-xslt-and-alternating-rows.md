Saw this today (it is over a year old though) on <a href="http://blogs.dev.bayshoresolutions.com/roger/default.aspx" target="_blank" class="broken_link">Roger Hartford&#8217;s blog</a>;

> #### <a href="http://blogs.dev.bayshoresolutions.com/roger/archive/2006/07/31/4008.aspx" target="_blank" class="broken_link">XSLT alternating rows</a>
> 
> In an XSLT template tag you can simulate the same functionality as in&nbsp; GridView/DataGrid &#8220;AlternatingRowClass&#8221; property using this syntax:  
> <div class=&#8221;MyClass&#8221;>  
> &nbsp;&nbsp;&nbsp; <xsl:if test=&#8221;position() mod 2 != 1&#8243;>  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <xsl:attribute&nbsp; name=&#8221;class&#8221;>AnotherClass</xsl:attribute>  
> &nbsp;&nbsp;&nbsp; </xsl:if>  
> </div>  
> It&#8217;s that simple!  
> Roger

I&#8217;m a big fan of XSLT based processing&#8230; and it is great to see ways to get exactly the results you want without additional server or client side code&#8230;