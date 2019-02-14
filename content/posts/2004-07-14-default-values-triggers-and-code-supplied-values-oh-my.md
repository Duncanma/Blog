In [an earlier post](http://weblogs.asp.net/duncanma/archive/2004/07/10/179605.aspx){.broken_link}, I mentioned that I use a trigger to update a &#8220;DateCreated&#8221; field in one of my tables&#8230; and various people commented on this&#8230; asking &#8220;why not pass in a value in your Insert?&#8221; or &#8220;why not use a default value?&#8221;

Since I feel that replying to comments in the comments section is generally just a black hole, I thought I&#8217;d raise this discussion up to a proper blog entry of its own 🙂

I tend to have audit information on my tables, and that often includes 4 columns; DateCreated, CreatedBy and DateModified, LastModifiedBy

I use two triggers, an INSERT trigger that sets all of these fields to the current date and current user (as appropriate, and using Windows Authentication), and an UPDATE trigger that sets only the two modified columns.

Why not just pass the value? Well, two reasons&#8230; 

sometimes data gets entered in through a different code path than mine&#8230; or through something like SQL Enterprise Manager (for lookup tables especially)&#8230; 

  1. I just don&#8217;t like relying on&nbsp;code external to the database to put the right value in for audit information. This is true for both the modified and the created situations&#8230;
  2. Why not just use a default? Well, that is a better solution than passing the value in, except it doesn&#8217;t prevent the user from passing in (or setting) whatever value they want. If they pass in a value for DateCreated in their INSERT now, it will get overwritten with the &#8216;real value&#8217;. And, even if they do an UPDATE later to change the DateCreated (which **is** a real flaw&nbsp;in this method), at least the &#8216;last modified by&#8217; will be accurate.

Of course, this is just my &#8216;simple&#8217; auditing method&#8230; for any situation where I really care about the audit information (this example was from [my little polling system](http://weblogs.asp.net/duncanma/archive/2004/06/15/156543.aspx){.broken_link}&#8230; auditing info is just a &#8216;nice to have&#8217;) then I would need to actually restrict access to those fields completely so that they can only be set through my triggers or stored procs. There are well documented ways to do this, so I won&#8217;t go into them here&#8230; (restrict all access to the table, only allow INSERTs and UPDATEs through your chosen Stored Procs&#8230; Stored Procs set those audit fields exactly as you specify, etc&#8230;). 

It is worth noting that in a more complex auditing solution tracking only the **last** modification probably wouldn&#8217;t be sufficient anyway.

I&#8217;m sure there will be people, many of which know more about this problem space than me, that can chime in with dissenting or agreeing opinions&#8230; I&#8217;m looking forward to the discussion 🙂

&nbsp;