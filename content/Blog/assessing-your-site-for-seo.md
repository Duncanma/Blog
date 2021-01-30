---
date: 2021-01-29T14:30:13-08:00
title: Assessing your own site for Search Engine Optimization (SEO)
type: posts
tags:
 - Web Development
 - Coding
 - Self-Assessment
 - SEO
techfeatured: true
draft: true
description: One of the most important ways I can contribute to the quality of our sites is by saying no.
---
As an engineering manager, I have a certain amount of control over what
ends up on our sites and in our systems. Not complete control, my voice
is only one in the room, as it should be. One of the most important ways
I can contribute to the quality of our sites is by saying no. Blocking
or pushing back on requests that are contrary to our goals can be as
important as what we decide **to** do.

The goal is not to prevent change. Change is great, but randomness ruins
plans. If you build a hundred features and ten of them don't fit into
the product vision or the technical architecture, those ten will have a
disproportionate impact on the team over the life of the product.

The pressure to do one-off features or changes is continual, but it is
also quite normal. The stakeholder asking for this change isn't a bad
person, they just have a different perspective. While they may be able
to understand how much effort is involved in their request, they are
unlikely to understand the long-term costs in terms of maintainability.
Often it is difficult for the engineering team to articulate this cost.
For a single change it isn\'t significant, but all these changes add up
over time.

## Death by a thousand cuts

One concrete example that has been a constant in my projects, is teams
asking for us to add third party scripts. There are a few reasons why
this happens, but in my experience, the most common is a request to add
a set of tracking code to a \# of pages. Someone in the company is
running an advertising campaign, and your site is the destination.
Everything is nearly done and its days away from going live on Facebook
and Twitter. No one looped engineering in before now, of course. An
email comes in, often having bounced around, in search of the person who
runs the site:

> Hey Duncan, I hear you are the guy to ask about getting something onto
> the site. We are about to kick off a huge ad campaign across fifteen
> countries to drive folks to the new Azure solutions content. It's
> using ads on Facebook and Twitter, so we need to add tracking pixels
> for both of those to the attached list of ten pages. I have included
> the zip files of javascript for both sites, if you could get it up on
> the site by tomorrow that would be great!
>
> Thanks, Sam

Couple of things to unpack here. Sam hasn\'t done anything wrong,
there\'s no evil intent. They didn\'t know to loop engineering in, and
they don\'t know if adding two scripts to a set of pages is hard or at
all controversial. They have a job to do and this is just one step.

## The simple solution

Why not just do it? the business wants it, and our site exists to serve
the business, so shouldn\'t we just make a ticket and get it done?

Let's follow that path for a bit to see where it gets us (hint, simple
changes generally aren\'t that simple).

To close the work item and hit Sam\'s deadline, we open the page, follow
the instructions from each third-party and put all the script references
in. Test it, seems to work, no errors, we see network calls to a bunch
of places, done. Ship it, close the ticket.

Hard to push back against what is probably an hour\'s work, right?

Most big sites aren\'t a bunch of individual pages though, so you\'d
probably be editing a common template. To add these scripts **only** to
the requested pages, you\'ll need a little IF statement (`if url =-\_\_
or url =\_\_ ... `). Now we are running a bit of logic on **all** our
pages. It\'s tiny though, still hard to really raise a red flag. Your
developer "Spidey-sense" is starting to tingle, but the work is done,
Sam is happy.

A few weeks later, another email comes in:

> Hey Duncan, thanks so much for helping out with that last request, the
> campaign is going great. We are trying out something new now, we've
> picked a mix of pages (some from the last campaign and some new ones)
> and we are adding LinkedIn to the mix. Super excited to see how that
> compares to the other campaign that is running. Anyway, the new ads
> start tomorrow and there is a lot of \$\$ being spent here, so if you
> could get these new scripts up that would be great. Scripts and a list
> of pages attached like last time. Thanks so much! Owe you a coffee :)
>
> Sam

A new work item is created, maybe ends up with a new developer. If they
saw the code from the last request, they might just extend it with some
more if statements, to be consistent. Or maybe they'll go a different
way, it's hard to predict, especially with a busy team.

One possible path is that these requests keep trickling in over the
years, various bits of code are added, and we end up with a block of
terrible code running on all our pages. Regardless of how many times
this happens though, even doing it once can have unintended
consequences.

Months after we add some third-party scripts, we end up looking at this
page and we see an issue.

Choose your adventure time, the page is\...

1. Performing poorly, the third-party script must work in any
   situation, so it loads its own version copy of jQuery and two other
   scripts you already have on the page.

2. Failing. Turns out the third-party script was updated and now has a
   conflict with something else on the page.

3. Dropping cookies. Most ad tracking scripts are going to drop cookies
   and the exact behavior could change over time. You carefully thought
   through privacy and GDPR for **your** scripts. Did you re-evaluate
   for every update to some 'random ad platform' script?

Every case described above gets worse over time. Two years from now, you
do an audit of all the cookies you drop. Will you catch every one-off
page that does its own special thing? If the Ad campaign ends after two
months, do you remember to remove this code, or does it live on forever?

## A better way to handle these requests

Third party script requests are just one example and I am sure you have
your own set of examples. I\'ve seen similar requests for one-off
redirects, custom variations on styles or headers, etc. The common
element is that it is a special-case request, seemingly one-off, and
disconnected from any larger vision or roadmap. We know it's a bad idea
to hack this in, despite pressure or temptation to just do it. It is
hard to quantify the negatives though, which puts the developer in a
difficult spot.

I could tell you to 'just say no' to anything like this, and sometimes I
do that myself, but that\'s not always reasonable or even appropriate.
First, we should try to understand if this is a genuine business need.
Are these ad campaigns important? Do we **need** to track their results?

Next, we take a step back from the specifics of the request and turn it
into the actual business need. Sam asked us to add these scripts, but
what they **really want** is to report on the effectiveness of their ad
campaign. The script might be the right approach, but it's always good
to turn any request that has jumped ahead to implementation back into a
description of the real goal. Can we accomplish within the existing
capabilities of our platform? We have analytics on the site, could we
add distinct tracking ids as query strings to the ads and report on them
that way?

In the end, if this is needed and there isn't any existing way to handle
it, then we are back to the original request. At this point, we still
have options that reduce the negative aspects of adding these scripts.
Talk to Sam, or the set of Sams who work on ad campaigns. Are we
planning to do a lot of these? Generally going all-in on the same three
platforms?

If so, dig into the docs for each platform, so you can determine the
best way to implement their scripts. Are the scripts the same for every
campaign? Add an option in your site admin to turn "Advertising Scripts"
on/off for a set of pages. If that type of self-serve config is too much
work, test adding the scripts to every page. I know that sounds bad, but
it might be a better solution than some sort of complicated
configuration to control where they appear.

Now that we\'ve decided to do this right, it's a platform capability not
a one-off hack. You can test it in depth, include it in your performance
and privacy plans, and take it into account when you are making changes.

Handling these requests properly is a lot more work than a hack, in the
short term, but it is the only sustainable option. We need to deliver on
business requests, but remember that a stable, maintainable, and quality
site is **also** a business priority. Sacrificing the long-term health
of your system for a never- ending set of day-to-day requests is not a
workable solution.

I understand this can be a hard sell.

You will be asked to "just take a short-cut this one time". Sometimes
you won\'t have the support needed to win the battle and you will have
to do it. Try to minimize the impact of this type of work by

- Setting a time to revisit the implementation (to remove or improve
  it).

- Categorize and document \"one-off\" requests. If you can point at an
  ongoing pattern, it's easier to justify doing a proper solution.

- One-off solution results in an issue? It seems wrong to say, \"I
  told you so\", but it's more support for your push back on these
  requests. Write it up and provide some clear data though, don\'t
  expect anyone else to remember or to make the connection to the
  original request.

## Policies as an appeal to an external authority

Finally, the best advice I can give you is to create written
guidelines/policies. Even if **you** wrote it, being able to say \"we
don\'t add third-party scripts to our pages outside of a defined
feature" is a wonderful way to steer the conversation in the right
direction.

My personal approach to this specific issue is to say, "We don't do
that", suggest how they can use our existing capabilities to accomplish
at least some of their goals, and if it turns out to be a high enough
priority then we move to planning out the proper 'real' way to provide a
sustainable solution.

If urgency, as in Sam\'s original request with a day's notice, forces a
short-term solution, we pro-actively plan to resist/remove at a specific
date. I don\'t always get what I want of course, and some things slip
through without my knowledge, but the fewer of these that happen the
better off my team and system will be.
