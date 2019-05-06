---
date: 2015-10-08T18:20:17+00:00
title: Content Taxonomy Musings
type: posts
tags: ["Channel9","CMS","Blogging","Writing"]
---
My day job is running a bunch of systems as part of Microsoft’s developer relations (DevRel) group and the biggest of those is Channel 9 (<https://channel9.msdn.com>). Channel 9 is basically a video blogging platform. We have ‘blogs’, which contain posts, written by people. Seems simple enough, but after running for 10 years we have a bit of a problem. Too much content.

For years now, the problem of ‘how should we categorize our content?’ has been floating around as a top issue, but no one ever wants to put it above any of the features they’d like added to the site. It is still an issue though, and something that is at the top of my mind nearly every day. This is not your typical technical blogger post though, where I describe a problem and our brilliant solution. This is truly just my thoughts on the topic, and hopefully it will spur some good discussion. If that discussion helps me get to a solution, that wouldn’t be so bad either!

## The situation

Our current categorization system is based on three main attributes that are added to posts:

  * They live in a container of some sort (a blog, a show, an event). A post has to exist in one and only one container
  * They have one or more contributors (the people who made the video, posted the video or appeared in the video… the fact that it could be any of these is a problem for another post)
  * They have zero or more tags

While we could dig into the other two attributes, the key organizing factor in our system is really these tags. Tags are applied by the content creator, and are visible as a means of navigation for the users. Since there is no fixed set, no structure, and no enforced requirements in our tagging, I would classify our tagging system as a [folksonomy](https://en.wikipedia.org/wiki/Folksonomy) (more specifically a narrow one, if you want to be accurate). Essentially, every content creator is responsible for deciding what the right set of tags are for a piece of content. This gives great freedom, but produces terrible inconsistency.

At the moment this post was written, we have:

  * 60 thousand videos up on the site,
  * 10 thousand tags, and
  * 13 thousand videos that have no tags at all

We have over 1,000 new videos being published each month; the problem isn’t getting smaller over time. So what to do?

The first red flag was the fact that 20% of our videos had zero tags, so we now require that you tag the video with **something** before you can publish it. That helps, but it doesn’t fix the problem. Let’s look at some really good pieces of content on the site and see how they are tagged.

[This is a great 10-minute video by Scott Hanselman, covering Azure Media Indexer.](https://channel9.msdn.com/Shows/Azure-Friday/Azure-Media-Indexer-autoatically-creates-transcripts-for-your-media-with-Adarsh-Solanki) This feature of Azure, part of Azure Media Services, will produce captions automatically from your video file. Very cool, everyone who cares about media should watch this.

It’s current tags? Just one: “Azure”. That’s not terrible, it is about Azure after all, but is it sufficient?

The video is about **Azure Media Indexer**, a Microsoft service, so that would be a good addition. Azure Media Indexer is part of **Azure Media Services**, so Azure Media Services would be good to add as well. The point of the service is to make captions, which serve two main purposes: Accessibility and Find-ability (not a word, but it seems to fit). So, perhaps **Accessibility** would be a good addition, and maybe **SEO**? If you watch the video, Adarsh and Scott talk about how the output of Azure Media Indexer could be fed into a search engine like Azure Search, should we add that? At this point, it starts to be a bit debatable. You could say “yes, they mention Azure Search, so it should be included.” or “No, it isn’t really about it, it is just mentioned in passing… doesn’t count”. It is a judgment call, which means we probably have gone deep enough with “Azure, Azure Media Indexer, Azure Media Services, Accessibility, SEO”. That covers ‘what’ the video is about and even the ‘why’, but there is more going on here from the point of view of categorization. There is the ‘who’ (Scott Hanselman and Adarsh Solanki), the ‘how’ (it is an ‘Interview’), and just to be complete we could even think about the where (it is ‘In Studio’).

If we were posting one video, we could go really detailed with our tagging, but there is a cost to every additional tag we add. The more data we attach to the post, the less meaningful it is, because we are adding attributes that are not the most important aspects of the post. Also, adding these tags takes time, and given the 20% of videos that were posted with zero tags, we can conclude that our contributors do not want to spend a long time categorizing their videos. If we focus in on the topic of the video for now, and ignore the other details (who, how, where), we would be ok with “Azure, Azure Media Indexer, Azure Media Services, Accessibility, SEO”. I could edit this video now and add these tags, but we are trying to fix the system now for the next 60 thousand videos, not just this one, so more thought is required. If it is already possible to add these tags to a video, why wasn’t it already done? It seems like it isn’t a technical issue, but what can we do in our system to get better results?

I have a few ideas, either to make it quicker and easier to tag content, or to provide more structure in our tags to encourage better content attribution. Free flowing thoughts below…

## Remember Past Tagging

When someone sat down to post this episode of Azure Friday, it was probably not their first post on Channel 9, and we know it wasn’t the first post in this show. What if we did some simple queries to find the most commonly used tags by the user and/or in the show they are posting to and ‘auto tagged’ the post? I have some fear that we’d suggest the wrong tags (if the last 10 posts were about Azure Websites, we’d suggest that for this video… and it could end up tagged wrong), so it would have to either be just a suggestion (more work for the user, they have to ‘pick’ the tags to include, still easier than a blank input box though) or be really easy to remove the auto-suggested tags.

## Categorizing our tags, and then requiring tags in each category

When we dig through our thousands of tags, and when we look at the tagging in other systems in our family (like MVA), we see certain fundamental buckets that tags could be grouped in:

  * Product / Technology (ASP.NET, Azure, Windows, HyperV, etc.)
  * Scenario (Security, Web Development, Deployment, System Management, Testing and so on)
  * Audience (IT Pro, Developer, End User, Student, etc.)

If we moved from a single ‘Tags:’ field in our admin to a set of three (‘Products/Technologies:’, ‘Scenarios:’, ‘Audience:’), we could then add rules like ‘you must tag your content with at least one product or technology’. My fear with any required amount of tags though is that people will just assign something randomly to get past the requirement, especially for a post that isn’t really about any given product. Consider this post, [Countdown to Microsoft Ignite](https://channel9.msdn.com/Shows/Microsoft-Ignite-Countdown/Countdown-To-Microsoft-Ignite-CD5). What product is this about? Nothing really, it is about an event, it is useful, we are happy to have it on the site… but not about a product. Is it about any ‘Scenario’? Nope, not really. It does target one or more audiences, but that’s it.

So if we **require** a product tag, this will either end up tagged with something general like ‘Windows Server’, which corrupts our video catalog, or we add a ‘Product’ of ‘Ignite’, which is corrupting our tags. We could at least make suggestions though… “You haven’t tagged this video with any products or technologies. Are you sure it isn’t about any specific ones?”

_Honestly, I feel this is like trying to decide on the best way to catalog your Blu-Ray collection (assuming you still have one); do you go alphabetical, by genre, by year released, or maybe in order of your personal rating? Or do you just toss them in a drawer and when you want to watch something just end up using Netflix anyway?_

## What about a hierarchy?

The idea of grouping tags into buckets like Product wasn’t a bad one, and I think it would help, but what if we also added the concept of parent-child relationships to our tags? What if Azure Media Indexer was a child of Azure Media Services, which was a child of Azure?

![Simple tag hierarchy](/images/TagHiearchy.jpg)

Perhaps, if we had this relationship, we could use this knowledge to make the tagging job easier. Post is tagged only with Azure Media Indexer? We infer the rest of the tags all the way up the hierarchy. This has benefits when finding content; when you view ‘all posts tagged Azure’, we could return posts that are tagged with Azure Media Indexer too. The other benefit is for the content contributor; they could just tag with the very specific tag and wouldn’t have to remember to add all the others. That has merit, but it wouldn’t have stopped someone from tagging a post with just Azure like they did with the Azure Friday video given as an earlier example.

We could look at the tags used and ‘notice’ (I like putting human style verbs to what will turn into a series of Linq statements in code) that you are using a tag that has children, but that you are using none of the children. “You’ve tagged this video with ‘Azure’, which is a general tag that has 50 more specific child tags such as … do any of these also apply to your video?” Not sure if it would be sufficient to just check for tags that happen to have children, maybe we’d have to flag tags in the system as being very broad.

If we are creating parent-child relationships, we could take this another step and create ‘aliases’ as well, similar to what [Stack Overflow has done with their tag synonyms](http://stackoverflow.com/tags/synonyms?tab=newest&filter=all). This would help avoid the continual creation of duplicate tags in our system (such as Microsoft Research, MS Research, MSR, MSResearch), and increases the value of each tag.

## Auto-Tagging?

I hesitate to even add this, because I don’t know exactly how we go about building it, but I know it will come up. It seems the major issue in our system is getting the contributors to put the right tags on their content, so what if we just did it for them? In a way, we do this already through our search, you can search on [Azure Media Indexer](https://channel9.msdn.com/Search?term=Azure%20Media%20Indexer#ch9Search&lang-en=en) and you will find the video with Adarsh and Scott even though it wasn’t tagged right. It had the right terms in the title and description, which is probably the first place we would look to find terms for auto-tagging. Still, tags are useful for establishing a navigation structure in the site in a way that search doesn’t provide, so extracting key terms would be useful. Understanding what terms are important, which ones are ‘Products’ for example, would be a challenge. Seems like the sort of project Microsoft Research could help with, but might be a bit daunting for our tiny 2 to 3-person dev team on Channel 9.

## Conclusion?

I have none…

Categorizing tags and tag relationships seem like the right way to go, but it will be a lot of work to get this implemented and move all our tags into this model. Until that work finds its way to the top of the priority stack, it is difficult to say if this is the right solution, or even an improvement over our current situation.
