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
          <span data-i18n="dashboard_title">GoatCounter Stats</span>
        </div>

        <div class="stats-embed goatcounter-panel" id="gc-panel" aria-label="GoatCounter statistics panel"></div>
      </div>

      <div class="stats-block">
        <div class="stats-subtitle">
          <span data-i18n="visitor_map">Visitor Map</span>
        </div>

        <div class="stats-embed clustrmaps-wrap" aria-label="ClustrMaps visitor map">
          <iframe
            class="clustrmaps-frame"
            src="https://clustrmaps.com/site/1c9sw"
            title="ClustrMaps visitor map"
            loading="lazy"
          ></iframe>
        </div>
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

  function formatCount(value) {
    return new Intl.NumberFormat().format(value || 0);
  }

  function renderGoatCounterPanel(counts) {
    const mount = document.getElementById("gc-panel");
    if (!mount) return;

    const lang = window.SiteLang && typeof window.SiteLang.getLang === "function"
      ? window.SiteLang.getLang()
      : "en";
    const dict = lang === "zh" ? window.SOCIAL_ZH_I18N : window.SOCIAL_EN_I18N;

    const items = [
      { key: "metric_total", label: "All-time (Total)", value: counts.total },
      { key: "metric_month", label: "Last 30 days", value: counts.month },
      { key: "metric_week", label: "Last 7 days", value: counts.week },
      { key: "metric_page", label: "This path", value: counts.page },
    ];

    const max = Math.max(1, ...items.map((item) => item.value));
    mount.innerHTML = items
      .map((item) => {
        const width = Math.max(6, Math.round((item.value / max) * 100));
        const label = (dict && dict[item.key]) || item.label;
        return `
          <div class="goatcounter-row">
            <div class="goatcounter-row-head">
              <span>${label}</span>
              <strong>${formatCount(item.value)}</strong>
            </div>
            <div class="goatcounter-bar" role="img" aria-label="${label}: ${item.value}">
              <span style="width:${width}%"></span>
            </div>
          </div>
        `;
      })
      .join("");
  }

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
      const total = await fetchCounter("TOTAL");
      const month = await fetchCounter("TOTAL", "month");
      const week = await fetchCounter("TOTAL", "week");

      const p = window.location.pathname || "/";
      const page = await fetchCounter(p);

      await setText("gc-total", total);
      await setText("gc-month", month);
      await setText("gc-week", week);
      await setText("gc-page", page);
      renderGoatCounterPanel({ total, month, week, page });
    } catch (e) {
      ["gc-total", "gc-month", "gc-week", "gc-page"].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = "0";
        el.title = "GoatCounter visitor-counter may be disabled in settings.";
      });
      renderGoatCounterPanel({ total: 0, month: 0, week: 0, page: 0 });
    }
  }

  window.addEventListener("load", initStats, { once: true });
})();

