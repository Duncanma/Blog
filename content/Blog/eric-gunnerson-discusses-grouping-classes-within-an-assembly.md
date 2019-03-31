---
date: 2004-06-26T09:36:00+00:00
title: Eric Gunnerson discusses grouping classes within an assembly...
type: posts
---
As a big fan of components, my applications are often composed of many different assemblies... essentially I break out anything that seems 'ready to reuse'... but perhaps I should reconsider?

> **[_Grouping classes in an assembly_](http://blogs.msdn.com/ericgu/archive/2004/06/24/164985.aspx){#_7edcfc09107_HomePageDays_DaysList__ctl1_DayItem_DayList__ctl0_TitleUrl}**
>
> _This useful bit of information crossed my desk today:_
>
> _When it comes to packaging in separate assemblies, remember that you pay a fairly large performance hit on an assembly load. An assembly should really be considered a unit of security control, independent versioning, or contribution from disparate sources. You might consider placing code in a separate assembly if it is used **extremely rarely**, but probably not._
>
> [_continued in the full post..._](http://blogs.msdn.com/ericgu/archive/2004/06/24/164985.aspx)
