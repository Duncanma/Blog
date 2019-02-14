My simple class:

<pre><font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Class</font> Customer
    <font color="blue" family="Microsoft Sans Serif">Dim</font> m_CustomerName <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">String</font>
    <font color="blue" family="Microsoft Sans Serif">Dim</font> m_CustomerID <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>
    <font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Property</font> CustomerName() <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">String</font>
        <font color="blue" family="Microsoft Sans Serif">Get</font>
            <font color="blue" family="Microsoft Sans Serif">Return</font> m_CustomerName
        <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Get</font>
        <font color="blue" family="Microsoft Sans Serif">Set</font>(<font color="blue" family="Microsoft Sans Serif">ByVal</font> Value <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">String</font>)
            m_CustomerName = Value
        <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Set</font>
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Property</font>
    <font color="blue" family="Microsoft Sans Serif">Public</font> <font color="blue" family="Microsoft Sans Serif">Property</font> CustomerID() <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>
        <font color="blue" family="Microsoft Sans Serif">Get</font>
            <font color="blue" family="Microsoft Sans Serif">Return</font> m_CustomerID
        <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Get</font>
        <font color="blue" family="Microsoft Sans Serif">Set</font>(<font color="blue" family="Microsoft Sans Serif">ByVal</font> Value <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Integer</font>)
            m_CustomerID = Value
        <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Set</font>
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Property</font>
<font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Class</font>
</pre>

Then creating a Generic List and working with it:

<pre><font color="blue" family="Microsoft Sans Serif">Private</font> <font color="blue" family="Microsoft Sans Serif">Sub</font> FillCustomers()
        <font color="blue" family="Microsoft Sans Serif">Dim</font> myCustomers _
<strong>            <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">New</font> Generic.List(<font color="#0000ff">Of</font> Customer)</strong>
        <font color="blue" family="Microsoft Sans Serif">Dim</font> C <font color="blue" family="Microsoft Sans Serif">As</font> Customer
        <font color="blue" family="Microsoft Sans Serif">For</font> i <font color="blue" family="Microsoft Sans Serif">As</font> <font color="blue" family="Microsoft Sans Serif">Integer</font> = 1 <font color="blue" family="Microsoft Sans Serif">To</font> 500
            C = <font color="blue" family="Microsoft Sans Serif">New</font> Customer
            C.CustomerID = i
            C.CustomerName = <font color="red" family="Microsoft Sans Serif">"Name "</font> & i
            myCustomers.<font color="blue" family="Microsoft Sans Serif">Add</font>(C)
        <font color="blue" family="Microsoft Sans Serif">Next</font>
        <font color="blue" family="Microsoft Sans Serif">For</font> <font color="blue" family="Microsoft Sans Serif">Each</font> cust <font color="blue" family="Microsoft Sans Serif">As</font> Customer <font color="blue" family="Microsoft Sans Serif">In</font> myCustomers
            Debug.<font color="blue" family="Microsoft Sans Serif">Print</font>(cust.CustomerName)
        <font color="blue" family="Microsoft Sans Serif">Next</font>
    <font color="blue" family="Microsoft Sans Serif">End</font> <font color="blue" family="Microsoft Sans Serif">Sub</font>
</pre>

Now, isn&#8217;t that nice?