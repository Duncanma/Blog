It seems a few people had questions about <a href="http://blogs.duncanmackenzie.net/duncanma/archive/2005/04/14/1306.aspx" target="_blank" class="broken_link">the control I posted previously</a>, so here are answers to two of the questions that people might be running into:

  1. What about word wrapping? Good point, turns out I hadn&#8217;t quite finished my code before I got distracted by food or coffee&#8230; and then I ended up leaving out word wrapping! You just need to modify 1 line to make wrapping work, though: 
  
    Change </p> 
    <pre>g.DrawString(Me.Text, f, b, 0, 0, sf)</pre>
    
    to 
    
    <pre>g.DrawString(Me.Text, f, b, labelBounds, sf)</pre>
    
    and you should be set.</li> 
    
      * I put the control on the form and I get nothing&#8230; no line, just text&#8230; what&#8217;s up? The control draws a line between the end of your text (.Spacing past the end actually) and the right-most edge of the control. So&#8230; to make it work, you need to turn AutoSize off (AutoSize = False) and stretch the right edge of the control out to where you want the line to end. That should do it!</ol> 
    
    Hope these little &#8220;tips&#8221; help anyone who wants to try out this control!