---
date: 2019-05-12T17:58:00-08:00
title: Setting up Hugo on Azure
type: posts
tags:
- Blogging
- Azure
- Hugo
images:
- /images/beer/imperial_stout_sml.jpg
description: Following directions from a few other folks, I setup Hugo on Azure, complete with the CDN and Azure DevOps to handle CI/CD
draft: true
---
For various reasons, I decide to rebuild my personal site, and I knew right from the start that I wanted to go static. The core motivation is that a static site is simpler (no code running on the server) and therefore should be easier to scale and will be cheaper to host than a 'dynamic' option.

With that decision in place, I started looking at various site generation frameworks. There are quite a few of these, and you can find many articles on why one is better than the other, but in the end I found myself narrowed down to Jekyll or Hugo, with no real strong reason to pick one or the other. I was looking at the benefits of each, and I realized that (for me) there wasn't a really clear way to decide so it was better to just pick one and move on. In either case, they work with a very similar process (content stored as markdown, a generation step that creates HTML that you then push up to a host), so if I decided to move later I wouldn't be completely starting from scratch.

[Aaron Wislang's post on using Hugo with Azure static websites](https://www.aaronmsft.com/posts/static-sites-hugo-azure-cloudflare/) got me started, and the basic process was clear from there.

1. setup a static Azure website
1. build your content using the Hugo executable
1. push the output up to the Azure blob storage behind #1

## Setting up the Azure static website

This was fairly easy to manage. I already had a personal Azure account, but you can sign up for a 'pay as you go' account or use the free trial option if you don't have an existing account. Then go through the 'add a new resource' process.

_rest of the steps_

At this point you have a static website, rendering out whatever content is in the special `$web` blob container. There is nothing there at the moment though, so the next step is to get some content together.

## Building your content locally

If you don't have a Hugo site built locally, go through the quickstart steps. You should end up with a folder named /public that contains your HTML, CSS and JavaScript files. In my case, I decided to use an existing theme, and I used a and b to convert my content from WordPress to markdown. With enough content ready to start testing, I could run the `Hugo` command locally to generate all of my final content to a /public folder in my project directory.

## Getting it up into the cloud

To upload all of this to blob storage, there are a few tools you can use but I found the easiest option to be the AZ Copy command line tool.

It took a bit to get everything working exactly as I wanted, and I ran into a little problem at first, where all of my content was being uploaded without appropriate mime-types. All the files were coming back to the browser as 'application/octet' which prevented the browser from loading my CSS and JavaScript. I started down the path of uploading all the HTML files in one go, setting the content-type to text/html, and then the CSS, then the JS, etc... but luckily, before I had gone too far, I found in the documentation for AZ Copy that if you use the /SetContentType param with **no** content-type, it would set everything to the 'appropriate' value based on your local system. That made it very easy, to upload everything with the same command line, no need to break it up, and everything started working.

With all of my generated content living in `c:\repos\Hugo\Sites\Blog\public` on my machine, this was the command line I ended up using to get everything up to my blob storage account.

```

```

You will need to supply your own keys, which you can obtain from

By the way, I will eventually go through the automation of all of these steps, but until I had everything setup the way I wanted and was happy with the results, I did everything manually and locally, using AZ Copy to push the files to blob storage and then testing everything using the default endpoint of the static website. It didn't seem worthwhile to automate the building or deploying until I was happy with these results.

At this point, I spent a great deal of time working on the theme, fixing up my content and other things not really related to the point of this post. I probably generated and uploaded thirty or so times as I worked on the content, but I'll skip ahead to the next configuration step. My site was now available at ... but that domain is pointing directly at my blob storage account, which is located in a single Azure data center, which isn't ideal in terms of performance around the world. If I can add a CDN (Content Distribution Network) in front of my content, I can improve the performance **and** reduce the load on my blob storage account.

## Setting up a CDN profile for my site

With a static site behind a CDN, I make my pages available at 100s of servers located around the world, hopefully very close to any user who wants to visit my site. You can use a CDN with dynamic sites as well, but you need to code them correctly, designed to always return the same HTML for a given URL. With a static site, that is already the case without any additional work, so adding a CDN should be easy.

Azure offers a bunch of options for CDNs.

I went with the Verizon Premium offering as I liked the rules engine it provides. Without any code running on my server, many of the little tweaks that I want to do, such as:

* redirecting http to https,
* redirecting my root domain to the www version, and
* handling some URL changes between the new site and my old WordPress instance

Creating a new CDN profile and hooking it up to my static site is done in a few clicks (more info here), and the end result is a domain name pointing at my CDN endpoint. I want to use my own custom domain though (duncanmackenzie.net), so I need to configure the domain and then add it to the CDN endpoint. I decided to move my domain records (DNS entries) from their old home with my WordPress hosting company to the relatively new Azure DNS feature. This lets me control my domain right in the same Azure subscription as the content and the CDN, but it is **completely optional**. You can configure your DNS records to point at your Azure CDN endpoint from whatever hosting service you wish to use (including GoDaddy for example).

With that done, duncanmackenzie.net and www.duncanmackenzie.net both pointed at my CDN profile, and then I could let the CDN know that it should accept requests with those hosts by adding them to the CDN endpoint's 'custom domains' configuration.

...

At this point, I sort of had the experience I wanted. You could get to my CDN endpoint at http://www.duncanmackenzie.net, http://duncanmackenzie.net, https://www.duncanmackenzie.net and https://duncanmackenzie.net. That's a good start, but I don't want more than a single URL to be the 'official' one, and because I set my static website to be restricted to HTTPS-only, the two http:// URLs right now will return nothing but errors.

Time to setup my custom rules to handle all of those issues, and take care of a few other goals before I will be ready to go live. With the Premium Verizon CDN I'm using, rules management is done in an external portal. From your CDN profile overview page in the Azure portal, click on 'Manage' to launch this management site. From the menu, select HTTP Large > Rules Engine to bring up the list of active rules. This should be empty to start with, but I have set up various rules that I will walk you through one at a time.

### Redirecting HTTP requests to HTTPS

We want everyone to access our site at a single canonical location, and for me that location will be https://www.duncanmackenzie.net. When someone types the domain name into the browser, I can't guarantee that they won't try to go to http:// instead of https:// so that is the first issue I want to handle.

![Part one of the HTTP to HTTPS rule in the management portal](/images/azurecdn/http_to_https_rule_1.png)

> Explaining the rule using an image isn't great, one because it is a very wide image and hard to fit everything into one screenshot, but also because it wouldn't be very accessible. Instead, I'll walk through the rule written as pseudo-code.

Rules start with a IF clause that determines when the rule should be applied. Alternatively, you can pick IF `Always`, and that means the rule will apply to all requests with no conditions.

For this rule, we are checking if the `Request Scheme` is equal to `http`, so it will apply to any request using that scheme, and will not apply if a request comes in already using `https`. The rule itself will take one or more actions, that you add as 'Features'. In this case, we are doing a URL Redirect (returning status code 301), and it lets us apply a Regex to the incoming requests as another layer of control over when this code runs. In this case, I've used a regex of `(.*)` that will match everything and put it all into a 'capturing group' that we then use in the Destination by putting $1. The Destination is put in as https://www.duncanmackenzie.net/$1, which means that whatever **path** the incoming request has will be added to the new URL as well.  Instead of putting www.duncanmackenzie.net into the rule, I could have used a variable `https://%{host}/$1`. This would have meant that a request for http://duncanmackenzie.net/foo would have gone to https://duncanmackenzie.net/foo and a request for http://www.duncanmackenzie.net/foo would go to https://www.duncanmackenzie.net/foo. In this case though, I already know I'm planning a 2nd rule that takes all non-www requests and redirects to www, so why not skip a step in the case of http requests and send them right to the proper place?

### Redirecting the root domain to the www version

This is a choice, you could go the other way and redirect www to the bare domain. Either works, but you should do this rule regardless; you want everyone to end up on the same domain instead of a mix of two. So, in this case, the conditional for the rule is "IF Edge CName == duncanmackenzie.net" and the action is then to do a redirect, with a pattern of (.*) and a destination of https://www.duncanmackenzie.net/$1. Once again, although the incoming requests could be http or https, we might as well force them all to https at this time since that is our ultimate goal.

### Adding in the HSTS header

Redirecting people to the HTTPS version is good, but ideally they wouldn't even make the insecure request, and the HSTS header is intended to tell the browser to automatically convert any request to our domain to HTTPS. It's a really good idea, and will avoid an insecure request and an unnecessary redirect.

### Setting up my caching rules

The benefit of the CDN is that it will cache my content (HTML, CSS, JavaScript, images, etc.) on it's servers and use that cache to quickly respond to requests instead of having to go all the way back to my blob storage account. For that to work, we need to tell the CDN two things:

* How long to hang on to whatever content it caches
* How long to tell the user's browser to hang on to content

In both cases, you are making a tradeoff between performance and time to update when you make a change. If you set the cache time on your HTML content to a year, any change to that content may not be visible to the users for up to a year. That's probably not a good thing in terms of your HTML pages, but for assets like CSS and JavaScript that are shared across your pages, it would be great. Unfortunately, the same issue exists, if you have a URL like /assets/main.css as part of your site and you set it's cache time to a year then any update to that CSS may not appear to the users for up to that amount of time.

The solution to this is to use **versioned file names**, names that change everytime you change the content. Many Hugo themes, including the one I am using take advantage of Hugo's pipes feature to accomplish exactly this. A unique filename is created for the CSS and JavaScript files whenever they change. This markup in the theme

```
```

produces files like ` ` and ` `, and then references them in the markup.

```
```

Now I can happily cache the content of these files for as long as I want. When I update them, the URL will change, and the CDN will cache the new content and everything will be great. I can't do the same for my images or my HTML though, as both of those are using nice normal URLs like `/blog/<post name>/` and I need them to update relatively quickly.

To get the right result, I'm creating two different rules, and setting ... as the cache expiry for my versioned content and ... as the expiry for everything else.

### Adding a special rule to redirect from /Blog to /blog

When I setup my new Hugo blog, I ended up with all lower-case URLs, like `/blog/new-blog-performance/`, but my WordPress site had `/Blog` in the path. On the web, URLs are case-sensitive, so this means that all of my old posts are still linked out there using that capital letter B. Once I launch my new site and switch the DNS over to hit it, all of those links will 404. This is actually a large problem, because some of my URLs had mixed case titles as well, but in most cases just fixing the /Blog to /blog issue would resolve the broken link so that is what I'm going to start with. At the CDN layer, I can make a rule that matches any incoming link with /Blog and redirects that to the same path but using /blog.

I could have, alternatively, done a URL Rewrite, which would change the URL that is sent back to my static site. This wouldn't change the URL the user ends up at, it would just seem like both /Blog and /blog work. I would rather get people to the right URL though, so that any future person sharing it out or linking to it is more likely to use the correct one.

### Adding response headers

The final item that I need to handle through a CDN rule is adding a variety of headers to the response from the CDN. If I was writing an ASP.NET site, I could handle this in the controller method (with code or attributes), but in the case of a static site I need to do something else. I **could** set headers as metadata on the blobs themselves, but it would be complicated to manage as part of the upload or as a second step, so instead I'm having the CDN add things. I already did this earlier with the HSTS header, so now I'm just adding the Content Security
