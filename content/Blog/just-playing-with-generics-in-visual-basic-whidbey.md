My simple class:

<pre><font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Class Customer
    <font color="blue" family="Microsoft Sans Serif">Dim m_CustomerName <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">String
    <font color="blue" family="Microsoft Sans Serif">Dim m_CustomerID <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer
    <font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Property CustomerName() <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">String
        <font color="blue" family="Microsoft Sans Serif">Get
            <font color="blue" family="Microsoft Sans Serif">Return m_CustomerName
        <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Get
        <font color="blue" family="Microsoft Sans Serif">Set(<font color="blue" family="Microsoft Sans Serif">ByVal Value <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">String)
            m_CustomerName = Value
        <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Set
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Property
    <font color="blue" family="Microsoft Sans Serif">Public <font color="blue" family="Microsoft Sans Serif">Property CustomerID() <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer
        <font color="blue" family="Microsoft Sans Serif">Get
            <font color="blue" family="Microsoft Sans Serif">Return m_CustomerID
        <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Get
        <font color="blue" family="Microsoft Sans Serif">Set(<font color="blue" family="Microsoft Sans Serif">ByVal Value <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer)
            m_CustomerID = Value
        <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Set
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Property
<font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Class
</pre>

Then creating a Generic List and working with it:

<pre><font color="blue" family="Microsoft Sans Serif">Private <font color="blue" family="Microsoft Sans Serif">Sub FillCustomers()
        <font color="blue" family="Microsoft Sans Serif">Dim myCustomers _
**            <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">New Generic.List(<font color="#0000ff">Of Customer)**
        <font color="blue" family="Microsoft Sans Serif">Dim C <font color="blue" family="Microsoft Sans Serif">As Customer
        <font color="blue" family="Microsoft Sans Serif">For i <font color="blue" family="Microsoft Sans Serif">As <font color="blue" family="Microsoft Sans Serif">Integer = 1 <font color="blue" family="Microsoft Sans Serif">To 500
            C = <font color="blue" family="Microsoft Sans Serif">New Customer
            C.CustomerID = i
            C.CustomerName = <font color="red" family="Microsoft Sans Serif">"Name " & i
            myCustomers.<font color="blue" family="Microsoft Sans Serif">Add(C)
        <font color="blue" family="Microsoft Sans Serif">Next
        <font color="blue" family="Microsoft Sans Serif">For <font color="blue" family="Microsoft Sans Serif">Each cust <font color="blue" family="Microsoft Sans Serif">As Customer <font color="blue" family="Microsoft Sans Serif">In myCustomers
            Debug.<font color="blue" family="Microsoft Sans Serif">Print(cust.CustomerName)
        <font color="blue" family="Microsoft Sans Serif">Next
    <font color="blue" family="Microsoft Sans Serif">End <font color="blue" family="Microsoft Sans Serif">Sub
</pre>

Now, isn't that nice?