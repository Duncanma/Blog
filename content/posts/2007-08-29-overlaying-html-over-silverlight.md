In the new code that we are building for Channel 9, we have a few HTML popups here and there&#8230; floating divs for user info being one example. At the same time as we&#8217;ve been adding that feature, we also moved from using Windows Media Player to using Silverlight as our video player.

We ran into a bit of an issue though, in that our floating HTML was sitting **under** the Silverlight player, no matter what I did with the z-index of the two areas of the page.

<a href="http://www.duncanmackenzie.net/images/d887715a-1bdd-4672-8565-35151429d166.jpg" atomicselection="true" rel="lightbox[522]" title="clip_image002"><img height="111" alt="clip_image002" src="http://www.duncanmackenzie.net/images/c70dba6d-7ee0-4717-82d4-7a4cbaf7b9d7.jpg" width="240" border="0" /></a>

&nbsp;

That just wouldn&#8217;t do, so I asked <a href="www.adamkinney.com" target="_blank" class="broken_link">Adam Kinney</a> (Silverlight Evangelist and former dev on the C9/C10 team) what to do. He pointed me to the &#8216;isWindowless&#8217; property of the Silverlight object and that info, combined with <a href="http://support.microsoft.com/kb/177378" target="_blank">this KB article about Windowless controls</a>, was enough for me to figure out what to do.

&nbsp;

Changing our player creation script to include this property solved the issue:

<pre><p>
  Silverlight.createObjectEx( { source: this.get_playerXaml(), <br />parentElement: this.get_playerHost(),&nbsp;<br />id:this._hostname,&nbsp;<br />properties:{ width:'322', height:'296', <br />version:'1.0', <font color="#ff0000">isWindowless:'true'</font>, <br />inplaceInstallPrompt:'true'&nbsp; }, <br />events:{
</p>

<p>
  onLoad:Function.createDelegate(
</p>

<p>
  this, this._handleSilverlightPlayerLoad) }} );
</p>
</pre>

&nbsp;

producing a much nicer result&#8230; 

<a href="http://www.duncanmackenzie.net/images/a76e38c0-0644-419d-b9fb-8e9a86d86872.png" atomicselection="true" rel="lightbox[522]" title="SilverlightAndHTML"><img style="border-right: 0px; border-top: 0px; border-left: 0px; border-bottom: 0px" height="160" alt="SilverlightAndHTML" src="http://www.duncanmackenzie.net/images/f1172023-0aee-4a29-8c1f-10759e33a16f.png" width="240" border="0" /></a>