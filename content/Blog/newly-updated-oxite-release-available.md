---
date: 2009-02-16T16:55:02+00:00
title: Newly updated Oxite release available
type: posts
tags:
 - CMS
 - Oxite
 - Blogging
 - Microsoft
---
[Erik](http://erikporter.com/) pushed out [a new release to Oxite](http://www.codeplex.com/oxite/Release/ProjectReleases.aspx?ReleaseId=23315) today, the first since January 5th. This release is an important one, because it reflects a great deal of changes made in response to internal and external feedback about our initial release.

From the release notes:

> We made many [improvements](http://www.codeplex.com/oxite/Wiki/View.aspx?title=architecture&referringTitle=Home), some based on community feedback, and added new features in this release:
>
>   * New Model, Services and Repositories
>   * Dependency Injection (Routes, Controllers, Services, Repositories, etc)
>   * ActionFilter Registry
>   * Better test coverage
>   * New validation class added
>   * Improved background services architecture
>   * Projects cleaned up and consolidated
>   * Views cleaned up
>   * No more \*.cs or \*.cs.designer for views in web project
>   * Now works in a sub directory
>   * New admin dashboard
>   * New and update (from last version) SQL scripts included
>   * Many other small features, improvements and bug fixes

A lot of work went into these changes; they were the primary focus of [Erik](http://erikporter.com/), [Sampy](http://sampy.com/) and [Nathan](http://nathan.heskew.com/) for the past 4+ weeks. [Unity](http://codeplex.com/Unity) was implemented to provide Dependency Injection, [xUnit](http://codeplex.com/xunit) was used as the test runner to remove a dependency on the higher level SKUs of Visual Studio, and a great deal of work was put into restructuring our data layer to completely abstract the Linq 2 SQL code from our actual objects. Like most software projects, there is always more work that could be done, and we will be making changes and additions as we continue to use this code for our work projects and for our personal sites.

If you are looking for more about Oxite, [the discussions, issues and wiki pages on Codeplex](http://codeplex.com/oxite) are a great source of information and you can always post a comment right here and ask me your question
