---
date: 2024-05-22T08:14:18-07:00
title: Visual Regression Testing using Playwright and GitHub Actions
description: Every update to your site introduces the possibility of introducing an unintended bug, but automated testing can catch what your own checks don't spot.
type: posts
tags:
 - Web Development
 - Coding
 - Testing
 - DevTo
featured: true
---

This last weekend I was visiting my mom up in Canada, and she asked me for the URL to my website because she wanted to see all [my recent photos](/albums/). She brought it up on her laptop, and for the first time in months, I saw my site in ‘light’ mode. And there was a flaw in how some of the text was rendered. I, like many developers, have been only doing the simplest form of testing, which is to view my site in my own primary browser on my own machine. The site switches automatically to light or dark based on the settings of the user’s OS, and **in my case that is always dark mode**. I quickly checked in a fix, after switching my own OS settings to light mode and then going through and testing a few of the pages. Later, I did *more* extensive testing in light mode and found some color contrast issues as well.

Hmph. How embarrassing.

I realized I needed a better solution, to catch unintended bugs introduced as I update the styles and layout of my site. I could just promise myself that I would test all my future changes in multiple browsers, in both color schemes, and on a few mobile devices as well, but none of that is easy or even likely to happen.

## What I needed was Visual Regression Testing

This form of testing is an automated way to test the rendered appearance of your site (or application) in a variety of situations, against a baseline set of images. After each change you make, new images are generated and if there is a difference between the new images and the baseline, these tests will fail. If you run visual regression testing as part of a CI (continual integration) process, this would block deployment into production. If it turns out the change is intentional (if I changed my site’s CSS for example), then I can generate new baseline images and the next run of the tests will succeed.

I had recently been looking at [a cool project that generated screenshots of someone’s personal website every day](https://alexwlchan.net/2024/scheduled-screenshots/), so I knew that Playwright, in a GitHub action, could at least get me part of the way to a solution. A few minutes later, I found the docs and [exactly the info I needed]( https://playwright.dev/docs/test-snapshots).  The installation steps for Playwright even included [creating a basic GitHub action](https://playwright.dev/docs/ci-intro) that would run on every push or pull request. It was all so easy, that I had screenshots being generated within 30 minutes of starting to investigate the idea.

## Building a solution using Playwright and GitHub actions

Fine tuning everything to get exactly the results I wanted took many test runs and check ins, but I’ll go through each step here and maybe it will save you some time in the future.

First, I wanted to test dark and light mode, as that was the exact issue I ran into, so in the playwright config file (`playwright.config.ts`), I defined a copy of each browser with the addition of `colorScheme: ‘dark’`.

```javascript
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium dark',
      use: { ...devices['Desktop Chrome'], colorScheme: 'dark' },
    }
  ],
```

I then made about 10 tests, that covered all sorts of page types, each of which was a simple ‘visit this page and take a screenshot’.

```javascript
test('Visual Diff Small Album', async ({ page }) => {
    await visualDiff(page, '/albums/fall-trail-walk/');
});

async function visualDiff(page: Page, url: string) {
    await page.goto(url);
    await expect(page).toHaveScreenshot({ fullPage: true });
}
```

To get these to work, I added a config section to start up Hugo’s built in web server and set up the default base URL to match.

```javascript
  /* Shared settings for all the projects below.
      See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:1313',
  },
/* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:1313',
    reuseExistingServer: !process.env.CI,
  },
```

and setup my list of browsers with chromium, firefox, webkit, mobile chrome, and mobile safari (plus dark mode variations of them all). Running them locally (`npx playwright test`) generated baseline images (stored in a `<test file name>-snapshots` folder next to the test) and then running it from that point on would compare the new results against the baseline (and fail if they were different).

That was it. I honestly thought I was done at this point, so I did a commit and pushed the results up to GitHub.

### Matching the OS of your test runner with your local dev environment

The new GitHub action ran automatically even on the push that added it, and it failed. All of the tests ran on the server, and failed with the error that no baseline images existed. The issue was that, in the GitHub action definition (yml file), it specified that the tests should be run on an ubuntu linux runner (the cloud virtual machine used to run the tests), and when that happened, it was looking for files like `<test name>-1-<browser>-linux.png`. I generated the baselines by running the tests on my Windows machine, so the baseline images had filenames like `<test name>-1-<browser>-win32.png`. You could fix this by creating unique filenames per test and passing that into ` toHaveScreenshot`, so that they would match regardless of the OS used, or you could do like I did and change the OS of my GitHub action to windows-latest to have the CI tests run on a machine with the same OS as my local.

```yaml
jobs:
  test:
    timeout-minutes: 60
    runs-on: windows-latest
    steps:
```

I pushed that change up, and the newly updated action ran automatically.

And failed again, this time with an actual visual difference instead of just an error message. Each failed test run produces a zip file version of Playwright’s HTML based report, so I could download it and see the issue.

![The red marks in the Diff view show any pixels that have changed](/images/visual-regression/githubinfo-diff.png)

### Hiding parts of your page that change all the time

All my pages have a little bit of info below the content, the most recent github commit that led to this specific build of the site. This string, the commit ID, is going to change all the time, so that’s a problem. You can set the % of difference that is acceptable between screenshots, so I could fix this by setting it to be ok with a small % difference, but that would also mean that a small difference in some other part of the site layout would be ignored. Another option, which is provided by Playwright, is to [supply a special bit of CSS]( https://playwright.dev/docs/test-snapshots#stylepath) to hide volatile elements when taking screenshots.

I made this CSS file, which hides the github commit string, and modified my tests to include it.

```css
.gitinfo {
    display: none;
}
```

```javascript
async function visualDiff(page: Page, url: string) {
    await page.goto(url);
    await expect(page).toHaveScreenshot({
        fullPage: true, stylePath: "tests/screenshot.css" });
}
```

Once again, with everything working fine locally, I pushed my changes up and waited confidently for the tests to run. As a side note, each run of these tests, with all the browsers was taking a long time, over 10 minutes. I decided to look at improving that once I had everything working.

### Ensuring your time zones match

Well, you can imagine, the tests failed. Not on the about page, but on one of my blog posts. Turns out the image taken on the server was showing June 4th, while my baseline was June 5th. My blog posts have a UTC published date & time, but display it using the browser's local settings. Depending on the timezone of the machine they are viewed on, you could see a different day.

![Using the slider view to show the actual vs. expected](/images/visual-regression/slider_1.png)

![Using the slider view to show the actual vs. expected](/images/visual-regression/slider_2.png)

Turns out there is a fix for that too, I can set the timezone in the Playwright config file.

```javascript
  /* Shared settings for all the projects below.
    See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:1313',
    timezoneId: "America/Los_Angeles",
    trace: 'on-first-retry',
  },
```

By setting it to my timezone, Pacific time, the server should match my locally generated baselines. I committed this change and pushed it up. Still oddly optimistic this was going to be successful.

### Handling lazy loaded images

It wasn’t. The git commit was hidden, the dates on the page matched, but it turns out the images in my blog posts were rendering inconsistently. There were two issues causing this, one was that loading images can take a moment, so the test needed to wait longer, and the other was that my images are set to `loading=lazy`, which means without anyone scrolling them into view, they wouldn’t even try to load.

<image>

A few Google searches found some similar issues, and I was able to add a quick ‘find all images and scroll to each one’ bit of code. I could also explicitly write code to wait for the images to be ready, but that didn't seem to be necessary, so I went with just this.

```javascript
async function visualDiff(page: Page, url: string) {
    await page.goto(url);
    // Trigger loading of all images
    for (const img of await page.locator('//img').all()) {
        await img.scrollIntoViewIfNeeded();
    }
    await expect(page).toHaveScreenshot({
        fullPage: true, timeout: 10000,
        stylePath: "tests/screenshot.css" });
}
```

Surprisingly, that was the final issue. Everything worked exactly as planned with this last change. The tests were still taking a long time though, and I knew that would be annoying when I wanted to do a content update.

## It works, but it could be better

With everything working I started to look at a few issues that occurred to me while I was running these tests over and over again.

### Making a minimal set of tests for your CI build

First, the set of tests was taking way too long.  This is definitely a judgement call, more tests mean more coverage in terms of catching issues, but when I update content I often want to check my site until I can see the deployment happened without any issues. Right now, the wait is already about 4-5 minutes for the build and deploy, adding 10+ more minutes was not appealing.

To reduce the time, I created a smaller set of tests (`minimum.spec.ts`) and modified the GitHub action to run just those tests and just against two browsers (chromium and chromium dark). This reduces the time to just a few minutes, but I’m testing fewer pages on fewer browsers.

```yml
- name: Run Playwright tests
  run: npx playwright test minimum.spec.ts
      --project 'chromium' --project 'chromium dark'
```

### Don’t bother running these tests if only content has changed

It occurred to me that, for a pure content update (a new blog post or new photo album), there was no need to run these tests at all. They are currently designed to hit pages that don’t change as I publish content and are testing layout/style issues, so if I’m just adding a new post, this is just a waste of time. Luckily GitHub actions has a nice configuration option of `ignore-paths` that lets me specify a pattern (`content/**` in my case) that shouldn’t trigger the action. If I make a change to anything outside of that pattern, the tests will still run, even if content is updated at the same time, so it is all good.

```yaml
on:
  push:
    branches: [ main, master ]
    paths-ignore:
      - 'content/**'
  pull_request:
    branches: [ main, master ]
    paths-ignore:
      - 'content/**'
```

> Ok, so now the length of the test is less of an issue when I’m updating content. This has me wondering if I should go back to a broader set of tests on more browsers. Something to look at in the near future.

### Testing interactions

My site is boring, not much JavaScript and few clickable elements beyond links, but I do have [a feature on my photo gallery pages that shows or hides a ‘buy’ button on a click]( /blog/adding-e-commerce-to-my-galleries/). The bug that started this whole journey was with one of those buy buttons, so I need to test them. Fortunately, Playwright is primarily designed for doing automated web testing, so clicking a button and waiting for the page to change is all built-in.

```javascript
    await page.click("#gallery > div.availableForPurchase");
    await page.waitForSelector("body.showBuyButtons");
    await expect(page).toHaveScreenshot(
        screenshot, { fullPage: true, timeout: 50000,
        stylePath: "tests/screenshot.css"});
```

I have other features, like image lightboxes, that could be tested if I want to increase the coverage of my tests.

## What’s next?

This is a really limited set of tests, only covering a few types of content, and not testing key features like my home page. Right now, I’m doing this limited amount of coverage because I’m hitting my live content. Pages like [my Blog post list](/blog/), [my homepage](/), or [tag pages](/tags/), would be changing all the time and would keep causing the tests to fail. The *right* way to handle this would be to set up a test configuration, that rendered all the same pages, but with a static set of content. Then I could test every single layout or markdown element, with no worries that content updates would invalidate the results.

Instead of doing nothing until I could do things the ‘right way’ though, the current set of tests is a great start. It was completely free, it took about 3 hours of work start-to-finish, and I’m slightly less likely to unintentionally break my website. **I’d call that a win**.
