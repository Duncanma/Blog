---
date: 2021-08-31T11:57:56-08:00
title: Don't Mess Around With Your Domain!
type: posts
tags:
 - Web Development
 - Security
techfeatured: true
description: If your company has a core domain, leverage it for all your sites, instead of making new ones.
---

If you are an established company or organization, you probably have a main second domain. Microsoft has 'microsoft.com' for example, Washington state has wa.gov, and the UK government has gov.uk. There is both a perceived and real value to these domains, and any domains that leverage that value can be inherently trusted. A random third-party can’t create a new foo.gov.uk site, only the owners of the main domain can do that.

At Microsoft, this means we should leverage 'Microsoft.com' whenever we launch a new site. Instead of something like 'MicrosoftDocs.com' we used 'docs.microsoft.com' for example. Many users will not be aware of the difference, which could lead you to believe it doesn’t matter, but it is still a good practice. Anyone can register a domain like MicrosoftDocs.com, and with some careful design, they could trick users into thinking this is an official site.

I saw the positive and negative impact of proper domain choice recently, when researching the rules on travelling to Hawaii during the ongoing pandemic. There is a program called 'Safe Travels', but a search on that term brought up many sites:

![Search results showing many results around Hawaii and COVID-19](/images/domains/FullSearchResults.png)

The first link is to travel.hawaii.gov, an official site run by the Hawaii state government, and the best place to go… but the second link seems useful too and is located at safetravelshawaii.com. This isn’t a scam site as far as I can tell, but it isn’t the official government program, and exists to promote a specific company’s products and services. So far so good, the proper domain name was used for the official site and made me feel safe using the information on those pages, but if I look a bit further down in the search results… 

![Search result showing a site called hawaiicovid19 that seems to be from the Hawaii government, maybe?](/images/domains/SearchResult.png)

This **is** an official Hawaii government site and is where my airline sent me originally … but the domain name doesn’t leverage Hawaii.gov at all and could have been set up by anyone. I could easily register a domain name that sounds just as authentic and put whatever type of misinformation I wanted there.

![Domain available notice from a site like GoDaddy, showing me about to buy HawaiiCovid.com](/images/domains/HawaiiCovid.png)

So, don’t do that. Always leverage your existing domain name and perhaps over time we can train users to use the host as an essential bit of information when determining if they should trust a site. Short links, such as bit.ly, can make it hard to even check where you are about to go, but once you end up on a site, check the domain name!

Now that I’ve been thinking about this, I am seeing similar issues everywhere, someone mentioned the GitHub shop, which is located at `thegithubshop.com` instead of something like `shop.github.com` (although that does redirect). When I first went to that store online, I wasn’t sure it was official. Link shorteners make this whole problem even worse, but that is already [well known](https://safecomputing.umich.edu/be-aware/phishing-and-suspicious-email/shortened-url-security).

{{% note %}}
FYI, John Oliver had [a great segment about the Equifax security breach](https://www.youtube.com/watch?v=mPjgRKW_Jmk) that pointed out this exact issue. Equifax (that has a nice authoritative domain of Equifax.com) setup a new site at www.equifaxsecurity2017.com to deal with this specific event, and the HBO host showed that anyone can create a site that sounds legit by spinning up www.equifaxfraudprevention.com.
{{% /note %}}

