You may have already noticed this, but the current build of MSDN2 has a bug in the way it colors VB code snippets, as you can see <a href="http://msdn2.microsoft.com/en-us/library/chsc1tx6(en-US,VS.80).aspx" target="_blank">here</a> (scroll down, there are quite a few problems in the code snippet coloring, see how many you can spot!)&#8230; turns out the code wasn&#8217;t handling comments right, text in quotes, and it didn&#8217;t have a full list of the VB keywords (so MsgBox was not recognized, for example). I&#8217;ve fixed it all up now (I think) so that code will work its way through review and test then get added to some not-too-distant update of the site code&#8230; but for now, here is the revised output for those particular code samples.

#### Broken

<pre class="code"><span style="color: green;">' Imports statements must be at the top of a module.</span>
<span style="color: blue;">Imports</span> Microsoft.VisualBasic.CallType</pre>

<pre class="code"><span style="color: blue;">Sub</span> TestCallByName1()
    <span style="color: green;">'Set a property.</span>
    CallByName(TextBox1, "Text", CallType.Set, "<span style="color: blue;">New</span> Text")

    <span style="color: green;">'Retrieve the value of a property.</span>
    MsgBox(CallByName(TextBox1, "Text", CallType.<span style="color: blue;">Get</span>))

    <span style="color: green;">'Call a method.</span>
    CallByName(TextBox1, "Hide", CallType.Method)
<span style="color: blue;">End Sub</span></pre>

<pre class="code"><span style="color: blue;">Public</span> <span style="color: blue;">Sub</span> TestCallByName2()
    <span style="color: blue;">Dim</span> col <span style="color: blue;">As</span> <span style="color: blue;">New</span> Collection()

    'Store the string "Item One" in a collection by 
    <span style="color: green;">'calling the Add method.</span>
    CallByName(col, "Add", CallType.Method, "Item One")

    <span style="color: green;">'Retrieve the first entry from the collection using the </span>
    <span style="color: green;">'Item property and display it using MsgBox().</span>
    MsgBox(CallByName(col, "Item", CallType.<span style="color: blue;">Get</span>, 1))
<span style="color: blue;">End Sub</span></pre>

#### Fixed

<pre class="code"><span style="color: green;">' Imports statements must be at the top of a module.</span>
<span style="color: blue;">Imports</span> Microsoft.VisualBasic.CallType</pre>

<pre class="code" id="ctl00_LibFrame_MainContent_ctl11VisualBasic"><span style="color: blue;">Sub</span> TestCallByName1()
    <span style="color: green;">'Set a property.</span>
    <span style="color: blue;">CallByName</span>(TextBox1, <span style="color: maroon;">"Text"</span>, CallType.Set, <span style="color: maroon;">"New Text"</span>)

    <span style="color: green;">'Retrieve the value of a property.</span>
    <span style="color: blue;">MsgBox</span>(CallByName(TextBox1, <span style="color: maroon;">"Text"</span>, CallType.Get))

    <span style="color: green;">'Call a method.</span>
    <span style="color: blue;">CallByName</span>(TextBox1, <span style="color: maroon;">"Hide"</span>, CallType.Method)
<span style="color: blue;">End</span> <span style="color: blue;">Sub</span></pre>

<pre class="code"><span style="color: blue;">Public</span> <span style="color: blue;">Sub</span> TestCallByName2()
    <span style="color: blue;">Dim</span> col <span style="color: blue;">As</span> <span style="color: blue;">New</span> Collection()

    <span style="color: green;">'Store the string "Item One" in a collection by </span>
    <span style="color: green;">'calling the Add method.</span>
    <span style="color: blue;">CallByName</span>(col, <span style="color: maroon;">"Add"</span>, CallType.Method, <span style="color: maroon;">"Item One"</span>)

    <span style="color: green;">'Retrieve the first entry from the collection using the </span>
    <span style="color: green;">'Item property and display it using MsgBox().</span>
    <span style="color: blue;">MsgBox</span>(CallByName(col, <span style="color: maroon;">"Item"</span>, CallType.Get, 1))
<span style="color: blue;">End</span> <span style="color: blue;">Sub</span></pre>