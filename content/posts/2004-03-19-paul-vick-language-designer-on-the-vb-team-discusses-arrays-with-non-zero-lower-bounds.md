One of the changes from VB6 to VB.NET was the removal of non-zero lower bounded arrays&#8230; a concept discussed by Eric Gunnerson [recently](http://blogs.msdn.com/ericgu/archive/2004/03/16/90724.aspx), and now covered by Paul&#8230; giving it a bit of VB perspective.

> **[Non-zero lower bounded arrays (the other side of the coin)](http://www.panopticoncentral.net/PermaLink.aspx/f519385b-45a1-4b48-b85f-681c273e1d24)**
  
>  _&#8230; To finesse this issue, the CLR designers came up with a compromise: there would be two kinds of arrays in the CLR. One kind, which I&#8217;ll call &#8220;arrays,&#8221; were just like normal VB arrays &#8211; they could have non-zero lower bounds. The other kind, which I&#8217;ll call &#8220;vectors,&#8221; were a restricted type of array: they could only be 1-dimensional, and their lower bound was fixed to be zero. This compromise allowed VB to have its arrays, and also allowed the C-derived languages to optimize the most common array case. Everyone was happy, right? &#8230;_

<div class="media">
  [Listening to: Are You Gonna Be My Girl &#8211; <a href="http://www.windowsmedia.com/mg/search.asp?srch=Jet">Jet</a> &#8211; Get Born (03:37)]
</div>