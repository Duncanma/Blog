A friend of mine at work just asked me this VB question, and it is an interesting one to me because it isn&#8217;t as simple as it seems&#8230;

> How do I cast from Integer to IntPtr?

In the end, I never really found an answer to that question, but I found out how to create a new IntPtr from an existing Integer and that seems close enough. You see, CType doesn&#8217;t work because there isn&#8217;t a defined conversion between the two types, and DirectCast only works with object references not value types like IntPtr. There isn&#8217;t a System.Convert method for IntPtr to Int32&#8230; so what can you do? There is one option though, the constructor for IntPtr can accept an Int32 or a Int64 (Integer or Long in VB terms) and will assign the supplied value to the newly created IntPtr.

<pre><font color="Blue" family="Microsoft Sans Serif">Dim</font> x <font color="Blue" family="Microsoft Sans Serif">As</font> IntPtr
        <font color="Blue" family="Microsoft Sans Serif">Dim</font> y <font color="Blue" family="Microsoft Sans Serif">As</font> <font color="Blue" family="Microsoft Sans Serif">Integer</font> = -1
        x = <font color="Blue" family="Microsoft Sans Serif">New</font> IntPtr(y)
</pre>

I never asked why there was a need to cast from Integer to IntPtr, but I&#8217;m assuming it is for some scenario where a handle/pointer is normally supplied or returned but -1 is used to indicate a special case&#8230;