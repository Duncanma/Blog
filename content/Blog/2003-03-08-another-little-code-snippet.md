<font face="Trebuchet MS" color="teal">Whenever I have to<br /> code a &#8220;real&#8221; project, I end up building a bunch of components to deal with <a href="http://dotnetweblogs.com/duncanma/posts/3242.aspx" class="broken_link">anything that seems<br /> likely to reoccur</a>. Sometimes the class or Windows Forms control I&#8217;ve created<br /> never gets used again, but often I end up using them in a whole bunch of<br /> additional apps. Anyway, I think I&#8217;ll post some of these little bits of<br /> development work to my blog when it seems useful enough, and perhaps other<br /> developers will be able to find this code when they are looking for some help.<br /> </font> 

<font face="Trebuchet MS" color="#008080">This particular piece of code is<br /> pretty simple; it is just a small extension to the LinkLabel class to allow it<br /> to handle launching the appropriate link when clicked.</font>

<font face="Trebuchet MS" color="#008080"></p> 

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><?xml:namespace prefix = o 
ns = "urn:schemas-microsoft-com:office:office" /?><o:p>
  
  <font color="#000000">&nbsp;</font></o:p></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 1"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">public</span><font color="#000000"><br /> </font><span style="COLOR: blue">class</span><font color="#000000"><br /> ClickableLinkLabel : LinkLabel<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000">&nbsp;</font></o:p></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: blue">private</span><font color="#000000"> </font><span style="COLOR: blue">string</span><font color="#000000"> m_URL =<br /> &#8220;about:blank&#8221;;<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000">&nbsp;</font></o:p></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 2"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">public</span><font color="#000000"><br /> ClickableLinkLabel()<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000">&nbsp;</font></o:p></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: blue">protected</span><font color="#000000"> </font><span style="COLOR: blue">override</span><font color="#000000"> </font><span style="COLOR: blue">void</span><font color="#000000"> OnLinkClicked<br /> <o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>(LinkLabelLinkClickedEventArgs e)<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>ProcessStartInfo psi <o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>= </font><span style="COLOR: blue">new</span><font color="#000000"><br /> System.Diagnostics.ProcessStartInfo(m_URL);<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>psi.UseShellExecute = </font><span style="COLOR: blue">true</span><font color="#000000">;<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>System.Diagnostics.Process.Start(psi);<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">base</span><font color="#000000">.OnLinkClicked(e);<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000">&nbsp;</font></o:p></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: gray">///</span><span style="COLOR: green"> </span><span style="COLOR: gray"><summary><o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: gray">///</span><span style="COLOR: green"> Represents the link to<br /> be navigated<o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: gray">///</span><span style="COLOR: green"> to when the label is<br /> clicked<o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: gray">///</span><span style="COLOR: green"> </span><span style="COLOR: gray"></summary><o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></span><span style="COLOR: blue">public</span><font color="#000000"> </font><span style="COLOR: blue">string</span><font color="#000000"><br /> URL<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">get<o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">return</span><font color="#000000"><br /> m_URL;<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </font></span><span style="COLOR: blue">set<o:p></o:p></span></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp; </span><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>m_URL = </font><span style="COLOR: blue">value</span><font color="#000000">;<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> </span>}<o:p></o:p></font></span>
</p>

<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <o:p><font face="Times New Roman" color="#000000">&nbsp;</font></o:p>
</p></p> 

<p>
  </font>&nbsp;
</p>

<p>
  &nbsp;
</p>