The auto inclusion of all our CSS files has finally become too annoying. We'll still use the app_theme directory, as it is a handy way to store our stuff... but I'm really hoping to not set the theme, and to add the appropriate CSS for the situation (mobile vs desktop for example) while also combining our CSS files and [&#8216;minifying' them all](http://csstidy.sourceforge.net/" target="_blank) through a simple &#8216;css.ashx' style handler. This should make it easier to do that combining at run time, while leaving them nice and separate for debug and development purposes.



We might still have it set in development mode though, if it is necessary to get some of the editor awareness of our CSS... but I think we can make it work.



Death to app_themes!