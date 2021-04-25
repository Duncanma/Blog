---
date: 2021-04-25T14:53:32-07:00
title: Creating an effective bug report
type: posts
tags:
 - Web Development
 - Coding
techfeatured: true
images:
- /images/bernie.jpg
description: Providing clear steps to reproduce an issue is a benefit for everyone
---

When I've had to contact a company's technical support through a form, I
provide a ridiculously detailed description of what the issue is, when
it happens, the specific troubleshooting that narrows it down, and (if
it is allowed by the form) screenshots. I suspect the people on the
other end aren't used to that, because I know it is not what happens
most of the time when people submit issues to me.

It's fun to point out that a message like "Hey folks, is it normal for
the layout on some pages to be messed up on my phone?" isn't useful, but
perhaps it is more helpful to explain precisely why.

## What's the benefit of an effective bug report?

There are two sides to this, one is the efficiency of the interaction
between the bug reporter and the (hopeful) bug fixer and the other is
the actual likelihood that the issue will ever be fixed. In the first
case, it is a bit like the idea of ["no
hello"](https://www.nohello.com/)... if you don't provide enough
information right from the start, there will need to be an ongoing
back-and-forth.

> **User in a support thread:** Hey folks, is it normal for the layout
> on some pages to be messed up on my phone?
>
> **Helpful Dev Team Member:** No, that doesn't seem normal. What page
> are you seeing this on?
>
> **U:** Some of the pages in the .NET docs
>
> **D:** Can you give a specific URL or URLs?
>
> **U:** Sure, I'm seeing it on \< \>
>
> **D:** That page seems fine to me, on my phone and on the couple other
> devices I've checked so far. What do you mean by "messed up" and what
> phone are you using?
>
> **U:** Oh, it's a Samsung, and the text is just not lining up right
>
> **...** (imagine this continues for 5 or 6 more messages)

Imagine if each of these messages had a few hours or days between them,
as people could be checking in on the thread infrequently, and perhaps
time zones means that the two people are unlikely to be online at the
same time. If, in the original message, the user had tried to supply
enough data to **reproduce** the problem, this could work a lot
differently.

> **U:** Hey folks, I was viewing this page (link) on my Samsung Galaxy
> 9 and it looked messed up. Here is a screenshot and I've circled the
> area where a few of the lines of text are misaligned. Here is a
> screenshot of another similar page (link) showing the expected
> alignment. Does anyone know if this is an issue in that page, or the
> site?
>
> **D:** Thanks for all the info, I looked at the links and screenshots
> you sent, and I was able to figure out the problem. A fix is being
> deployed today after a quick review.

That's an ideal outcome of course, but even if the problem can't be
fixed that quickly, a clear set of steps to reproduce the problem (often
called "repro steps") is the best way to help move the problem forward.
Less time is wasted, for everyone, and the fix could happen much
quicker.

## Why do we need "repro steps"?

The first part of fixing a problem is to make sure you understand it and
can see it in action. If you can't see the problem happen consistently,
you can't be sure you've fixed it. This is not a software development
concept; it is true with nearly everything. If someone tells me the
faucet is dripping, I'm going to want to see the drip happening before I
try to fix it... then when I look and see it **not** dripping, I can
feel confident that I resolved the problem. With a bug report, I always
make sure I can 'test' the bug by reproducing it, because then I know
that I can follow those same steps to make sure I've fixed it in the
end. We are talking about submitting and creating bug reports here, not
fixing them, but ideally the developer would create a test that covers
the same issue as the bug. That test would fail before a fix is in place
and then pass.

As a user, you want your issue to be resolved, and you are in the best
position to help with that. You've seen the issue in action right in
front of you, that's why you are filing the bug. If you want the most
efficient path to solving the problem, figure out a clear set of steps
to reproduce the problem and provide those when you submit the issue.
Screenshots, especially if you can highlight what you are reporting, are
extremely valuable, and for a web site, **including a link is
critical**.

![Image of Bernie Sanders saying "I am once again asking you to include a URL with your bug report](/images/bernie.jpg)

If just going to a page isn't enough to see the issue, then
describe the series of steps that will get you to the right point.

## Is it possible to provide too much information?

I'd rather have too much detail than too little, but I also feel that
the bug reporter shouldn't be expected to try to track down every
possible variable or to try to fix the problem. I'm guilty of this
sometimes, I see an issue, I write up the detailed repro steps, then I
fiddle with dev tools or browse though the code and try to produce ideas
on what needs to be changed. I assume that most of the time, the actual
experts are going to ignore my thoughts and just focus on the repro
steps, but I could be adding confusion to the discussion.

For a user, you should consider anything beyond accurate and detailed
repro steps to be 'extra'. I've had people tell me a lot of information
**without** including the repro steps and that's frustrating, because I
can tell they really want to help and they are willing to put the time
in, but their effort was spent on the wrong things. Telling me you found
a broken link and were able to repro that on three machines and two
browsers is great if you **also** tell me what link and where you found
it.

## Human Nature and Incomplete Issues

I mentioned two sides to this, the efficiency of interaction and the
likelihood an issue will be fixed. If you assume someone will ask for
all the missing info, even if it takes a lot longer, then the only
benefit to a complete bug report is efficiency. In reality though,
developers are human, and when they see an incomplete issue where it
could take many back-and-forth conversations to get the details they
need, they will avoid it in favor of one that they can pick up and work
on right now with no delay. Your issue, which could be **more**
important than anything else in the queue, could end up being ignored
because it is unclear.

A detailed bug report, with clear repro steps, is a win for everyone.
