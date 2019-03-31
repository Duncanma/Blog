---
date: 2003-05-11T10:18:00+00:00
title: Word Automation from C# vs. VB.NET
type: posts
---
I recently received a question about doing some Word automation using .NET, and I saw an interesting little difference between the C# and VB.NET calling into the Interop Assembly for certain properties/methods...

If I take VBA or VB6 code that works, and convert it to the almost identical VB.NET code ... (after adding a reference to Word in my VB.NET project);

<font color="#000000"><font face="Courier New"><font color="#0000ff">Dim <font color="#000000">wordApp <font color="#0000ff">As New <font color="#000000">Word.Application() <font color="#0000ff">Dim <font color="#000000">newDoc <font color="#0000ff">As <font face="Courier New"><font color="#000000">Word.Document = wordApp.Documents.Add newDoc.Range.Text = "Test" newDoc.AttachedTemplate = "C:\....\Macmillan.dot" wordApp.Visible = <font color="#0000ff">True

<font color="#0000ff">
It works fine, but in C# I get an error setting the AttachedTemplate property;

error CS1545: Property, indexer, or event 'AttachedTemplate' is not supported by the language; try directly calling accessor methods 'Word.\_Document.get\_AttachedTemplate()' or 'Word.\_Document.set\_AttachedTemplate(ref object)'

<font color="#000000"><font face="Courier New" color="#0000ff">object <font face="Courier New"><font color="#000000">missing = System.Reflection.Missing.Value;Word.ApplicationClass wordApp = <font color="#0000ff">new <font face="Courier New"><font color="#000000">Word.ApplicationClass(); Word.Document newDoc = wordApp.Documents.Add(<font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font face="Courier New"><font color="#000000">missing); newDoc.Range(<font color="#0000ff">ref <font color="#000000">missing,<font color="#0000ff">ref <font face="Courier New"><font color="#000000">missing).Text = "Test"; newDoc.AttachedTemplate =  @"C:\....\Macmillan.dot"; wordApp.Visible = <font color="#0000ff">true<font color="#000000">;
I was able to make it work by writing the code like this;

<font color="#000000"><font face="Courier New" color="#0000ff">object <font face="Courier New"><font color="#000000">missing = System.Reflection.Missing.Value; Word.ApplicationClass wordApp = <font color="#0000ff">new <font face="Courier New"><font color="#000000">Word.ApplicationClass(); Word.Document newDoc = wordApp.Documents.Add(<font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font color="#000000">missing, <font color="#0000ff">ref <font color="#000000">missing); newDoc.Range(<font color="#0000ff">ref <font color="#000000">missing,<font color="#0000ff">ref <font color="#000000">missing).Text = "Test"; <font color="#0000ff">object <font color="#000000">templateName = (<font color="#0000ff">object<font face="Courier New"><font color="#000000">)@"C:\....\Macmillan.dot"; newDoc.set_AttachedTemplate(<font color="#0000ff">ref <font face="Courier New"><font color="#000000">templateName); wordApp.Visible = <font color="#0000ff">true<font color="#000000">;
I was interested in finding out more about this error so I asked around internally and had it explained to me quite quickly. Looking into the type-library for Word and then the IL of the Interop Assembly would have likely provided the answer as well, but I'm glad I didn't have to get into that. I'll try to pass the explanation along without mangling it too much in the translation (feel free to correct me if you can, or add additional details). Some _properties_ of COM libraries are actually methods that support one or parameters, which is cool with VBA/VB6 as they supported this type of property as well, but they are translated (correctly it seems) by TlbImp.exe as methods (set\_AttachedTemplate, get\_AttachedTemplate)... VB.NET does some additional work for you so that you can still code against these property/methods as properties, but in C# you have to use them as methods. Interesting stuff, and likely a bit of a gotcha for people trying to move VBA code into .NET.

<div class="media">
  [Listening to: In the Air Tonight – [Phil Collins](http://www.windowsmedia.com/mg/search.asp?srch=Phil+Collins) – Miami Vice (05:29)]
</div>
