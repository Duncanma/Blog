---
date: 2023-05-14T14:34:56-07:00
title: The evolution of Microsoft documentation sites
type: posts
tags:
 - Microsoft
 - Information Architecture
 - Web Development
techfeatured: true
---

I ran through this history recently with someone at work and thought
maybe I should post it up online for posterity's sake.

> This is all in the past, so why is it interesting now? Well, domain
> names and site branding is part of your 'information architecture' and
> it is almost always a bit of a compromise. At the highest level, you
> have your domain that is equal to your brand (Microsoft.com,
> Stripe.com, Toyota.com, etc.) so that's easy to create and to
> understand what should live at that address. For anything else though,
> paths below that root, or subdomains, you are essentially creating a
> categorization of content, and that will evolve over time.
> Also, [a related discussion of domain names and why you should always **use your domain** instead of making random new ones](/blog/domain-names).

## The MSDN and TechNet days

Back in the 90's Microsoft's developer documentation lived under the
brand "MSDN" (Microsoft Developer Network) and content aimed at 'IT
Professionals' (folks who deployed software, administered servers, wrote
more scripts than application code) lived on another site "TechNet"
(Technical Network I guess?). As someone who worked as a writer and
developer on the team behind these sites, I can tell you that this
division was always a little fuzzy. Developers often need to install and
administer servers (SQL Server for example), and many 'IT Pros' wrote
code. The dual sites often led to a confusing experience for users, the
documentation to install Exchange Server was on one site, while the
documentation on it's APIs lived somewhere else. Real old-timers, like
myself, will remember that these sites were originally just the web
presence for a pair of "content on CD" subscription systems, similar to
how Netflix used to be a way to sign up to get DVDs delivered in the
mail.

## Oops, we ignored our sites, and they got old and stale

Eventually, both sites (which ran on essentially the same code, at least
when I worked on them, with customizations) were understaffed and
ignored for many years. It was decided that they should be replaced,
that their brand names were associated with the old Microsoft, and that
there was little value in trying to update the code base.

A new site would be created, and it would be the home of all types of
technical documentation, regardless of the audience. For a time, the
domain '[developer.microsoft.com](https://developer.microsoft.com)' was considered (yes, it does exist as
essentially a routing page), because that was a common pattern for
companies posting their technical docs (see
[developers.google.com](https://developers.google.com), [developer.twitter.com](https://developer.twitter.com),
[developer.amazon.com](https://developer.amazon.com/), and others). This hits on our
'information architecture' problem though... not all content that would
live on this site is for developers, some of it is for the database
administrator, the data scientist who uses Power BI, the no-code user
that is going to use Power Apps, the network administrator who needs to
configure Windows group policy, etc. Developer as the top-level brand
would be excluding all those people.

> Small note here, as someone who was present for these discussions, I
> don't believe there was real data confirming this would exclude anyone, or
> that it would be a problem. There was fear it would be though, and
> that is often enough when a large group of people at a company need to
> agree on a decision.

## Docs arrives as the new unified home of documentation

The very safe, and hard to argue with, domain of "docs.microsoft.com"
was eventually chosen, along with the brand of "Microsoft Docs".
Everything on this site would be documentation, so it was perfect. It
was only 'technical' documentation, docs for users of Microsoft Office,
or Windows, were not included, and that did cause some discussions back
and forth over the next few years. It was often suggested that maybe all
documentation should live under docs.microsoft.com, but other than a few
random bits of non-technical content, it never happened.

This brand and domain launched in 2016 and worked well with no issues for
a few years, while developer.microsoft.com was kept around as a general
landing page for developer topics, routing to a bunch of different sites
including docs.microsoft.com.

## Learn is here (to stay?)

In 2018 though, it was decided that we needed a large amount of
interactive, guided learning material. Courses, modules, knowledge
tests, etc. All of which would live on the docs site, under the /learn
path. It was branded "Microsoft Learn" and was very popular. To a lot of
people, especially those that worked on this new learning content, this
was **not** documentation though, and it felt odd to them that it was
under docs.microsoft.com. This concern was voiced often and loudly for a
few years, until finally in September of 2022, docs.microsoft.com was
redirected to learn.microsoft.com and the entire site was rebranded
"Microsoft Learn". Documentation was moved to /docs as part of this
change. Learn is a very broad (or vague, depending on your mood) term,
so hopefully it will be able to stay as the brand through many future
evolutions of the content.

> FYI, the above *history* is based on my own recollection of events.
> I was a user of MSDN/TechNet back in the 90s, joined Microsoft in
> 1999, worked on MSDN from 2001 to 2005, then joined Microsoft Docs as
> an engineering manager right before it was ready to launch.
