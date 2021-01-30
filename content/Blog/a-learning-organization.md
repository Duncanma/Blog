---
date: 2020-09-13T17:28:00-08:00
title: A Learning Organization
type: posts
tags:
- Team
- Software Management
description: Learning from our mistakes is what makes a team into a 'learning organization'
featured: true
---
A while ago, someone commented to me that their group was a 'learning organization' and that was why they encouraged ongoing training, arranged bootcamps, lunch and learns etc. I am very supportive of ongoing formal and informal training, but I realized that this was completely not what I have had in mind when I described **our team** as a learning organization.

The nature of software, and likely all forms of work, is that things go wrong. **All the time**. This can be small, like getting stuck on a bug for a few hours, or a minor issue being shipped to production, or it can be huge like deleting a ton of records in a production database and having to restore from a backup (that was me). In every case, my idea of a learning organization is **one that focuses on what we learned from the incident and the improvements that come from it**.

You can take this as obvious, we should learn from our mistakes, but it is very noticeable when it is happening or not happening at an organizational level. When something goes wrong, we should have two key priorities. First, we have to fix the issue if it is ongoing. Debating **why** something happened, or who is responsible, when something is actively occurring is not helpful. Second, and this is the absolute key quality of a learning engineering team, we need to figure out what we should do to prevent this type of issue happening again.

We formalize our learning in repair items when it is a big issue like an outage, but we should also be learning from our small mistakes. Maybe we needed better unit tests, or we need to build a system for integration testing, or maybe we just need to learn to slow down and review our own code. When I see something go wrong, I often ask why it happened, and sometimes that results in apologies and people 'taking the blame'. I don't mind that, an apology is a way of showing you understand the impact of your mistake, and taking the blame (when it is due) is **way** better than pointing at someone else or acting like it was unavoidable. It isn't what I'm after though.

My goal in asking the question, is to understand what we learned, and ideally to get a list of what we're going to change in our process or system to avoid it happening again. For the most part, in our team, everyone asks that question themselves. My job is to make space for the repair work, to make it clear that it is important, and to ensure that making things better after an issue is to be celebrated. If every issue leads to work to prevent future occurrences, our underlying system quality will be steadily increasing.

So, yes, it is awesome when a team takes time for training. Support for ongoing learning should be part of the culture, but the key to getting better day over day is to ensure that every mistake turns into improvement.
