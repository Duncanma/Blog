# Homegrown Analytics Dashboard

This document covers the v1 dashboard integration between the blog UI and the `PhotoWebhooks` analytics APIs.

## Overview

- Dashboard page path: `/analytics-dashboard/`
- Hugo layout: `themes/hello-friend-ng/layouts/_default/analytics.html`
- Frontend logic: `themes/hello-friend-ng/assets/js/analytics-dashboard.js`
- API base URL config: `params.analyticsApiBase` in `config.toml`
- Backend endpoints (PhotoWebhooks):
  - `/api/stats/timeseries`
  - `/api/stats/top-pages`
  - `/api/stats/referrers`
  - `/api/stats/countries`
  - `/api/stats/segments`

## Auth Model (v1)

Stats endpoints require a shared secret sent in `X-Analytics-Secret`.

- Env var in Azure Functions: `AnalyticsDashboardSecret`
- Header sent by dashboard JS: `X-Analytics-Secret: <secret>`

The page stores the secret in `localStorage` after first entry so it does not need to be retyped every refresh.

## API Query Parameters

Common:

- `start`: ISO date (`YYYY-MM-DD`)
- `end`: ISO date (`YYYY-MM-DD`)
- `limit`: positive integer (for ranked lists)

Timeseries:

- `grain`: currently `day`

## Backend Scheduling

The following timer jobs keep aggregate containers current:

- `ComputeViewsByDay`
- `ComputeViewsByPathByDay`
- `ComputeViewsByReferrerByDay`
- `ComputeViewsByCountryByDay`

## Notes

- Stats endpoints are `AuthorizationLevel.Anonymous` and rely on the shared secret guard.
- The original tracking pixel endpoint (`/api/event`) is unchanged.
