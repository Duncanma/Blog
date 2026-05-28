function ymd(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function withStatus(el, message, isError = false) {
  el.textContent = message;
  el.classList.toggle("error", isError);
}

function toQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      q.set(k, String(v));
    }
  });
  return q.toString();
}

function renderTable(tbody, rows, keyName = "key") {
  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2">No data</td></tr>`;
    return;
  }
  tbody.innerHTML = rows
    .map((row) => `<tr><td>${row[keyName]}</td><td>${row.views}</td></tr>`)
    .join("");
}

function buildLinePath(points, width, height, padding) {
  if (!points || points.length === 0) return "";
  const max = Math.max(...points.map((p) => p.views), 1);
  const min = Math.min(...points.map((p) => p.views), 0);
  const xSpan = Math.max(points.length - 1, 1);
  const ySpan = Math.max(max - min, 1);

  return points
    .map((p, idx) => {
      const x = padding + (idx / xSpan) * (width - padding * 2);
      const y = height - padding - ((p.views - min) / ySpan) * (height - padding * 2);
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function renderTrend(svg, points) {
  const width = 720;
  const height = 240;
  const padding = 20;
  const path = buildLinePath(points, width, height, padding);
  if (!path) {
    svg.innerHTML = "";
    return;
  }

  const max = Math.max(...points.map((p) => p.views), 1);
  const min = Math.min(...points.map((p) => p.views), 0);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `
    <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" />
    <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" />
    <path d="${path}" />
    <text x="${padding + 4}" y="${padding + 12}">max: ${max}</text>
    <text x="${padding + 4}" y="${height - padding - 6}">min: ${min}</text>
  `;
}

async function fetchStats(baseUrl, endpoint, secret, params = {}) {
  const qs = toQuery(params);
  const url = `${baseUrl.replace(/\/$/, "")}/${endpoint}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    headers: {
      "X-Analytics-Secret": secret,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

async function runDashboard(root) {
  const apiBase = root.dataset.apiBase;
  const secretInput = root.querySelector("#analyticsSecret");
  const startInput = root.querySelector("#analyticsStart");
  const endInput = root.querySelector("#analyticsEnd");
  const loadBtn = root.querySelector("#analyticsLoad");
  const status = root.querySelector("#analyticsStatus");

  const trendSvg = root.querySelector("#analyticsTrend");
  const topPagesBody = root.querySelector("#analyticsTopPages tbody");
  const referrersBody = root.querySelector("#analyticsReferrers tbody");
  const countriesBody = root.querySelector("#analyticsCountries tbody");
  const segmentsSummary = root.querySelector("#analyticsSegmentsSummary");
  const browsersBody = root.querySelector("#analyticsBrowsers tbody");
  const devicesBody = root.querySelector("#analyticsDevices tbody");

  const savedSecret = window.localStorage.getItem("analytics-dashboard-secret") || "";
  if (savedSecret) secretInput.value = savedSecret;

  const now = new Date();
  const before = new Date();
  before.setDate(now.getDate() - 30);
  startInput.value = ymd(before);
  endInput.value = ymd(now);

  async function loadData() {
    const secret = secretInput.value.trim();
    if (!secret) {
      withStatus(status, "Enter analytics secret first.", true);
      return;
    }

    const start = startInput.value;
    const end = endInput.value;
    withStatus(status, "Loading...");
    loadBtn.disabled = true;
    try {
      window.localStorage.setItem("analytics-dashboard-secret", secret);

      const [trend, pages, referrers, countries, segments] = await Promise.all([
        fetchStats(apiBase, "timeseries", secret, { grain: "day", start, end }),
        fetchStats(apiBase, "top-pages", secret, { start, end, limit: 20 }),
        fetchStats(apiBase, "referrers", secret, { start, end, limit: 20 }),
        fetchStats(apiBase, "countries", secret, { start, end, limit: 20 }),
        fetchStats(apiBase, "segments", secret, { start, end, limit: 10 }),
      ]);

      renderTrend(trendSvg, trend);
      renderTable(topPagesBody, pages);
      renderTable(referrersBody, referrers);
      renderTable(countriesBody, countries);
      renderTable(browsersBody, segments.browsers || []);
      renderTable(devicesBody, segments.devices || []);

      segmentsSummary.innerHTML = `
        <li>New visitors: ${segments.newVisitors || 0}</li>
        <li>Returning visitors: ${segments.returningVisitors || 0}</li>
        <li>JS enabled: ${segments.jsEnabled || 0}</li>
        <li>No JS: ${segments.noJs || 0}</li>
      `;

      withStatus(status, `Loaded ${start} to ${end}.`);
    } catch (err) {
      withStatus(status, `Load failed: ${err.message}`, true);
    } finally {
      loadBtn.disabled = false;
    }
  }

  loadBtn.addEventListener("click", loadData);
  loadData();
}

const root = document.getElementById("analyticsDashboard");
if (root) {
  runDashboard(root);
}
