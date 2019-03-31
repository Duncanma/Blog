---
date: 2004-07-14T21:20:00+00:00
title: Default Values, Triggers, and Code supplied values ... oh my!
type: posts
---
In [an earlier post](http://weblogs.asp.net/duncanma/archive/2004/07/10/179605.aspx), I mentioned that I use a trigger to update a "DateCreated" field in one of my tables... and various people commented on this... asking "why not pass in a value in your Insert?" or "why not use a default value?"

Since I feel that replying to comments in the comments section is generally just a black hole, I thought I'd raise this discussion up to a proper blog entry of its own 🙂

I tend to have audit information on my tables, and that often includes 4 columns; DateCreated, CreatedBy and DateModified, LastModifiedBy

I use two triggers, an INSERT trigger that sets all of these fields to the current date and current user (as appropriate, and using Windows Authentication), and an UPDATE trigger that sets only the two modified columns.

Why not just pass the value? Well, two reasons...

sometimes data gets entered in through a different code path than mine... or through something like SQL Enterprise Manager (for lookup tables especially)...

  1. I just don't like relying on code external to the database to put the right value in for audit information. This is true for both the modified and the created situations...
  2. Why not just use a default? Well, that is a better solution than passing the value in, except it doesn't prevent the user from passing in (or setting) whatever value they want. If they pass in a value for DateCreated in their INSERT now, it will get overwritten with the 'real value'. And, even if they do an UPDATE later to change the DateCreated (which **is** a real flaw in this method), at least the 'last modified by' will be accurate.

Of course, this is just my 'simple' auditing method... for any situation where I really care about the audit information (this example was from [my little polling system](http://weblogs.asp.net/duncanma/archive/2004/06/15/156543.aspx)... auditing info is just a 'nice to have') then I would need to actually restrict access to those fields completely so that they can only be set through my triggers or stored procs. There are well documented ways to do this, so I won't go into them here... (restrict all access to the table, only allow INSERTs and UPDATEs through your chosen Stored Procs... Stored Procs set those audit fields exactly as you specify, etc...).

It is worth noting that in a more complex auditing solution tracking only the **last** modification probably wouldn't be sufficient anyway.

I'm sure there will be people, many of which know more about this problem space than me, that can chime in with dissenting or agreeing opinions... I'm looking forward to the discussion 🙂

