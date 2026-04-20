(function () {
  const mount = document.getElementById("mount-social") || document.body;
  mount.insertAdjacentHTML("beforeend", `
  <div id="social">
    <button id="toggle-btn-social">
      <span><i class="fas fa-sun"></i></span>
    </button>
    <div id="clock-social">GMT+8 00:00</div>

    <!-- Social cards -->
    <div class="container">
      <div class="social-heading" data-i18n="social_heading">Connect With Me</div>
      
      <div class="social-grid"></div>
    </div>

    <!-- Website statistics (separate container) -->
    <div class="container stats-container">
      <div class="stats-heading" data-i18n="stats_heading">Website Statistics</div>

      <!-- GoatCounter summary (top strip) -->
      <div class="stats-metrics" aria-label="GoatCounter summary">
        <div class="stats-metric">
          <div class="stats-metric-label" data-i18n="metric_total">All-time (Total)</div>
          <div class="stats-metric-value" id="gc-total">0</div>
        </div>
        <div class="stats-metric">
          <div class="stats-metric-label" data-i18n="metric_month">Last 30 days</div>
          <div class="stats-metric-value" id="gc-month">0</div>
        </div>
        <div class="stats-metric">
          <div class="stats-metric-label" data-i18n="metric_week">Last 7 days</div>
          <div class="stats-metric-value" id="gc-week">0</div>
        </div>
        <div class="stats-metric">
          <div class="stats-metric-label" data-i18n="metric_page">This path</div>
          <div class="stats-metric-value" id="gc-page">0</div>
        </div>
      </div>

      <!-- GoatCounter dashboard -->
      <div class="stats-block">
        <div class="stats-subtitle">
          <span data-i18n="dashboard_title">GoatCounter Dashboard</span>
          <a class="stats-link" href="https://arthur0025.goatcounter.com/" target="_blank" rel="noopener" data-i18n="link_open">Open</a>
        </div>

        <p class="stats-inline-note">GoatCounter 不允许嵌入页面内显示，已改为外链打开。</p>
      </div>

    </div>
    
    <a href="#" class="back-btn" id="social-back-btn">
      <i class="fas fa-arrow-left"></i>
    </a>
  </div>
`);

})();

(function () {
  const GC_SITE = "https://arthur0025.goatcounter.com";

  async function fetchCounter(path, start) {
    const qs = new URLSearchParams();
    if (start) qs.set("start", start);

    const url = `${GC_SITE}/counter/${encodeURIComponent(path)}.json${qs.toString() ? "?" + qs.toString() : ""}`;
    const r = await fetch(url, { mode: "cors" });
    if (!r.ok) throw new Error(`GoatCounter counter failed: ${r.status}`);
    const data = await r.json();
    return data && (data.count || data.count_unique) ? (data.count || data.count_unique) : 0;
  }

  async function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  async function initStats() {
    try {
      await setText("gc-total", await fetchCounter("TOTAL"));
      await setText("gc-month", await fetchCounter("TOTAL", "month"));
      await setText("gc-week", await fetchCounter("TOTAL", "week"));

      const p = window.location.pathname || "/";
      await setText("gc-page", await fetchCounter(p));
    } catch (e) {
      ["gc-total", "gc-month", "gc-week", "gc-page"].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = "0";
        el.title = "GoatCounter visitor-counter may be disabled in settings.";
      });
    }
  }

  window.addEventListener("load", initStats, { once: true });
})();

