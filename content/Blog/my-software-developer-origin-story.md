---
date: 2025-05-14T13:52:06-07:00
title: My software developer origin story
type: posts
tags:
- Coding
- Personal
description: Creating a tool to help my parents and discovering the joy of creating something useful started me down the path of working in software.
---
Over the years, many people have asked me how I got started into software development and I have told the *same* story every time, but I realized I’ve never written it down. So, for anyone who might find this interesting or useful, and just to put it out into the world, here goes.

Back when I was in high school, in the 1980s, my parents purchased a Commodore 64 (C64). This wasn’t specifically for me, it was primarily for my mother. In her role as a special education coordinator for the school division, she had to write up many reports on students, lesson plans, and documentation for government grants. At work, she had a typewriter but was extremely interested in the idea of a word processor. Being able to draft and edit electronically, reuse content from past reports or proposals, and just store content digitally were all amazing productivity improvements. Of course, bring a computer into the house where a young geek lived, and I was immediately interested. I had to compete with my mom, she had [PaperClip](https://en.wikipedia.org/wiki/PaperClip), and I had [Mail Order Monsters](https://en.wikipedia.org/wiki/Mail_Order_Monsters), [Ultima](https://en.wikipedia.org/wiki/Ultima_IV:_Quest_of_the_Avatar), and [Pool of Radiance](https://en.wikipedia.org/wiki/Pool_of_Radiance). With BASIC built-in to the C64 operating system, coding was a natural way to spend time on the machine as well, starting with printing your own name 100s of times on the screen.

```basic
10 PRINT "DUNCAN"
20 GOTO 10
```

Eventually I started making more complex programs, but it was just random playing around with no purpose. At that point, I couldn’t understand why anyone would do this seriously, other than to make games.

Around this time, my parents were starting to plan their retirement savings, and they would work on the dining room table… just across the room from the computer desk. They had pads of paper and were trying to calculate how much they’d have saved at a given age, saving a certain amount per year, and assuming a rate of return. Today, given the internet, you could find [an online calculator](https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator) to do all this work for you, and even some that will calculate your annual retirement income, but they didn’t have anything like that. Instead, they were trying to manually add in each year’s growth, to include compound interest, filling up the paper with calculations for 20, 25, 30 years… saving different amounts… and they weren’t enjoying it at all. All that math, done on a little calculator, with inevitable mistakes, seemed to be leaving them frustrated and not feeling any closer to a plan about their savings.

I realized that a computer program could really help, and I started writing one up. The result was a terminal application, they would enter in their current savings (P), a # of years (Y), an amount to contribute per year (C), and an estimated yearly rate of return (R). I don’t have the code anymore, but I suspect I wrote this as a loop, adding the contribution to the principal each year, then adding in the growth (the total multiplied by the rate of return). It is possible to do all this as a single calculation, but concepts like the ‘sum of [a geometric series](https://en.wikipedia.org/wiki/Geometric_series)’ were not in my toolbox at that time.

My parents sat at the computer for hours, trying out different combinations, with no frustration. They were excited and even had feature requests for me (could we see amounts for ages 55 through 65 each time as a list, could we see results assuming a lower or higher rate of return in each run, could you print the results, etc.).

I had created something, a tool, that was useful and continued to be useful for months. It was so clear to me that my couple of hours of work had saved them a huge amount of time, and that was the moment when I realized I wanted to write code for a living. To this day, I find myself most motivated by providing value through software or content directly to real people.