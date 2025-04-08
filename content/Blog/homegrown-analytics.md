---
date: 2024-07-10T20:52:47-07:00
title: Homegrown Analytics
type: posts
featured: true
tags:
 - Web Development
 - Coding
 - Performance
 - Azure
 - Hugo
 - DevTo
images:
- /images/homegrown/chart.png
description: I decided to roll my own analytics system, using Azure Functions and CosmosDB, to eventually replace my Google Analytics system.
---

I must start with a quick disclaimer. Replacing the near-universal web analytics with your own is not the right path for *most* people. What I’ve made is nowhere near equivalent, it involves writing my own code, any analysis I want to do is all on me, etc. If you are here because you want to remove GA from your site, you could try one of the more popular alternatives like [Plausible](https://plausible.io) or [Piwik](https://piwik.pro/web-analytics/). Personally, I had looked at Plausible, but $9/mo (which is a completely reasonable price) seemed like a lot for the tiny amount of traffic I get. Ok, so that’s out of the way.

## The motivation

I was running performance reports on my site, using Google’s Lighthouse, and while *most of the time* it was scoring high, occasionally it would flag JS issues that were thread blocking, or in this most recent run it had some issues with cookies. In both cases it was Google Analytics (GA) that was called out and that annoyed me. I work hard to make sure my site runs without any script, but GA is my main exception and I have little control over it.

> I’m sure I could fix the cookie issues, I’m sure that I’m not doing something right with my implementation of their script, but I’ve always wanted to get rid of this 3rd party dependency *anyway*.

I started to think about how little information I really need in terms of analytics, way less than GA provides. Given that, building a replacement shouldn’t be too difficult.

> I’m reminded of [the humorous quote]( https://x.com/pinboard/status/761656824202276864) “we do these things not because they are easy, but because we thought they were going to be easy”.

## My requirements

As always, I wrote up my basic requirements before doing anything else.

The replacement should:

- Work without JavaScript (progressive enhancement is fine, so it can do *more* with JS enabled),
- Use only first-party cookies,
- Provide traffic data daily, and
- Track all the data I care about.

For that last point, I produced this list of desired reports/views, all viewable by day/week/month:

- Overall page views
- Views by page
- Views by referral source (requires JavaScript)
- Views by new visitors vs. returning (implies a cookie or similar)
- Views by browser / device
- Views by country

I have some more random thoughts, like “views by dark vs. light mode” that I don’t currently get in GA (although I could add it with some client-side script), and I’m sure I’ll add more tracking over time (web vitals?), but this is the core set. I’ve put them in priority order as well, and I’ll implement solutions starting with a basic set of tracking.

## The good old 1px image solution

A tracking pixel, just a very tiny image requested with an `<img>` tag on your page, is the classic way to add data gathering to a web site without using JavaScript. The image source is an endpoint on your server, and the request is formatted to pass along data via query string parameters as well as everything that comes on the standard HTTP Request (user agent, IP address, accept-language, cookies).

I’m going to start with this, because I figure that will be my *base* implementation. I just need something to point it to.

## Handling the image request

I could spin up a web server, but to ensure it responds quickly I’d need it to run 24/7, and that’s inefficient for my site’s level of traffic. Instead, I will use another Azure Function (like I did in [the order fulfillment article](/blog/order-fulfillment/)), that responds to a HTTP GET request and puts a message into a Queue.

I’ll pull some information from the query string and some from the request. As a start, I’ll be trying to fill up this data structure:

- Page Type (homepage, post, content, album, album list, etc.)
- Post Title
- Canonical (/blog/foo)
- Actual URL (https://www.duncanmackenzie.net/blog/foo?bar=buzz)
- User-Agent (mostly to give us OS & Browser info, but it’s a complicated string like `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`)
- IP Address (8.8.8.8)
- Accept-Language (en-US,en;q=0.9)
- Referrer

I’ll create the image tag in my Hugo code, adding readily available info (title, type, and the relative canonical URL) as query string params all at build time. IP, Accept-Language, User-Agent, and URL can all come from the request. Referrer is a problem though, as the request for the *page* will have received it, but the referrer for the image request will be the site page itself. We’ll come back to that in a moment, but with all of this figured out, I was ready to start planning the Azure side of the project.

As I mentioned, the image URL will point at an Azure Function, which will extract all the info from above, turn it into a message, push it onto a Queue (for further processing), and return a transparent 1px image. I want this function to return as fast as possible, so I avoid doing any work on the data at this point, just grab it raw and push it to the queue. The function is triggered by a GET request, creates the request object, pushes it onto a Queue, and returns the 1px image.

The request object (how it looked to start)

```csharp
public class RequestRecord
{
    public string id {  get; set; }
    public string requestTime { get; set; }
    //simplified version of the day portion (20240503)
    public string day { get; set; }
    //the permalink/canonical relative form
    //of my URLs (like /about or /blog)
    public string page { get; set; }
    //the full URL that was requested,
    //with whatever query strings might be on it
    public string url { get; set; }
    public string ip_address { get; set; }
    public string title { get; set; }
    public string referrer { get; set; }
    public string accept_lang { get; set; }
    public string user_agent { get; set; }
    public string country { get; set; }
    public string countryName { get; set; }
    public bool js_enabled { get; set; }
}
```

And the Azure Function

```csharp
[FunctionName("event")]
public static async Task<IActionResult>
    trackAnalyticsEvent(
    [HttpTrigger(AuthorizationLevel.Function,
    "get", Route = null)] HttpRequest req,
    ILogger log)
{
    try
    {
        string connectionString
            = Environment.GetEnvironmentVariable(
                "AZURE_STORAGE_CONNECTION_STRING");

        QueueClientOptions queueClientOptions
            = new QueueClientOptions()
        {
            MessageEncoding = QueueMessageEncoding.Base64
        };

        QueueClient queueClient
            = new QueueClient(connectionString,
            analyticsEvent, queueClientOptions);

        RequestRecord request
            = CreateRequestRecordFromRequest(req, log);

        if (!FunctionsHelpers.RequestIsCrawler(request)
            && !FunctionsHelpers.RequestIsLocal(request))
        {
            string message
                = JsonSerializer.Serialize(request);
            await queueClient.SendMessageAsync(message);
        }

        req.HttpContext.Response.Headers
            .Add("Cache-Control", "private, max-age=300");
        var pxImg = new FileContentResult(
            TrackingGif, "image/gif");
        return pxImg;
    }
    catch (Exception e)
    {
        log.LogError(e, e.Message);
        throw;
    }
}

private static RequestRecord
    CreateRequestRecordFromRequest(
    HttpRequest req, ILogger log)
{
    RequestRecord request = new RequestRecord();
    request.ip_address = GetIpFromRequestHeaders(req);
    request.accept_lang = req.Headers["Accept-Language"];
    request.url = req.Headers["Referer"];
    request.user_agent = req.Headers["User-Agent"];

    var query = req.Query;
    if (query.ContainsKey("page"))
    {
        request.page = query["page"];
    }
    if (query.ContainsKey("title"))
    {
        request.title = query["title"];
    }

    if (query.ContainsKey("referrer"))
    {
        request.referrer = query["referrer"];
    }

    if (query.ContainsKey("js_enabled"))
    {
        request.js_enabled = true;
    }

    DateTimeOffset requestTime
        = DateTimeOffset.UtcNow;
    Guid id = Guid.NewGuid();
    request.id
        = $"{requestTime:HH':'mm':'ss'.'fffffff}::{id}";

    request.requestTime = requestTime.ToString("o");
    request.day = requestTime.ToString("yyyyMMdd");

    return request;
}
```

In my Hugo site, I add this image to the bottom of the page with a partial, creating a version for both the no JavaScript situation and another for when I can execute code.

```go-html-template
{{- $rootPath := .Site.Params.homegrownAnalytics }}
<noscript>
    <img class="analytics-pixel" src="{{ $rootPath }}&page={{ .RelPermalink | urlize }}&title={{ .Title }}" height="1" width="1">
</noscript>
<div id="analytics">
</div>
<script>
    if (document.prerendering) {
        document.addEventListener("prerenderingchange", initAnalytics, {
            once: true,
        });
    } else {
        initAnalytics();
    }

    function initAnalytics() {
        var referrer = document.referrer;
        var img = document.createElement("img");
        img.src = "{{ $rootPath }}&page={{ .RelPermalink | urlize }}"
          + "&title={{ .Title }}&js_enabled";
        img.height = "1";
        img.width = "1";
        img.className="analytics-pixel";
        if (referrer) {
            img.src += "&referrer=" + encodeURIComponent(referrer);
        }
        document.getElementById('analytics').appendChild(img);
    }
</script>
```

As you can see in the code, the script version lets me add the referrer, and I also pass along the js_enabled param so I can track what % of visits are hitting my `<noscript>` version. I had to add in the `document.prerendering` section to handle when Chrome was [prerendering my pages](/blog/speculation-rules/), I don’t want to fire an analytics event in that case.

## Determining the data architecture

I can add this to my pages right now, and it will start filling up the queue with data, but without another function setup to process from the queue that’s not much use. This is a suitable time to stop and think about the queries I’m going to want to make in the future and design a set of tables around those needs.

Going back to my original requirements, I’d want to pull the following sets of data:

**Overall Views (by day/week/month)**

| Date    | Views |
| -------- | ------- |
| July 2023  | 1343    |
| August 2023 | 1235     |

(and so on)

To allow the date partition to always be expressed as a date, we could just make it the day, the first day of the week, or the first day of the month for the different sets of data, so I'll add a 'date type' column.

| Date Type | Date    | Views |
| ------- | -------- | ------- |
| Day | July 1, 2023  | 60    |
| Day | July 2, 2023  | 43    |
| Day | July 3, 2023  | 57    |
| Month | July 1, 2023  | 1343    |
| Month | August 1, 2023  | 1235    |


**Views by page (by day, week, month)**

| Date Type | Date  | Path | Views |
| ------- | ------- | -------- | ------- |
| Day | July 1, 2023 | /blog/post1  | 2    |
| Day | July 1, 2023  | /blog/post2 | 4    |
| Day | July 2, 2023  | /blog/post1 | 5    |
| Month | July 1, 2023  | /blog/post1 | 97  |

**Views by referral source (by day, week, month)**

| Date Type | Date  | Source | Views |
| ------- | ------- | -------- | ------- |
| Day | July 1, 2023 | Google  | 6    |
| Day | July 1, 2023  | LinkedIn | 4    |
| Day | July 2, 2023  | Google | 5    |
| Month | July 1, 2023  | Reddit | 97  |

That’s enough to start with, it will result in a few different tables, because I want to store the data already calculated and in the formats I want to view it in. We’ll have a `ViewEvents` table as well, to store the original requests, and that’s the first step.

I was going to build this using Azure Table Storage but reading up on the current state of things in Azure, it seems that [Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/) would be a better technology. It supports SQL-style queries, which will make it easier to generate all the different calculated views I have described above.

My first Function pushed a message onto a Queue, so this one will be triggered by that message, do some more processing on it (work I wanted to avoid doing in the first Function, since it should be as fast as possible), and then insert a record into the `ViewEvents` container in CosmosDB.

```csharp
[FunctionName("ProcessEvent")]
public static async Task processEvent(
    [QueueTrigger(
        analyticsEvent,
        Connection = "AZURE_STORAGE_CONNECTION_STRING")
    ] string queueMessage,
    ILogger log)
{
    RequestRecord request
        = JsonSerializer.Deserialize<RequestRecord>(queueMessage);

    if (request != null)
    {

        //skipping country name lookup & simplifying referrer

        string cosmosEndpoint
            = Environment.GetEnvironmentVariable("CosmosEndpointUri");
        string cosmosKey
            = Environment.GetEnvironmentVariable("CosmosPrimaryKey");

        DataStorage data = new DataStorage(cosmosEndpoint, cosmosKey);

        await data.Init();
        await data.CreateRequestItem(request);
    }
}
```

The code above is missing a few pieces for simplicity, but I’ll go through them individually.

### Looking up the country name

I skipped it in the code snippet above, but I’m adding a calculated field alongside the raw data for ‘country’ determined with an IP lookup.

```csharp
if (request.country == null)
{
    var maxMindAccountID
        = Environment.GetEnvironmentVariable("MaxMindAccountID");
    var maxMindLicenseKey
        = Environment.GetEnvironmentVariable("MaxMindLicenseKey");
    int accountID = int.Parse(maxMindAccountID);
    using (var client
        = new WebServiceClient(accountID, maxMindLicenseKey,
        host: "geolite.info"))
    {
        var country = await client.CountryAsync(request.ip_address);
        request.country = country.Country.IsoCode;
        request.countryName = country.Country.Name;
    }
}
```

I’m using the free version of [MaxMind’s GeoIP product](https://dev.maxmind.com/) through a web service, and their .NET library, to do that IP to country mapping.  Once that’s done, I don’t need the IP address anymore, and because it can be considered personally identifying information (PII) I’d rather not keep it around. For now, I’ll leave it there, because I’m not confident in my system until I’ve seen it run for a bit. Eventually though, I’ll either avoid storing it altogether at this step, or write a system that goes back after a few weeks and removes that value.

### Simplifying the referrer

I know I’m going to want to eventually aggregate data by referrer (the URL where the visitor found a link to my site), and for reporting I prefer to reduce a wide variety of domains (google.ca vs. google.com for example) down to a human readable value. Before saving the request to the container, I have a simplification step. This would be better with a data file full of patterns to match, or even a [user-defined function in Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-write-stored-procedures-triggers-udfs?tabs=javascript#udfs), because I keep updating this code.

```csharp
if (!String.IsNullOrEmpty(request.referrer))
{
    request.simple_referrer
        = FunctionsHelpers.SimplifyReferrer(
request.referrer);
}
```

And the SimplifyReferrer function

```csharp
public static string SimplifyReferrer(string referrer)
{
    Uri uri;

    if (Uri.TryCreate(referrer, UriKind.Absolute, out uri))
    {
        string host = uri.Host.ToLower();

        if (host.Contains("reddit."))
        {
            return "Reddit";
        }

        if (host.Contains("linkedin."))
        {
            return "LinkedIn";
        }

        if (host.Contains("google."))
        {
            return "Google";
        }
        // more clauses added here as I think of them

        return host;
    }

    if (referrer == "android-app://com.slack/")
    {
        return "Slack";
    }
    return null;
}
```

I’m sure I’ll add more little bits of code into this function over time, but [the full production version is always available at GitHub]( https://github.com/Duncanma/PhotoWebhooks/blob/main/AnalyticsFunctions.cs).

## Creating the summary data

At this point, I push my site changes live, so the image tag and associated script are out in production. It’s a low traffic site, so there isn’t a flood of data, but once I have a few hundred records in there I can start working on the next phase. Individual requests (views) are the core piece of data, but what you really want to see is aggregate information. How many views per day, for example, or views of a specific page.

I will go through all the pieces for ‘views per day’, but the same pattern would be repeated for each desired set of data. First, I work against the ViewEvents table to create a query that gets the data I want using the CosmosDB Data Explorer

![CosmosDB has a data explorer where you can view items in each container, and try out queries](/images/homegrown/data-explorer.png)

The SQL-like syntax is unique enough that it takes me a bit of futzing around, but I end up with:

```sql
SELECT 'day' as dateType, c.day as id,
  count(1) as views FROM c
  GROUP BY c.day
  ORDER by c.day
  offset 0 limit 3
```

Which pulls views for the past few days. I’ve decided to share a single container for all views by day/week/month, using this class as the structure.

```csharp
public class ViewsByDate
{
    public string dateType { get; set; } //partition key
    public string id { get; set; } //date
    public string views { get; set; }
}
```

`dateType` will be one of day/week/month and be the partition key, while the date itself will be the unique `id` within that partition. (You can learn more [about CosmosDB partitions and how to choose them]( https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview) over on the Microsoft site)

> You’ll notice that both dates are numbers are stored as strings, which is just the nature of CosmosDB, all data is stored as a string or a boolean.

I’m going to create another Azure Function, this one on a timer trigger (so that it runs every day at a specific time), but I’ll start with the code to do the query and push the view data into a new container (ViewsByDate).

```csharp
public async Task GetAndSaveViewsByDate(string dateType)
{
    string query = "";
    if (dateType == "day") {
        query = "SELECT 'day' as dateType, c.day as id, " +
            "count(1) as views FROM c GROUP BY c.day " +
            "ORDER by c.day offset 0 limit 3";
    }

    using (FeedIterator<ViewsByDate> feedIterator
        = this.c_viewEvents.GetItemQueryIterator<ViewsByDate>(
        query))
    {
        while (feedIterator.HasMoreResults)
        {
            FeedResponse<ViewsByDate> response
                = await feedIterator.ReadNextAsync();
            foreach (var item in response)
            {
                await this.c_viewsByDate.UpsertItemAsync(item);
            }
        }
    }
}
```

This only handles views by day right now, I’ll write new queries and extend it for weeks and months later.

My Azure Function is quite simple, because all the logic is in the `GetAndSaveViewsByDate` method.

```csharp
[FunctionName("ComputeViewsByDay")]
[FixedDelayRetry(5, "00:00:10")]
public static async Task ComputeViewsByDay(
    [TimerTrigger("0 30 3 * * *")] TimerInfo timerInfo,
    ILogger log)
{
    Console.WriteLine("ComputeViewsByDay");

    string cosmosEndpoint
        = Environment.GetEnvironmentVariable("CosmosEndpointUri");
    string cosmosKey
        = Environment.GetEnvironmentVariable("CosmosPrimaryKey");

    DataStorage data = new DataStorage(cosmosEndpoint, cosmosKey);

    await data.Init();
    await data.GetAndSaveViewsByDate("day");
}
```

The [timer trigger syntax]( https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=python-v2%2Cisolated-process%2Cnodejs-v4&pivots=programming-language-csharp#ncrontab-expressions) of `0 30 3 * * *` means this should run at 3:30 am every day, UTC time. I will eventually create similar queries and functions to calculate views by page, views by referrer, views by country, etc. For now, this is enough for basic analytics, I just need a way to visualize the data.

## Sending myself an update every day

I decided that a ‘last 7 days’ report would be a good daily summary, which is available by just grabbing the last seven records from the ViewsByDate table.

```csharp
public async
  Task<Dictionary<string, string>>
  GetViewsByDay(int days)
{
    Dictionary<string, string> results
        = new Dictionary<string, string>();

    string query = "SELECT c.dateType,c.id,c.views " +
        "FROM c WHERE c.id > @firstDay ORDER by c.id";

    QueryDefinition q = new QueryDefinition(query)
        .WithParameter("@firstDay",
        DateTimeOffset.Now.AddDays(days)
        .ToString("yyyyMMdd"));

    using (FeedIterator<ViewsByDate> feedIterator
        = this.c_viewsByDate.GetItemQueryIterator
            <ViewsByDate>(q))
    {
        while (feedIterator.HasMoreResults)
        {
            FeedResponse<ViewsByDate> response
                = await feedIterator.ReadNextAsync();

            foreach (var item in response)
            {
                results.Add(item.id, item.views);
            }
        }
    }

    return results;
}
```

I created a new Azure Function, also on a timer, that would take this data, turn it into a HTML table, and email it to me once a day.

```csharp
[FunctionName("SendDailySummary")]
[FixedDelayRetry(5, "00:00:10")]
public static async Task SendDailySummary(
    [TimerTrigger("0 0 5 * * *")] TimerInfo timerInfo,
    ILogger log)
{
    string cosmosEndpoint
        = Environment.GetEnvironmentVariable(
            "CosmosEndpointUri");
    string cosmosKey
        = Environment.GetEnvironmentVariable(
            "CosmosPrimaryKey");

    DataStorage data = new DataStorage(cosmosEndpoint, cosmosKey);

    await data.Init();
    var results = await data.GetViewsByDay(-7);

    string connectionString
        = Environment.GetEnvironmentVariable(
            "EmailServiceConnectionString");

    var emailClient = new EmailClient(connectionString);

    var currentDateTime = DateTimeOffset.Now.ToString("f");

    StringBuilder htmlResults = new StringBuilder();
    StringBuilder plainResults = new StringBuilder();

    string chartURL = Charting.Make7DayLineChart(results);

    htmlResults.Append("<table><thead><tr>" +
        "<th scope='col'>Date</th><th scope='col'>Views</th>" +
        "</tr><tbody>");

    plainResults.Append("Date, Views\n");

    foreach (var row in results)
    {
        htmlResults.Append($"<tr><td>{row.Key}</td>" +
            $"<td>{row.Value}</td></tr>");

        plainResults.Append($" - {row.Key}, {row.Value}\n");
    }

    htmlResults.Append("</tbody></table>");
    plainResults.Append("\n\n");

    string htmlMessage = "<html><body><h1>Site Stats</h1>" +
        $"<p>Stats as of {currentDateTime}</p>" +
        "<p><img style='background-color:white' " +
        $"src='{chartURL}' width=800 height=300></p>"
        + htmlResults.ToString() + "</body></html>";

    string plainMessage = "Site Stats\n\n" +
        $"Stats as of {currentDateTime}\n\n" +
        plainResults.ToString() + "\n\n"
        + $"Chart available at: {chartURL}";

    EmailRecipients recipients = new EmailRecipients();

    recipients.To.Add(
    new EmailAddress(
        Environment.GetEnvironmentVariable(
        "SendAnalyticsReportsTo"),
        Environment.GetEnvironmentVariable(
        "SendAnalyticsReportsName")));

    EmailContent content = new EmailContent("Site Stats");
    content.PlainText = plainMessage;
    content.Html = htmlMessage;

    EmailMessage messageToSend
        = new EmailMessage(
        "DoNotReply@messaging.duncanmackenzie.net",
        recipients, content);

    await emailClient.SendAsync(
        WaitUntil.Started, messageToSend);
}
```

This works, but it’s a little boring.

![A simple table view of date + data](/images/homegrown/boring.png)

I did some more digging around and found [Quick Charts](https://quickchart.io/documentation/), which lets me construct a chart using their .NET SDK, and get a URL that I can stick into my email. The full source code involved is up in [my GitHub repo](https://github.com/Duncanma/PhotoWebhooks/blob/main/Charting.cs), but the result is definitely more pleasing.

![A line graph showing daily views as labels along the curve](/images/homegrown/chart.png)

I should probably exclude the current day, since it will always seem like a sharp drop with only 5 hours of data.

## What’s next?

So much.

- I should create a web page online with my most recent stats, so I can go and check it out instead of just relying on daily summary emails.
- I need to write all the other aggregation code by week, month, referrer, country, new vs returning, browsers, page, etc.
- I would like to add in some ‘comparison’ to previous period, so that I can see if one week has 20% more traffic than the previous and similar information.
- I **must** go back and clear out the IP address once I’ve done the country lookup.
- And probably much more.

While the hosting of the functions and data is costing me pennies per day, this has taken quite a few hours to code up. Just paying someone like Plausible would be more cost effective (and end up with more features), but my personal time is free. This is enjoyable, so it’s not really intended to save me money. If you have the need to do analytics **without** using any third-party though, an approach like this could be suitable.
