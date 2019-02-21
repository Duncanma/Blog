---
date: 2003-03-01T01:03:00+00:00
title: DateTimePicker and DBNull
type: posts
---
<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial"> <font face="Trebuchet MS"> <font color="teal">You can’t bind a Windows Forms DateTimePicker to a field that might contain DBNull… so I did this;<o:p></o:p>  </span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial"><o:p> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 1">      </span><span style="COLOR: blue">public</span> <span style="COLOR: blue">class</span> DBDateTimePicker:DateTimePicker<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 1">      </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 2">            </span><span style="COLOR: blue">public</span> DBDateTimePicker()<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 2">            </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 3">                  </span><span style="COLOR: green">//<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 3">                  </span><span style="COLOR: green">// TODO: Add constructor logic here<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 3">                  </span><span style="COLOR: green">//<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 2">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><o:p> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">        </span><span style="COLOR: blue">public</span> <span style="COLOR: blue">object</span> DBValue<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">        </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span><span style="COLOR: blue">get<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                </span><span style="COLOR: blue">if</span> (<span style="COLOR: blue">this</span>.Checked)<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                    </span><span style="COLOR: blue">return</span> <span style="COLOR: blue">base</span>.Value;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                </span><span style="COLOR: blue">else<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                    </span><span style="COLOR: blue">return</span> System.DBNull.Value;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span><span style="COLOR: blue">set<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span>{<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                </span><span style="COLOR: blue">if</span> (System.Convert.IsDBNull(<span style="COLOR: blue">value</span>))<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">    </span><span style="mso-spacerun: yes">                </span><span style="COLOR: blue">this</span>.Checked=<span style="COLOR: blue">false</span>;<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                </span><span style="COLOR: blue">else<o:p></o:p></span></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">                    </span><span style="COLOR: blue">this</span>.Value = Convert.ToDateTime(<span style="COLOR: blue">value</span>);<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">            </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-spacerun: yes">        </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt; mso-layout-grid-align: none">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: 'Courier New'"><span style="mso-tab-count: 1">      </span>}<o:p></o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial"><o:p> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial">Then I bind to “DBValue”  (instead of Value) and it appears to work fine… if it is null, it is unchecked and disabled, otherwise it is enabled and can be set to any normal date value... if you uncheck the box yourself, then the data field is set to DBNull...</span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial"><o:p> </o:p></span>


<p class="MsoNormal" style="MARGIN: 0in 0in 0pt">
  <span style="FONT-SIZE: 10pt; FONT-FAMILY: Arial">Not sure if it the best idea, but I can’t override Value so this seems like a reasonable alternative… of course, I never looked around for the "official" solution or any other possible answers, so let me know if you have a better idea!</span>
