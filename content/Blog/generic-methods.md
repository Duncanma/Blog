Someone suggested to me that VB.NET Whidbey didn't have support for &#8216;Generic Methods', so I quickly wrote a bit of sample code to check (yes, it does support Generic Methods) and I thought I'd post that test code for your amusement.

<pre><font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Class GenericMethodSample
    <font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Sub Swap(<font color="blue" family="Microsoft Sans Serif">Of T)(<font color="blue" family="Microsoft Sans Serif">ByRef i <font color="blue" family="Microsoft Sans Serif">As T, <font color="blue" family="Microsoft Sans Serif">ByRef j <font color="blue" family="Microsoft Sans Serif">As T)
        <font color="blue" family="Microsoft Sans Serif">Dim temp <font color="blue" family="Microsoft Sans Serif">As T
        temp = j
        j = i
        i = temp
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub
<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Class

<font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Class Sample

    <font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Sub TestSwap()
        <font color="blue" family="Microsoft Sans Serif">Dim i, j <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer
        i = 3
        j = 12

        Debug.WriteLine(i)
        Debug.WriteLine(j)
        Debug.WriteLine(<font color="red" family="Microsoft Sans Serif">"-------")

        <font color="blue" family="Microsoft Sans Serif">Dim gm <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">New GenericMethodSample
        gm.Swap(<font color="blue" family="Microsoft Sans Serif">Of <font color="blue" family="Microsoft Sans Serif">Integer)(i, j)
        Debug.WriteLine(i)
        Debug.WriteLine(j)


    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub

<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Class

</pre>

If you need the &#8216;blow-by-blow' explanation of that code... the key lines to notice are;

<pre><font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Sub Swap(<font color="blue" family="Microsoft Sans Serif">Of T)(<font color="blue" family="Microsoft Sans Serif">ByRef i <font color="blue" family="Microsoft Sans Serif">As T, <font color="blue" family="Microsoft Sans Serif">ByRef j <font color="blue" family="Microsoft Sans Serif">As T)
</pre>

Which declares a "Generic Method", which is then strongly typed at runtime via code like this; 

<pre>gm.Swap(<font color="blue" family="Microsoft Sans Serif">Of <font color="blue" family="Microsoft Sans Serif">Integer)(i, j)
</pre>

**[Update]**: [Paul Vick](http://www.panopticoncentral.net/) points out that (Of Integer) can be skipped on the call, making it just 

<pre>gm.Swap(i, j)
</pre>

because the compiler will infer the correct type argument.