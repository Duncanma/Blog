<font face="Trebuchet MS" color="teal">I have to admit I<br /> haven&#8217;t taken advantage of enough of VS.NET&#8217;s capabilities&#8230; the ability to<br /> write macros alone should have resulted in a ton of useful little routines, but<br /> I have only written a few. One of the ones I use most often converts between a<br /> list of my internal member variables in a class&#8230;</font> 

<pre class="code"><font color="#000000">    </font><font color="#0000ff">Dim </font><font color="#000000">m_fred </font><font color="#0000ff">As String
    Dim </font><font color="#000000">m_counter </font><font color="#0000ff">As Integer
</font><br />
</pre>

<font face="Trebuchet MS" color="teal">to the bare-bones properties</font>

<pre class="code"><font color="#000000">    </font><font color="#0000ff">Public Property </font><font color="#000000">fred() </font><font color="#0000ff">As String
        Get
            Return </font><font color="#000000">m_fred
        </font><font color="#0000ff">End Get
        Set</font><font color="#000000">(</font><font color="#0000ff">ByVal </font><font color="#000000">Value </font><font color="#0000ff">As String</font><font color="#000000">)
            m_fred = Value
        </font><font color="#0000ff">End Set
    End Property

    Public Property </font><font color="#000000">counter() </font><font color="#0000ff">As Integer
        Get
            Return </font><font color="#000000">m_counter
        </font><font color="#0000ff">End Get
        Set</font><font color="#000000">(</font><font color="#0000ff">ByVal </font><font color="#000000">Value </font><font color="#0000ff">As Integer</font><font color="#000000">)
            m_counter = Value
        </font><font color="#0000ff">End Set
    End Property
</font>
</pre>

<font face="Trebuchet MS" color="teal">It is dependent on my particular hungarian-ish (m_) naming<br /> style for internal variables and it doesn&#8217;t deal well with arrays or<br /> variables that get instantiated in their declarations&#8230; but I find<br /> it a real timesaver to spit out that initial pass at the<br /> properties before I go in and add any validation or whatever else<br /> I was going to do&#8230; On the off chance that you might find it useful as<br /> well, or that you want to &#8220;finish it up&#8221;, here is the source of the<br /> macro:</font> 

<pre class="code"><font color="#000000">
</font><font color="#0000ff">Sub </font><font color="#000000">ConvertProperties()
    DTE.UndoContext.Open("ConvertProperties")
    </font><font color="#0000ff">Try
        Dim </font><font color="#000000">txt </font><font color="#0000ff">As </font><font color="#000000">TextSelection
        txt = DTE.ActiveDocument.Selection

        </font><font color="#0000ff">Dim </font><font color="#000000">line, originalCode </font><font color="#0000ff">As String
        </font><font color="#000000">originalCode = txt.Text

        </font><font color="#0000ff">Dim </font><font color="#000000">lines() </font><font color="#0000ff">As String
        </font><font color="#000000">lines = Split(originalCode, vbLf)
        </font><font color="#0000ff">Dim </font><font color="#000000">variableName </font><font color="#0000ff">As String
        Dim </font><font color="#000000">publicName </font><font color="#0000ff">As String
        Dim </font><font color="#000000">dataType </font><font color="#0000ff">As String
        Dim </font><font color="#000000">propertyProcedure </font><font color="#0000ff">As String

        Dim </font><font color="#000000">r </font><font color="#0000ff">As </font><font color="#000000">Regex
        r = </font><font color="#0000ff">New </font><font color="#000000">Regex( _
        "(Dim|Private)\s*(?&lt;varname&gt;\S*)\s*As\s*(?&lt;typename&gt;\S*)", _
        RegexOptions.IgnoreCase </font><font color="#0000ff">Or </font><font color="#000000">RegexOptions.ExplicitCapture)

        </font><font color="#0000ff">For Each </font><font color="#000000">line </font><font color="#0000ff">In </font><font color="#000000">lines
            line = line.Trim
            </font><font color="#0000ff">If Not </font><font color="#000000">line = "" </font><font color="#0000ff">Then
                Dim </font><font color="#000000">mtch </font><font color="#0000ff">As </font><font color="#000000">Match
                mtch = r.Match(line)
                </font><font color="#0000ff">If </font><font color="#000000">mtch.Success </font><font color="#0000ff">Then
                    </font><font color="#000000">variableName = mtch.Groups("varname").Value.Trim
                    dataType = mtch.Groups("typename").Value.Trim
                    publicName = variableName.Substring(2)

                    propertyProcedure = _
                        </font><font color="#0000ff">String</font><font color="#000000">.Format("{0}Public Property {1} As {2}{0}" _
                            & "    Get{0}" _
                            & "        Return {3}{0}" _
                            & "    End Get{0}" _
                            & "    Set(ByVal Value As {2}){0}" _
                            & "        {3} = Value{0}" _
                            & "    End Set{0}" _
                            & "End Property", vbCrLf, publicName, _
                            dataType, variableName)

                    txt.Insert(vbCrLf & propertyProcedure, _
                        vsInsertFlags.vsInsertFlagsInsertAtEnd)
                </font><font color="#0000ff">End If

            End If
        Next
        </font><font color="#000000">txt.SmartFormat()
    </font><font color="#0000ff">Catch
        </font><font color="#008000">'don't do anything
        'but I don't want to see an error!
    </font><font color="#0000ff">End Try
    </font><font color="#000000">DTE.UndoContext.Close()
</font><font color="#0000ff">End Sub
</font>
</pre>

<font face="Trebuchet MS" color="#008080">Anyone have some real cool/useful VS.NET macros?</font>&nbsp;