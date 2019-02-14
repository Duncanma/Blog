In [a recent post to his blog](http://www.panopticoncentral.net/PermaLink.aspx/086feb98-d3d3-4831-a1ba-e8f70c72dac1), Paul Vick discusses the new **IsNot** Operator (and the history/rational behind the **Is** operator), which allows you to write; 

> <pre><font color="blue" family="Microsoft Sans Serif">If</font> myString <font color="blue" family="Microsoft Sans Serif">IsNot</font> <font color="blue" family="Microsoft Sans Serif">Nothing</font> <font color="blue" family="Microsoft Sans Serif">Then</font></pre>

instead of 

> <pre><font color="blue" family="Microsoft Sans Serif">If</font> <font color="blue" family="Microsoft Sans Serif">Not</font> myString <font color="blue" family="Microsoft Sans Serif">Is</font> <font color="blue" family="Microsoft Sans Serif">Nothing</font> <font color="blue" family="Microsoft Sans Serif">Then</font></pre>

and then, [in another post](http://www.panopticoncentral.net/PermaLink.aspx/0d6ba439-8126-427e-952e-3f5fbba33904), he covers the new **TryCast** operator (which is like C#&#8217;s &#8216;as&#8217; operator), which will allow you to save a bit of extra work (and produce a slight perf improvement in some situations) when checking to see if an object can be cast to a specific type &#8230;. allowing you to write; 

> <pre><font color="blue" family="Microsoft Sans Serif">Sub</font> <font color="blue" family="Microsoft Sans Serif">Print</font>(<font color="blue" family="Microsoft Sans Serif">ByVal</font> o <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Object</font>)
    <font color="blue" family="Microsoft Sans Serif">Dim</font> PrintableObject <font color="blue" family="Microsoft Sans Serif">As</font> IPrintable _<br />        = TryCast(o, IPrintable)
    <font color="blue" family="Microsoft Sans Serif">If</font> PrintableObject <font color="blue" family="Microsoft Sans Serif">IsNot</font> <font color="blue" family="Microsoft Sans Serif">Nothing</font> <font color="blue" family="Microsoft Sans Serif">Then</font>
        PrintableObject.<font color="blue" family="Microsoft Sans Serif">Print</font>()
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">If</font>
    ...
<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Sub</font>
</pre>

instead of the slightly less efficient 

> <pre><font color="blue" family="Microsoft Sans Serif">Sub</font> <font color="blue" family="Microsoft Sans Serif">Print</font>(<font color="blue" family="Microsoft Sans Serif">ByVal</font> o <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Object</font>)
    <font color="blue" family="Microsoft Sans Serif">Dim</font> PrintableObject <font color="blue" family="Microsoft Sans Serif">As</font> IPrintable
    <font color="blue" family="Microsoft Sans Serif">If</font> <font color="blue" family="Microsoft Sans Serif">TypeOf</font> o <font color="blue" family="Microsoft Sans Serif">Is</font> IPrintable <font color="blue" family="Microsoft Sans Serif">Then</font>
        PrintableObject = <font color="blue" family="Microsoft Sans Serif">CType</font>(o, IPrintable)
        PrintableObject.<font color="blue" family="Microsoft Sans Serif">Print</font>()
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">If</font>
    ...
<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Sub</font>
</pre>