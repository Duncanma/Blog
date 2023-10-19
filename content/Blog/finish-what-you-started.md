---
date: 2023-10-19T07:51:45-07:00
title: Finish what you started
type: posts
tags:
- Management
- Engineering Management
description: Software development projects can only have an impact if they make it to production, so instead of having forty partially done bits of work, you should always prioritize having something actually done.
---

Software development projects can only have an impact if they make it to production, so instead of having forty partially done bits of work, you should always prioritize having something actually done.

This may seem obvious, yet teams often don’t take the right actions to make it happen. If they really wanted to ship a feature, they’d focus on it, instead of having the team working individually on a variety of work. It can seem more efficient to have independent work streams, less co-ordination required, less chance of idle developers, but it can also result in a large set of projects that are all inching towards 90-95% complete, instead of getting something out the door.

Here are some distinct steps we can take to increase the chance of getting our features out into the hands of our users.

## Break the work down into the smallest shippable unit

Priorities change, teams get moved around onto different work, so if we want to ship something we should divide it into the smallest useful set of functionalities we can. You could be building a search feature, and have plans to add filters, exportable results, fancy Boolean operators, but ship out that basic text search first. Then add one more bit of functionality, then another. This approach provides a whole host of benefits.

- You provide value to your users as quickly as possible.
- You start to get feedback and data on the feature faster, which could influence what you build next.
- If the team must switch to something else, the feature is live, there’s no long running branch to get out of date with the rest of the code.
- You get that nice little bit of positive reinforcement from seeing your work in production.

I had this exact policy on one of my teams. Everyone agreed it was the right approach, so we specified that each project would focus on shipping the smallest usable set of features first. Yet, often plans would come in that went way beyond this for the first release. After giving that feedback to folks a few times, I finally asked someone why they kept trying to pile more functionality into a given release instead of just considering that to be ‘part 2’. Turns out it was fear, fear that we’d ship the first feature, then never get back to this project.

That’s an understandable concern, in fact the ability to switch the team to something else is a benefit of this process. By repeatedly demonstrating that you will go back to valuable features and continue to ship improvements, trust in the process can build and there will be less desire to slip more into each release. There is one possibility to consider, however. The first release of a feature, with the minimum set of functionalities, will end up successful enough that further work isn’t a high priority. That’s a good thing. You avoided building more than we needed.

## Always describe your features in terms of the user

You want to build small chunks of usable functionality and ship them, but how do we figure out what’s useful? The best way is to think in terms of the user. What are their goals, what are we providing for them, and would releasing the feature at this state meet those goals? Back to our search example. If the site or app doesn’t have search, and you think it’s necessary, would a basic text search be useful on its own? If so, then that’s the first thing to ship. If, due to the nature of your content, search would be useless without some minimal set of filters, then that becomes the first release.

Be very precise about the definition of the feature at this point, don’t make it “deliver a search experience” or “users can search the site”. That’s not helpful in deciding when you are done. Instead, write out detailed scenarios ([user stories](https://en.wikipedia.org/wiki/User_story) if that format appeals to you) such as “a user can type in ‘cat’ and get back entries for any page that has the letters ‘cat’ in the title, ordered by most recent”. When you are testing your work, it is hard to say if you’ve delivered a search experience, but easy to say “yes, searching on ‘cat’ brings back the entries that match”. In practice, I’d suggest you get even more detailed. What does it mean to get back entries, what information should be returned about each one, do you need pagination (not for the first release, just return a max number of items), etc.

Personally, I don’t think you need high-fidelity designs at this point, you are defining the desired result and breaking down the vague concept into something shippable. Once that’s decided, then having someone work up the UX, in parallel to other team members starting to build, can start. If you do have designs created though, they should be focused on exactly what you are planning to ship, not some mythical future state that you hope to get to. Just like the rest of the work, design should be done for the smallest shippable unit and then iterated on.

## Work in parallel, but don’t obsess about wasted work

Efficiency is great, but our goal is to ship. If someone starts building the UX for showing search results, and then when the API is finished there are some little tweaks they must make, that can feel like rework or waste. If you follow that logic far enough, you will end up waiting to build any one part until all the dependencies are complete. If you are going to do that, then unless you want people waiting around, you should put only one person on this feature, or have the other team members work on something else while they are waiting. Now we have a 5-person team, building five features instead of focusing on one.

> Some multi-tasking is normal, people will finish work at various times, and sometimes tasks will be blocked, but I’d recommend just having people pick up small bugs or issues from the backlog instead of starting into other features.

If you have work happening in parallel, then go ahead and build out the UX based on the expected set of data and then change it if you need to. Build the API and then when it turns out you need to tweak the input parameters, it’s ok if that means updating what you’ve built. Remember, you haven’t shipped yet, you are building this together.

If you want to avoid rework, then talk to each other more, document your plans. Provide a simple API endpoint right away that returns a random set of results, so the UX can be completed while the real API logic is being finished. Going the other way, provide a simple no-style test page that calls the API, so the API person/team can ensure their code is behaving as expected.

## Pick the right size of team

There are limits to how many people can work on a single feature before they start just getting in each other’s way. In the search example, I could see 2-3 people easily, with a search form needed, a page of search results, and an API. If the API was complex or involved some new database work, maybe that’s another person. If you have ten people on your team though, you can split up and take on a few features at the same time. In every case though, remember that work means nothing unless it is completed, so if the search feature is almost ready to ship and just needs a bit of help to get it into production, the rest of the team should be happy to assist. Teams can be fluid, people aren’t Tetris blocks, and project sizes will vary.

## What about shipping the **right** features?

Reading this post, you might think I’m advocating for speed more than anything else… ship ship ship. That’s not the case though. Deciding what features to build, and what mix of functionality goes into the first, second, and third releases is still an important part of the product development process. How you turn those decisions into code is my focus, and making sure you realize that ten features 90% done isn’t as useful to the customer as one feature they can use.

Related to this, deciding to abandon a project, or pause it, is another way to ‘finish what you started’. If a feature was a great idea and a top priority when you thought it was going to take a month of work, and it starts to slip into a second or third month, you can change your mind and just stop. This is another benefit of scoping your projects as small as possible, if you decide to stop, you aren’t losing out on as much work.

## What about a long-term vision?

I find it extremely useful to think about the future state of a feature, even while advocating for shipping only the smallest possible first step. Having at least a vague idea of the end state, with some of the steps in between being a bit clearer, will help in your development decisions. You might change your vision, but looking ahead could help you choose a better path from the start . In our search example, if you think pagination is a definite ‘fast follow’ (a term for a feature that isn’t required for the initial ship, but you plan to release quickly after), then you could consider that when building the API or the underlying data structure. Sometimes a long-term vision is essential to explain the project to the rest of the management chain, but you should also be clear that you’ll be building it in stages.

## Why don’t we do all development this way?

If I’m so convinced that delivering small shippable units is the right way to ship software, then why don’t I always do it? I can personally think of three situations where this happens, even with the best of intentions.

First, sometimes you just make a mistake and think “this is small enough that we can do all the features in the first release” even though it could be broken down. In this case, you need to remind yourself that even if a project doesn’t need to be broken up, there are benefits to coding it this way. Then, if you judged wrong and the full project is taking a long time, you should be able to ship something sooner.

Second, there is a fear that a minimum feature set will be poorly received by our customers. This case is a bit trickier, because it could be true. “We’ve been demanding search for years and this is what they give us?” is not a successful launch. There are a couple of solutions to help in that situation. One is to provide visibility into your plan, show that you have more releases planned (assuming you feel they are actually going to happen), describe this as a beta or preview to help set expectations, or perhaps you need to redefine the ‘minimum shippable unit’ to take into account what your users expect. Even in that last case, I’d still build it in smaller pieces, release it to a subset of users or behind a flag (a mechanism to restrict who sees a new feature, while still having it deployed), so that you are shipping something much quicker.

Finally, and this is one of the most difficult situations to find yourself in, it can be very hard to break up a complete system migration (moving from one tech stack to another for example) into small pieces. It is possible, but it will often end up looking like a longer process and a lot more work to do incremental releases. Experience suggests that, because it’s safer and because code that gets into production is getting validated and tested more often, the longer incremental release process won’t be any slower. It will seem longer when planning though, so it can be difficult to pick that path or convince your organization to take that path.

## Where to go from here

If you’d like to do more development in this style, but don’t have the agreement of the rest of the organization, I’d suggest one of two approaches. Either convince them that it is worth trying on a few features, the set of work planned for an upcoming quarter, or the work being done by one specific development team or alternatively go ahead and do it behind the scenes.

The first path is nice, because you can be open about only building the full plan for each small release, and hopefully everyone will agree it is working great. The second path is more complicated. You’ll have to have a larger release planned, with release dates and a committed set of features. You can then implement it in small pieces, building and releasing each phase completely behind a flag, and never shipping anything to the real users until the end. That removes many of the benefits, but it can get your developers used to working in this mode and produces a more stable result because each phase had to be shippable. It also gives you the option, and multiple points in the development process, to ship a limited version of the full project, if you can convince your stakeholders it is valuable at that time.