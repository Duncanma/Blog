When you are creating a SQL script to deploy your system, Enterprise Manager does a good job with all of the schema (creating the tables, views, etc...) but doesn't handle creating INSERTS for any of your lookup tables. I used to generate SQL INSERT statements for my data using a SELECT (SELECT &#8216;INSERT ..."&#8216; + [Col1] +'"...), but looking around on the web tonight, I found a cool stored proc that does all the work for you.

<http://vyaskn.tripod.com/code.htm#inserts>

I actually found quite a few utilities to accomplish this same result, but this was the first one I tried and it worked great!