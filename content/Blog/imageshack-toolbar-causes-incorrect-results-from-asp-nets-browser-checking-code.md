---
date: 2008-01-10T12:09:00+00:00
title: ImageShack Toolbar causes incorrect results from ASP.NET's browser checking code
type: posts
---
We recently updated a few of our web sites with code that would provide a 'nicer' experience for browsers that were not compatible with the ASP.NET ATLAS (AJAX) scripts we were using. For some reason though, a few users who were running a fully compatible browser (Firefox 2.0.0.*), were seeing the no-script experience. We were puzzled, but one of the users figured out that their ImageShack toolbar might be causing the problem. Sure enough, after I installed that same toolbar myself I was able to test and confirm that it truly is causing the confusion.

Using a little test page, [http://www.duncanmackenzie.net/services/browserinfo.aspx](http://www.duncanmackenzie.net/services/browserinfo.aspx "http://www.duncanmackenzie.net/services/browserinfo.aspx") (feel free to use it for your own testing), I received the following results for Firefox 2.0.0.11 on Vista **before** installing the ImageShack toolbar.

Request.Browser

  * .Type: Firefox2.0.0.11
  * .Platform: WinNT
  * .Version: 2.0.0.11
  * .Browser: Firefox
  * .Crawler: False
  * .EcmaScriptVersion: 1.4
  * .IsMobileDevice: False
  * .MobileDeviceManufacturer: Unknown
  * .MobileDeviceModel: Unknown
  * .Beta: False



After installing the toolbar, I get this:

Request.Browser

  * .Type: Mozilla1.8.1.11
  * .Platform: WinNT
  * .Version: 1.8.1.11
  * .Browser: Mozilla
  * .Crawler: False
  * .EcmaScriptVersion: 1.4
  * .IsMobileDevice: False
  * .MobileDeviceManufacturer: Unknown
  * .MobileDeviceModel: Unknown
  * .Beta: False



Note the version change and the change in Request.Browser.Browser, certainly enough to throw off our atlas-compatibility check. I haven't figured out the appropriate fix for this yet, but it is nice to at least have one possible explanation as to why valid browsers are sometimes seeing our 'no script' experience.
