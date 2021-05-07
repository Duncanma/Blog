---
date: 2021-03-21T1:44:00-07:00
title: You need a test environment
type: posts
tags:
 - Web Development
 - Coding
 - Performance
techfeatured: false
description: To do accurate performance testing you need a live site that is a true mirror of your production environment.
---

Depending on the size of your organization, you may be working in a
world with anywhere from one (production) to many (staging, PPE, Dev)
different environments, but often **none** of those are an accurate
real-world test environment. For a personal or small-company site, you
may only have a production environment, and any change you want to make
is being made in production. Many huge companies/teams have complex roll
out plans and staging environments but are often missing a true test
environment that is a real match for production. Microsoft Docs, for
example, has multiple production instances, so we can do safe rolling
deployments and we have staging and PPE (pre-production environments,
often used for testing new code before it is even ready to be staged).
We don't have a live production environment that matches production
closely enough to be used for performance testing though, behind the
same CDN, running on the same hardware and without any authentication to
corrupt the test results.

## Using a secondary environment for performance testing

There are multiple reasons to run more than
one environment including functional testing and safe rollout, but to do
performance testing requires a much closer match to production than what
I often see.

Let's say you want to make a change to how your JavaScript is loaded.
You can test this in your local dev environment, to make sure it seems
to work, nothing is broken. You could do some performance testing, but
your local environment is nothing like production in performance terms.
Even something as small as domain lookup and SSL negotiation could make
a seemingly great perf update have no real-world benefit or to do harm.
So, you push your changes to the PPE or Dev environment, where it is up
on a server that is hopefully close to production. PPE is only available
behind your corporate authentication and doesn't have a CDN in front of
it though, so it isn't really going to show you what will happen in
production either. For functional testing, this is probably good,
although you could still miss issues that will only happen in the actual
configuration of the live site. For performance testing, PPE isn't much
better than testing on your local box.

A/B testing is often used to get some real-world data on a performance
change, which is accurate and useful, if the testing framework itself
doesn't create a change in the experience. A client-side experimentation
framework, that modifies something about the page after load, is not a
valid comparison. An A/B test is still **in** production as well, so you
are assuming that there isn't any major negative impact to your test.

What you want is to create a complete copy of your environment including
the CDN configuration, SSL certificates, DNS entries and more. If you
pushed the live build to this environment, it should produce the exact
same test results as your production site. You might need to send a bit
of fake traffic to it, to get content cached by the CDN as it would be
in production, but otherwise this is your test bed to try out any
performance work. You are also going to want a rapid deployment cycle,
because you will be making many tiny changes, testing, and then changing
them again.

## Creating a test site for my personal blog

I like to play with performance tuning, and [I use my personal site as a
place to experiment with a ton of minor
changes](https://www.duncanmackenzie.net/blog/new-blog-performance/). Up
until this weekend though, I had just been pushing my updates to
production, because:

- The impact of a mistake was low (I don't get that much traffic), and
- I'm arrogant enough to think my local tests would catch anything
  major before I deployed.

Neither of these are valid reasons. A personal site is part of your
personal brand, a showcase for your skills. If you were a professional
editor, and your personal site had some typos, is that giving visitors
the right impression? As for my lack of traffic, you never know when
someone is going to be looking, and if you only get a small number of
visitors, why risk giving one of them a bad experience? Finally, as I
suspect most developers know, anyone can miss something and deploy a
breaking change that they **thought** was completely safe.

With all of that in mind, I decided that I needed a proper test version
of my site. My blog is a static site, generated using Hugo, [hosted in
Azure blob
storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)
behind an Azure CDN profile, so to create a copy I needed to create a
set of new resources in Azure and Azure DevOps, including:

- a [blob storage
  account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal),
  setup to host a static web site
- a CDN endpoint, with the blob storage account as the origin
- [a custom
  domain](https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain?tabs=azure-dns%2Cazure-portal%2Cazure-portal-cleanup)
  (stage.duncanmackenzie.net) on that CDN endpoint
- an SSL certificate for that custom domain (automatically created and
  managed by just flipping a switch on the CDN endpoint)
- a CI pipeline that is triggered by a different branch in my blog
  repo and pushes the built site to the new blob storage account

Including a few delays, and looking up various things on Docs, this was
up and running in about an hour. Everything I did could have been
scripted/templated though, which would have had two benefits: I could
spin up another environment with nearly no work at all, and it would be
easier to keep the two instances exactly in sync. I didn't do it though,
because I don't have any plans to need more of these environments and
because I didn't think of it until about halfway through the steps.

There is one slight difference between the two sites though, I added a
bit of conditional logic to the robots.txt template in my blog theme to
add a site-wide Disallow line if the site was generated for anything
other than [www.duncanmackenzie.net](http://www.duncanmackenzie.net).
This change makes robots.txt on stage look like this:

```
User-agent: \*

Disallow: /
```

The Disallow statement instructs search engines not to crawl the site,
which **should** keep it from polluting my search engine results and
competing with the production site. I could go farther and add a `noindex`
flag to every page, but I wanted to keep the changes between the sites
to the absolute minimum.

One day later and having this site has been amazingly freeing. Being
able to iterate through random thoughts and experiments with no fear of
breaking the live site, led to about ten deployments in a couple of
hours. I was able to try:

- putting critical CSS inline on the homepage (a success!),
- moving my tiny bit of JavaScript inline (slower!),
- switching to only system fonts (minor benefit, but I didn't like the
  look of it), and
- then finally rewriting my template to get rid of the need for
  JavaScript altogether (a 25% improvement in time to Visually
  Complete).

## A different approach using CloudFlare Workers

Matt Hobbs wrote up [this great guide to an alternate way to do some quick performance testing on your site](https://nooshu.github.io/blog/2021/03/14/setting-up-cloudflare-workers-for-web-performance-optimisation-and-testing/), **without** creating a secondary environment, and I love it. For my blog, a secondary environment was quick and easy to setup, but doing the same for [Microsoft Docs](https://docs.microsoft.com) (or for a site you don't own) would be much harder. Following this path, you use [workers](https://workers.cloudflare.com/) to manipulate the responses coming from the live production site. You write scripts to apply your changes, and then test the result.

You should definitely check it out, and I may end up using it for Docs, but it is worth noting that the final result is not a **true copy** of your environment. In my case, I'm using the Azure CDN for example, but this setup would be going through Cloudflare. As a way to test a variety of changes without a lot of infrastructure though, this is a great option.

## Do you **really** need a test environment?

There is a hierarchy of needs in terms of what is **necessary** for your
web project. I believe a full-blown production copy site for testing is
useful, but for a production site I would put it lower in priority than
a safe deployment process.

Outside of work, I've often seen WordPress sites that had no way to test
any change they made, including upgrading the entire version of their
software. At the time, I don't think I was as disturbed by this as I am
now, but it is a terrible situation to be in. There are two different
angles to this: reliability and workflow. If you need to update your
homepage, is there anyway to get it running where you can show people
and review it? If you need to update a critical plug-in or the version
of WordPress, can you do it in a staging site, confirm it works 100% and
then swap that with the production site... all with the ability to roll
back if something is broken? If you can't do either of these things, you
should fix that before you worry about a mirror site for testing
performance updates but keep it on your roadmap!
