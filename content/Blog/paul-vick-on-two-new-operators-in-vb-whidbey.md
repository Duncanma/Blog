In [a recent post to his blog](http://www.panopticoncentral.net/PermaLink.aspx/086feb98-d3d3-4831-a1ba-e8f70c72dac1), Paul Vick discusses the new **IsNot** Operator (and the history/rational behind the **Is** operator), which allows you to write; 

> <pre><font color="blue" family="Microsoft Sans Serif">If myString <font color="blue" family="Microsoft Sans Serif">IsNot <font color="blue" family="Microsoft Sans Serif">Nothing <font color="blue" family="Microsoft Sans Serif">Then</pre>

instead of 

> <pre><font color="blue" family="Microsoft Sans Serif">If <font color="blue" family="Microsoft Sans Serif">Not myString <font color="blue" family="Microsoft Sans Serif">Is <font color="blue" family="Microsoft Sans Serif">Nothing <font color="blue" family="Microsoft Sans Serif">Then</pre>

and then, [in another post](http://www.panopticoncentral.net/PermaLink.aspx/0d6ba439-8126-427e-952e-3f5fbba33904), he covers the new **TryCast** operator (which is like C#'s &#8216;as' operator), which will allow you to save a bit of extra work (and produce a slight perf improvement in some situations) when checking to see if an object can be cast to a specific type .... allowing you to write; 

> <pre><font color="blue" family="Microsoft Sans Serif">Sub <font color="blue" family="Microsoft Sans Serif">Print(<font color="blue" family="Microsoft Sans Serif">ByVal o <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Object)
    <font color="blue" family="Microsoft Sans Serif">Dim PrintableObject <font color="blue" family="Microsoft Sans Serif">As IPrintable _        = TryCast(o, IPrintable)
    <font color="blue" family="Microsoft Sans Serif">If PrintableObject <font color="blue" family="Microsoft Sans Serif">IsNot <font color="blue" family="Microsoft Sans Serif">Nothing <font color="blue" family="Microsoft Sans Serif">Then
        PrintableObject.<font color="blue" family="Microsoft Sans Serif">Print()
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">If
    ...
<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub
</pre>

instead of the slightly less efficient 

> <pre><font color="blue" family="Microsoft Sans Serif">Sub <font color="blue" family="Microsoft Sans Serif">Print(<font color="blue" family="Microsoft Sans Serif">ByVal o <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Object)
    <font color="blue" family="Microsoft Sans Serif">Dim PrintableObject <font color="blue" family="Microsoft Sans Serif">As IPrintable
    <font color="blue" family="Microsoft Sans Serif">If <font color="blue" family="Microsoft Sans Serif">TypeOf o <font color="blue" family="Microsoft Sans Serif">Is IPrintable <font color="blue" family="Microsoft Sans Serif">Then
        PrintableObject = <font color="blue" family="Microsoft Sans Serif">CType(o, IPrintable)
        PrintableObject.<font color="blue" family="Microsoft Sans Serif">Print()
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">If
    ...
<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub
</pre>