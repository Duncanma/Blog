---
date: 2024-06-09T15:13:27-07:00
title: Handling duplicate events from Stripe in your webhook endpoint
type: posts
tags:
 - Web Development
 - Coding
 - Stripe
 - Azure
 - DevTo
description: I added checks to avoid processing duplicate events in my Stripe webhook handler.
---
In my recent post, [detailing how I handle order fulfillment for my Stripe integration](/blog/order-fulfillment/), I missed an important part of reacting to Stripe webhooks. The documentation [explains that your endpoint may be called multiple times for a single event](https://docs.stripe.com/webhooks#handle-duplicate-events), but I don't handle that in my code.

> It also points out the **ordering** of events is not guaranteed, but that doesn't matter in my case since I'm only handling one event type.

## The issue with duplicate events

Every time I receive an event, my original implementation would push a new message into a queue and the order fulfillment would continue. If I receive a duplicate `CheckoutSessionCompleted` event, it isn't a terrible problem; a customer might receive multiple emails from me with their photo. Each one would be a slightly different link though and, in addition to looking sloppy, it could cause them to worry they were charged multiple times. In many scenarios, this could be a larger problem; shipping two physical items, or signing them up for multiple digital purchases.

For all of those reasons, I've updated my code. Now, when I receive an event, I check a CosmosDB container to see if I've handled this event ID before.

(from [Functions.cs](https://github.com/Duncanma/PhotoWebhooks/blob/main/Functions.cs))

```csharp
OrderData data = await CreateOrderData();

bool exists =
    await data.checkForExisting("checkoutComplete",
    order.SessionID);

if (!exists)
{
    await queueClient.SendMessageAsync(message);
}
else
{
    log.LogInformation(
        $"Duplicate Event: {order.EventID}");
}

await data.insertLogItem("checkoutComplete",
    order.SessionID, order.EventID, exists);
```

If so, I skip pushing a message into the incoming order queue and return a 200 OK result. If I **haven't** seen this event ID, I go ahead and push the message in and then log (`insertLogItem`) that I processed this event. I log when I see a duplicate as well, just in case I'm interested in the future.

This required adding a data storage class to my project, where I encapsulated all the initialization of Cosmos DB and handling both the check and insert steps.

(from [OrderData.cs](https://github.com/Duncanma/PhotoWebhooks/blob/main/OrderData.cs))

```csharp
public async Task insertLogItem(string functionName,
    string sessionID, string eventID, bool duplicate)
{
    LogItem item = new LogItem()
    {
        function = functionName,
        checkoutSessionID = sessionID,
        eventID = eventID,
        duplicate = duplicate
    };

    await this.c_functionLog.CreateItemAsync<LogItem>(
        item, new PartitionKey(functionName));
}
```

```csharp
public async Task<Boolean> checkForExisting(
    string functionName,
    string checkoutSessionID)
{
    string query = "SELECT c.id " +
        "FROM c WHERE c.checkoutSessionID =" +
        "@checkoutSessionID AND " +
        "c.function=@functionName";

    QueryDefinition q = new QueryDefinition(query)
        .WithParameter("@checkoutSessionID", checkoutSessionID)
        .WithParameter("@functionName", functionName);

    using (FeedIterator<LogItem> feedIterator
        = this.c_functionLog.GetItemQueryIterator<LogItem>(q))
    {
        if (feedIterator.HasMoreResults)
        {
            FeedResponse<LogItem> response
                = await feedIterator.ReadNextAsync();

            if (response != null && response.Count > 0)
            {
                return true;
            }
        }
    }
    return false;
}
```

This is not a perfect solution.

My Azure Function could be running on multiple threads (and/or servers), handling multiple requests at once, and therefore potentially posting duplicate messages.

I could avoid this by using a semaphore/locking mechanism, so that checking for an existing log entry, pushing the incoming order message, and adding a new log entry all happened as an isolated transaction. Doing this would reduce my Function's ability to handle a high load of requests though, and while I don't expect that to matter in my specific case, it seems like a bad pattern that someone may copy.

Instead, I'm going to go with a 'belt and suspenders' model (multiple preventative methods to avoid an issue), by adding another similar check to the second and third functions.

> I could also force these functions to process messages one at a time through some [configuration options](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue?tabs=isolated-process%2Cextensionv5%2Cextensionv3&pivots=programming-language-csharp#host-json). This would reduce their scalability, as discussed for the first function, but that is less of an issue for these stages in the order fulfillment.

Having written the **check** and **insert** as discrete functions makes it easy to repeat the pattern in each of the two other methods.

```csharp
OrderData data = await CreateOrderData();

bool exists = await data.checkForExisting(
    "processOrder", order.SessionID);

if (exists)
{
    log.LogInformation(
        $"Duplicate Event: {order.SessionID}");
    return;
}

//do all the work

await data.insertLogItem(
    "processOrder", order.SessionID,
    order.EventID, exists);
```

> Note that I had planned this in my head from the start of making these changes, which was why I used the function name as the partition key, and then the appropriate unique identifier as the id.

After adding these checks to the other functions, I will remove them from the initial HTTP handler. My goal with that webhook endpoint is to return as fast as possible, these data calls are quick but they still add time. Adding multiple entries to the incoming Order queue doesn't have any negative impact, as long as the `processOrder` function knows to skip duplicates.

## Wrapping up

These modifications have the positive side effect of giving me a nice, easy to read, log file of all the function executions.

![Three CosmosDB records showing all three functions running once each](/images/photo-gallery/eventlog.png)

As you build out your own webhook handlers, refer back to [the Stripe webhook documentation](https://docs.stripe.com/webhooks) for notes on this and other implementation details to be aware of.
