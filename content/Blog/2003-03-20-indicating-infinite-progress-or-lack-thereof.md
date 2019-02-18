<font face="Trebuchet MS" color="teal">clovett </font>
				  
[
						  
<font face="Trebuchet MS" color="teal">posted this sample </font>
				  
](http://www.gotdotnet.com/Community/UserSamples/Details.aspx?SampleGuid=d2bd8858-97c7-4a77-96eb-5d86d3b022d4){.broken_link} 
				  
<font face="Trebuchet MS" color="teal">&nbsp;of a progress bar <strong>that does not<br /> progress</strong> to GDN at some point in the past and I had occasion to use it<br /> today. Using irrational coder logic, I decided that converting it to VB, so I<br /> could place it directly in my application, was faster than modifying his sample<br /> into a component&#8230;</font> 

<font face="Trebuchet MS" color="#008080"></font>

<font face="Trebuchet MS" color="teal"><img alt="" hspace="0" src="http://www.duncanmackenzie.net/splash.jpg" align="baseline" border="0" /><br /> </font>

<font face="Trebuchet MS" color="teal">Anyway, explanations aside; here is the<br /> code in VB</font>

<pre class="code"><font color="#000000"></font><font color="#0000ff">Imports </font><font color="#000000">System
</font><font color="#0000ff">Imports </font><font color="#000000">System.Drawing
</font><font color="#0000ff">Imports </font><font color="#000000">System.Drawing.Drawing2D

</font><font color="#0000ff">Public Class </font><font color="#000000">InfiniteProgress
    </font><font color="#0000ff">Inherits </font><font color="#000000">System.Windows.Forms.Control
    </font><font color="#0000ff">Dim WithEvents </font><font color="#000000">tmr </font><font color="#0000ff">As </font><font color="#000000">Timer
    </font><font color="#0000ff">Dim </font><font color="#000000">m_Color1 </font><font color="#0000ff">As </font><font color="#000000">Color = Color.White
    </font><font color="#0000ff">Dim </font><font color="#000000">m_Color2 </font><font color="#0000ff">As </font><font color="#000000">Color = Color.Blue
    </font><font color="#0000ff">Dim </font><font color="#000000">m_Increment </font><font color="#0000ff">As Integer </font><font color="#000000">= 5

    &lt;ComponentModel.Category("Appearance")&gt; _
    </font><font color="#0000ff">Public Property </font><font color="#000000">Color1() </font><font color="#0000ff">As </font><font color="#000000">Color
        </font><font color="#0000ff">Get
            Return </font><font color="#000000">m_Color1
        </font><font color="#0000ff">End Get
        Set</font><font color="#000000">(</font><font color="#0000ff">ByVal </font><font color="#000000">Value </font><font color="#0000ff">As </font><font color="#000000">Color)
            m_Color1 = Value
        </font><font color="#0000ff">End Set
    End Property

    </font><font color="#000000">&lt;ComponentModel.Category("Appearance")&gt; _
    </font><font color="#0000ff">Public Property </font><font color="#000000">Color2() </font><font color="#0000ff">As </font><font color="#000000">Color
        </font><font color="#0000ff">Get
            Return </font><font color="#000000">m_Color2
        </font><font color="#0000ff">End Get
        Set</font><font color="#000000">(</font><font color="#0000ff">ByVal </font><font color="#000000">Value </font><font color="#0000ff">As </font><font color="#000000">Color)
            m_Color2 = Value
        </font><font color="#0000ff">End Set
    End Property

    </font><font color="#000000">&lt;ComponentModel.Category("Appearance")&gt; _
    </font><font color="#0000ff">Public Property </font><font color="#000000">Increment() </font><font color="#0000ff">As Integer
        Get
            Return </font><font color="#000000">m_Increment
        </font><font color="#0000ff">End Get
        Set</font><font color="#000000">(</font><font color="#0000ff">ByVal </font><font color="#000000">Value </font><font color="#0000ff">As Integer</font><font color="#000000">)
            m_Increment = Value
        </font><font color="#0000ff">End Set
    End Property

    Dim </font><font color="#000000">Position </font><font color="#0000ff">As Single </font><font color="#000000">= 0


    </font><font color="#0000ff">Public Sub New</font><font color="#000000">()
        </font><font color="#0000ff">Me</font><font color="#000000">.SetStyle(ControlStyles.DoubleBuffer, </font><font color="#0000ff">True</font><font color="#000000">)

    </font><font color="#0000ff">End Sub


    Protected Overrides Sub </font><font color="#000000">OnPaint( _
            </font><font color="#0000ff">ByVal </font><font color="#000000">e </font><font color="#0000ff">As </font><font color="#000000">System.Windows.Forms.PaintEventArgs)
        </font><font color="#0000ff">Dim </font><font color="#000000">b </font><font color="#0000ff">As New </font><font color="#000000">LinearGradientBrush( _
            </font><font color="#0000ff">Me</font><font color="#000000">.Bounds, </font><font color="#0000ff">Me</font><font color="#000000">.Color1, </font><font color="#0000ff">Me</font><font color="#000000">.Color2, _
            LinearGradientMode.Horizontal)
        b.WrapMode = Drawing.Drawing2D.WrapMode.TileFlipX
        b.TranslateTransform(Position, 0, MatrixOrder.Append)
        e.Graphics.FillRectangle(b, 0, 0, </font><font color="#0000ff">Me</font><font color="#000000">.Width, </font><font color="#0000ff">Me</font><font color="#000000">.Height)
        b.Dispose()
        </font><font color="#0000ff">MyBase</font><font color="#000000">.OnPaint(e)
    </font><font color="#0000ff">End Sub

    Private Sub </font><font color="#000000">tmr_Tick(</font><font color="#0000ff">ByVal </font><font color="#000000">sender </font><font color="#0000ff">As Object</font><font color="#000000">, _
            </font><font color="#0000ff">ByVal </font><font color="#000000">e </font><font color="#0000ff">As </font><font color="#000000">System.EventArgs) </font><font color="#0000ff">Handles </font><font color="#000000">tmr.Tick
        Position += m_Increment
        </font><font color="#0000ff">If </font><font color="#000000">Position &gt; </font><font color="#0000ff">Me</font><font color="#000000">.Width </font><font color="#0000ff">Then
            </font><font color="#000000">Position = -</font><font color="#0000ff">Me</font><font color="#000000">.Width
        </font><font color="#0000ff">End If
        Me</font><font color="#000000">.Invalidate()
    </font><font color="#0000ff">End Sub

    Protected Overrides Sub </font><font color="#000000">_
            OnVisibleChanged(</font><font color="#0000ff">ByVal </font><font color="#000000">e </font><font color="#0000ff">As </font><font color="#000000">System.EventArgs)
        </font><font color="#0000ff">If Me</font><font color="#000000">.Visible </font><font color="#0000ff">Then
            If </font><font color="#000000">tmr </font><font color="#0000ff">Is Nothing Then
                </font><font color="#000000">tmr = </font><font color="#0000ff">New </font><font color="#000000">Timer()
                tmr.Interval = 20
            </font><font color="#0000ff">End If
            </font><font color="#000000">tmr.Start()
        </font><font color="#0000ff">Else
            If Not </font><font color="#000000">tmr </font><font color="#0000ff">Is Nothing Then
                </font><font color="#000000">tmr.Stop()
            </font><font color="#0000ff">End If
        End If
        MyBase</font><font color="#000000">.OnVisibleChanged(e)
    </font><font color="#0000ff">End Sub
End Class</font>
</pre>