---
date: 2003-03-08T11:33:00+00:00
title: Another little code snippet
type: posts
---
Whenever I have to code a "real" project, I end up building a bunch of components to deal with [anything that seems likely to reoccur](http://dotnetweblogs.com/duncanma/posts/3242.aspx). Sometimes the class or Windows Forms control I've created never gets used again, but often I end up using them in a whole bunch of additional apps. Anyway, I think I'll post some of these little bits of development work to my blog when it seems useful enough, and perhaps other developers will be able to find this code when they are looking for some help.

This particular piece of code is pretty simple; it is just a small extension to the LinkLabel class to allow it to handle launching the appropriate link when clicked.



<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><?xml:namespace prefix = o
ns = "urn:schemas-microsoft-com:office:office" /?><o:p>

  <font color="#000000"> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 1"><font color="#000000">      </span><span style="COLOR: blue">public</span><font color="#000000"> <span style="COLOR: blue">class</span><font color="#000000"> ClickableLinkLabel : LinkLabel<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 1">      </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000"> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: blue">private</span><font color="#000000"> <span style="COLOR: blue">string</span><font color="#000000"> m_URL = "about:blank";<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000"> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 2"><font color="#000000">            </span><span style="COLOR: blue">public</span><font color="#000000"> ClickableLinkLabel()<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 2">            </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 2">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000"> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: blue">protected</span><font color="#000000"> <span style="COLOR: blue">override</span><font color="#000000"> <span style="COLOR: blue">void</span><font color="#000000"> OnLinkClicked <o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>(LinkLabelLinkClickedEventArgs e)<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">        </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>ProcessStartInfo psi <o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">                </span>= <span style="COLOR: blue">new</span><font color="#000000"> System.Diagnostics.ProcessStartInfo(m_URL);<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>psi.UseShellExecute = <span style="COLOR: blue">true</span><font color="#000000">;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>System.Diagnostics.Process.Start(psi);<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">            </span><span style="COLOR: blue">base</span><font color="#000000">.OnLinkClicked(e);<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">        </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p><font color="#000000"> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: gray">///</span><span style="COLOR: green"> </span><span style="COLOR: gray"><summary><o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: gray">///</span><span style="COLOR: green"> Represents the link to be navigated<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: gray">///</span><span style="COLOR: green"> to when the label is clicked<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: gray">///</span><span style="COLOR: green"> </span><span style="COLOR: gray"></summary><o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">        </span><span style="COLOR: blue">public</span><font color="#000000"> <span style="COLOR: blue">string</span><font color="#000000"> URL<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">        </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">            </span><span style="COLOR: blue">get<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">                </span><span style="COLOR: blue">return</span><font color="#000000"> m_URL;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes"><font color="#000000">            </span><span style="COLOR: blue">set<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">    </span><span style="mso-spacerun: yes">        </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">                </span>m_URL = <span style="COLOR: blue">value</span><font color="#000000">;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-spacerun: yes">        </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><font color="#000000"><span style="mso-tab-count: 1">      </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <o:p><font face="Times New Roman" color="#000000"> </o:p>








