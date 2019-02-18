The auto inclusion of all our CSS files has finally become too annoying. We&#8217;ll still use the app_theme directory, as it is a handy way to store our stuff&#8230; but I&#8217;m really hoping to not set the theme, and to add the appropriate CSS for the situation (mobile vs desktop for example) while also combining our CSS files and <a href="http://csstidy.sourceforge.net/" target="_blank">&#8216;minifying&#8217; them all</a> through a simple &#8216;css.ashx&#8217; style handler. This should make it easier to do that combining at run time, while leaving them nice and separate for debug and development purposes.

&nbsp;

We might still have it set in development mode though, if it is necessary to get some of the editor awareness of our CSS&#8230; but I think we can make it work.

&nbsp;

Death to app_themes!