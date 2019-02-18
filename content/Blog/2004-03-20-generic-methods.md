Someone suggested to me that VB.NET Whidbey didn&#8217;t have support for &#8216;Generic Methods&#8217;, so I quickly wrote a bit of sample code to check (yes, it does support Generic Methods) and I thought I&#8217;d post that test code for your amusement.

<pre><font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Class</font> GenericMethodSample
    <font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Sub</font> Swap(<font color="blue" family="Microsoft Sans Serif">Of</font> T)(<font color="blue" family="Microsoft Sans Serif">ByRef</font> i <font color="blue" family="Microsoft Sans Serif">As</font> T, <font color="blue" family="Microsoft Sans Serif">ByRef</font> j <font color="blue" family="Microsoft Sans Serif">As</font> T)
        <font color="blue" family="Microsoft Sans Serif">Dim</font> temp <font color="blue" family="Microsoft Sans Serif">As</font> T
        temp = j
        j = i
        i = temp
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Sub</font>
<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Class</font>

<font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Class</font> Sample

    <font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Sub</font> TestSwap()
        <font color="blue" family="Microsoft Sans Serif">Dim</font> i, j <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>
        i = 3
        j = 12

        Debug.WriteLine(i)
        Debug.WriteLine(j)
        Debug.WriteLine(<font color="red" family="Microsoft Sans Serif">"-------"</font>)

        <font color="blue" family="Microsoft Sans Serif">Dim</font> gm <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">New</font> GenericMethodSample
        gm.Swap(<font color="blue" family="Microsoft Sans Serif">Of</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>)(i, j)
        Debug.WriteLine(i)
        Debug.WriteLine(j)


    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Sub</font>

<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Class</font>

</pre>

If you need the &#8216;blow-by-blow&#8217; explanation of that code&#8230; the key lines to notice are;

<pre><font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Sub</font> Swap(<font color="blue" family="Microsoft Sans Serif">Of</font> T)(<font color="blue" family="Microsoft Sans Serif">ByRef</font> i <font color="blue" family="Microsoft Sans Serif">As</font> T, <font color="blue" family="Microsoft Sans Serif">ByRef</font> j <font color="blue" family="Microsoft Sans Serif">As</font> T)
</pre>

Which declares a &#8220;Generic Method&#8221;, which is then strongly typed at runtime via code like this; 

<pre>gm.Swap(<font color="blue" family="Microsoft Sans Serif">Of</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>)(i, j)
</pre>

**[Update]**: [Paul Vick](http://www.panopticoncentral.net/) points out that (Of Integer) can be skipped on the call, making it just 

<pre>gm.Swap(i, j)
</pre>

because the compiler will infer the correct type argument.