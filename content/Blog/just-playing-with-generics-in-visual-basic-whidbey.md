---
date: 2004-02-20T02:18:00+00:00
title: Just playing with Generics in Visual Basic Whidbey
type: posts
---
My simple class:

```vb
Public Class Customer
    Dim m_CustomerName As String
    Dim m_CustomerID As Integer
    Public Property CustomerName() As String
        Get
            Return m_CustomerName
        End Get
        Set(ByVal Value As String)
            m_CustomerName = Value
        End Set
    End Property
    Public Property CustomerID() As Integer
        Get
            Return m_CustomerID
        End Get
        Set(ByVal Value As Integer)
            m_CustomerID = Value
        End Set
    End Property
End Class
```

Then creating a Generic List and working with it:

```vb
    Private Sub FillCustomers()
        Dim myCustomers _
            As New Generic.List(Of Customer)
        Dim C As Customer
        For i As Integer = 1 To 500
            C = New Customer
            C.CustomerID = i
            C.CustomerName = <font color="red" family="Microsoft Sans Serif">"Name " & i
            myCustomers.Add(C)
        Next
        For Each cust As Customer In myCustomers
            Debug.Print(cust.CustomerName)
        Next
    End Sub
```

Now, isn't that nice?
