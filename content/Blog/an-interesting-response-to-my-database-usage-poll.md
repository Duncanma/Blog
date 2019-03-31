---
date: 2004-10-02T03:58:00+00:00
title: An interesting response to my database usage poll...
type: posts
---
[Mike Dimmick comments on SQL Server's licensing policy and compares it to Oracle... ](http://blogs.duncanmackenzie.net/duncanma/archive/2004/09/24/695.aspx#738)which puzzled me. I'm no licensing expert, but from my days in MCS I used to read up on Oracle a bit and it seemed to me that they used a similar model to ours in determining per-user licensing costs. So I looked it up.

Oracle's per-user pricing is defined as per "Named User Plus"... from their own licensing material ( [http://www.oracle.com/corporate/pricing/eplext.pdf](http://www.oracle.com/corporate/pricing/eplext.pdf) );

> _"Named User Plus: is defined as an individual authorized by you to use the programs which are installed on a single server or multiple servers, regardless of whether the individual is actively using the programs at any given time. A non human operated device will be counted as a named user plus in addition to all individuals authorized to use the programs, if such devices can access the programs. If multiplexing hardware or software (e.g., a TP monitor or a web server product) is used, this number must be measured at the multiplexing front end. Automated batching of data from computer to computer is permitted. You are responsible for ensuring that the named user plus per processor minimums are maintained for the programs contained in the user minimum table in the licensing rules section; the minimums table provides for the minimum number of named users plus required and all actual users must be licensed."_

So, Mike may think SQL Server's pricing is 'perverse', but it is the normal method of licensing database servers. Oracle included. The relevant line is here **"If multiplexing hardware or software (e.g., a TP monitor or a web server product) is used, this number must be measured at the multiplexing front end."**. It is my experience that SQL Server or Oracle being used behind a web server should generally follow the per-processor licensing model, not a per-user model.
