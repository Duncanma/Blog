---
date: 2021-05-06T21:04:51-07:00
title: Do as little work as you can
type: posts
tags:
 - Web Development
 - Coding
 - Performance
 - Scalability
---
One of the keys to scalability in software systems is to reduce the
amount of work you do per action. In a website, think of this as the
amount of processing and data transfer done per request. The smaller
that set of work is, the better. This applies to all sorts of systems
and at all layers of the stack, but I am going to focus on the website
scenario because it is where I spend most of my time.

For every bit of work you do as part of your web application, you should
be thinking about how to do it less. You have two main approaches to do
this, but you can end up using them both depending on your situation.
Caching, where we hold onto the output of some work so that we can reuse
it and avoid doing the work again, and pre-processing, where we do work
in advance so that we don't have to do it 'in real time'.

## Our sample site

As I go through each of these concepts, we'll focus on a fictional site
that gives information about vehicles. The site works by pulling the
make, model, and year out of the URL and rendering the appropriate
information to the user. The site has this set of pages:

- A home page (that is a list of vehicle manufacturers, the make),
- A page per manufacturer (with a list of models),
- A page per model (with a list of years that model was produced), and
- A per specific vehicle, such as a 2011 Toyota Rav4

Thinking of this as URLs, which I love to do, we have:

- / (the home page)
- /Toyota (and /Mazda, /Audi, /Nissan, etc.)
- /Toyota/Rav4 (the model page)
- /Toyota/Rav4/2011 (the specific vehicle page)

Let's assume that behind the scenes, we have a database that has all the
vehicle information in it, so the basic logic of the site would be a
route for each of the four types of pages, the URL would provide the
parameters and then the code would make an appropriate request to the
database.

Something like the pseudo-code below

Home page (/)

- SELECT DisplayName, UrlSafeName FROM Make ORDER BY DisplayName
- Loop through and list out the manufacturers, with links to /\<UrlSafeName>/

Manufacturer page (/Toyota/)

- Pull name from URL
- Check DB to see if it is a valid make, if not then 404
- Pull list of models from the database:\
    SELECT model.DisplayName, model.UrlSafeName FROM Model INNER JOIN
    Make ON Model.makeID=Make.ID WHERE Make.UrlSafeName=\<make from
    URL\> ORDER BY model.DisplayName
- Display list of models, with each one being a link to the model page

And so on for the next two levels.

## Caching in all its wonderful forms

In its simplest form, caching is simply hanging onto something so that
you can re-use it, but this can happen at many different layers in a web
application. We can do client caching, where we add headers to our
response telling the client (the user's browser for example) that the
page is valid for the next hour. In that case, if a user visited the
homepage of the site, clicked on Toyota, then Rav4, then 2011 the server
would end up needing to make as many as ten database queries to return
all these results. If the user then came back to the homepage twenty
minutes later and clicked on Toyota again, their browser wouldn't need
to make any new requests as it (likely) still has the page cached. On
the server, we've avoided making those ten extra database queries. Now
if they came back again a few days later, the browser knows their local
copy is too old and would make new requests resulting in new database
requests on the server.

This is great, but it only addresses the idea of a single user visiting
multiple pages. If we instead have thousands of users visiting a given
page, every one of those requests is generating database requests. What
you need to ask yourself as a developer is "are those requests
necessary?". In other words, do we think the results of those queries is
changing so fast, that we need to retrieve the data on every request?
Assuming, as would be the case in our example, this data is **not**
changing that quickly, we are doing too much work. We have two ways to
solve this with caching. We could cache the results from the database
query on the server, changing our logic for the home page (as an
example) to be more like:

- Is my saved copy of the list of manufacturers still fresh enough
  (retrieved within the last hour, for example)?
- If so, just use it, otherwise make a query to the database and then
  save it in memory.
- Display the list on the page.

Caching has let us take our database transactions for the homepage from
one call per visitor to one per hour. Assuming thousands of page views
per hour, we've reduced the load on our database by a massive amount.
We've also made the load 'fixed', in that it doesn't increase as our
traffic does.

There is still work on every request though, we still must check the
cache and do our loop to render the list onto the page. These are both
simple bits of work, but it is still work, and so our goal should be to
get rid of it. Some webservers let us do 'output caching', where the
server will hang onto the rendered HTML output and if someone request
that page again (within a set time window) the server will just return
the HTML without having to run our code.

That's still work though, we've just moved it from our code to the web
server. Just asking for the page and getting a response puts load on the
server and we don't want that.

This is where a [CDN](/blog/overview-of-cdn/) (Content Delivery Network) can come in. We point our
domain name to a CDN provider like Akamai and tell it to use our server
as the source (called the origin in the CDN world). Using the same type
of cache headers we used for client caching, we tell the CDN that our
homepage is valid for an hour. The CDN will make a request back to our
server whenever its copy expires, but that should only be once an hour,
so now we are down to one hit on our server per hour, per unique URL
(because each page has different content, so the CDN caches each one
independently). You might point out here that each request is still
causing work, but it is to the CDN's servers and those aren't ours, so
we don't really care.

That's awesome and about as far as caching is going to get us. We could
play with the duration of the cache (should it be one hour or twelve?)
but the basic reduction is there. To get to an even better state, we
need to look at pre-processing.

## Pre-processing

In our caching example, whenever the CDN needed a new copy of any given
URL, it would request it from the source, which in turn would result in
one or more database queries. It's a minor amount of work, but it is
still work. That once-per-hour request is putting load on our database
and will be a tiny bit slower getting back to the user.

Our goal is to get rid of as much work as we can though, so that is
where pre-processing would come in. What if, instead of ever hitting the
database, we generated the HTML for a page ahead of time, whenever the
underlying data changed? If we updated the information for a 2011 Toyota
Rav4, we would generate the HTML that `/Toyota/Rav4/2011` should return
and push that updated content up to the webserver.

Now, when the CDN needs that page, it asks the web server for that page
and the server just hands the HTML back with no database call. It's not
zero work, but we are getting close. These days, we use the term
'static' to describe a site like this, where you build the content only
when needed and never in response to a user request. Combined with a
CDN, this approach reduces the overall amount of work happening on every
request down to as close to zero as you can get. Instead of running
database queries whenever anyone asks for a page, we run it only once to
generate the output ahead of time.

I used the example of a vehicle site because back in the early 2000s,
the MSN Autos site used this exact technique. They pre-rendered all
their vehicle info pages whenever they updated their data. It was a
great idea at the time, and it still is!

There are other benefits beyond just performance and scalability with
this approach, we've also simplified the system that is running in
production. If our database is down, or slow, it won't impact the live
site. If the code that generates updated HTML fails, that will prevent
updates (which could be important depending on your scenario), but it
won't cause any errors or outages on the site.

## Putting it all together

All the various levels of optimization discussed above are not different
paths you can take; you can do them all in any combination. Caching at
the CDN is more impactful than caching on an individual user's machine,
but the local cache can still improve the performance for that user, so
do both. If your page generation code, even though we only run it
occasionally, is making the same database queries repeatedly, you should
consider caching the results as you go to make the process faster.

**I've written about this before in other contexts, but if you want a
fast site, make it as static as you can, use a CDN, and avoid doing any
more work than necessary.**
