// Cloudflare Worker: dedicated quote proxy for the dashboard (same contract as the local server).
// Deploy: dash.cloudflare.com -> Workers & Pages -> Create Worker -> paste this -> Deploy.
// Then open the dashboard with &proxy=https://<your-worker>.workers.dev appended to the URL.
const YURL = s => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?interval=1m&range=1d&includePrePost=true`;
let cache = { t: 0, sym: "", data: null }; // per-isolate; shields Yahoo from rapid polling

export default {
  async fetch(req) {
    const u = new URL(req.url);
    if (!u.pathname.startsWith("/quote")) return json({ ok: true, use: "/quote?symbol=SPCX" });
    const sym = u.searchParams.get("symbol") || "SPCX";
    const now = Date.now();
    if (cache.data && cache.sym === sym && now - cache.t < 1500) return json(cache.data);
    try {
      const r = await fetch(YURL(sym), { headers: { "User-Agent": "Mozilla/5.0" } });
      const m = (await r.json()).chart.result[0].meta;
      const data = {
        symbol: m.symbol, name: m.longName || m.shortName, price: m.regularMarketPrice,
        prevClose: m.chartPreviousClose || m.previousClose, currency: m.currency,
        time: m.regularMarketTime, dayHigh: m.regularMarketDayHigh, dayLow: m.regularMarketDayLow,
      };
      cache = { t: now, sym, data };
      return json(data);
    } catch (e) { return json({ error: String(e) }); }
  },
};

function json(d) {
  return new Response(JSON.stringify(d), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" },
  });
}
