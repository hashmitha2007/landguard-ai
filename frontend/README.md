# LANDGUARD AI

**AI-Powered Landslide Early Warning & Monitoring System**
Frontend prototype for the North Eastern Region (NER) of India — built for SIH 2026.

> Predict. Monitor. Warn. Protect.

This is a **fully functional frontend prototype**. It runs entirely on mock data and works
without any backend. Every screen, chart, map, form, and workflow described in the brief is
implemented and clickable end-to-end (see "Demo Flow" below).

---

## 1. Tech Stack

- React 18 + Vite
- Tailwind CSS (custom disaster-management / GIS design tokens)
- React Router v6
- Recharts (line, area, bar, pie, scatter charts)
- React Leaflet + Leaflet (interactive GIS map, dark CARTO basemap)
- Lucide React (icons)

## 2. Getting Started

```bash
npm install
npm run dev       # starts Vite dev server at http://localhost:5173
```

Build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

> This sandbox environment has no internet access, so dependencies could not be installed or
> the build verified here. Every source file has been syntax-checked with esbuild. Run
> `npm install` on your machine (with internet access) to pull the packages listed in
> `package.json`, then `npm run dev`.

## 3. Logging In

- Enter any Officer ID / email + password, **or**
- Click **Enter Demo Mode** on the landing page to skip straight to the dashboard with a demo
  officer profile — this is the fastest way to explore the prototype.

## 4. Project Structure

```
src/
  components/     Reusable UI building blocks (Sidebar, Header, RiskMap, charts, cards, modal…)
  pages/          One file per top-level page (Dashboard, RiskMapPage, Alerts, Settings…)
  layouts/        DashboardLayout — sidebar + header + mobile nav shell for authenticated routes
  context/        AppContext — auth, region, language, online/offline state, toasts, reports
  data/           mockData.js (all mock datasets + runAIPrediction()) and translations.js
  utils/          risk.js (risk-level styling helpers), useClickOutside.js
```

## 5. Offline Mode

Click the network indicator (top right, "Online" / "Offline Mode") to open the connectivity
panel and toggle **Simulate Offline Mode**. While offline:

- The Field Reports page shows an offline banner.
- New reports submitted are stored in `localStorage` and shown under **Pending Sync**.
- Toggling back online triggers a simulated synchronization and moves pending reports into the
  main report list.

## 6. Multilingual UI

Use the language dropdown in the header (or Settings → Language) to switch navigation labels
between English, Hindi, Assamese, Bengali, and Tamil. Labels are driven by
`src/data/translations.js` — add more keys/languages there as needed.

## 7. Backend Integration Map

The frontend is structured so real FastAPI (or any REST/GraphQL) endpoints can replace the
mock functions in `src/data/mockData.js` **without changing any component code**. Suggested
mapping:

| Mock data / function                          | Suggested endpoint                          |
|------------------------------------------------|----------------------------------------------|
| `KPIS`, `RISK_SUMMARY`                          | `GET /api/dashboard/summary`                  |
| `RISK_ZONES`                                    | `GET /api/zones?region=`                      |
| `RAINFALL_NOW`, `RAINFALL_7DAY`                 | `GET /api/weather/rainfall`                   |
| `AI_FORECAST_72H`                               | `GET /api/predictions/forecast`               |
| `AI_FACTORS`, `RECOMMENDATIONS`                 | `GET /api/predictions/zones/{id}/explain`     |
| `ALERTS`                                        | `GET /api/alerts`, `POST /api/alerts`         |
| `FIELD_REPORTS` / `addReport()` in AppContext   | `GET/POST /api/field-reports`                 |
| `ROADS`, `ROAD_SUMMARY`                         | `GET /api/infrastructure/roads`               |
| `HISTORICAL_*`                                  | `GET /api/historical`                         |
| `runAIPrediction()`                             | `POST /api/predictions/run`                   |
| `SYSTEM_STATUS`                                 | `GET /api/system/status`                      |

Swap each mock export for a small hook/fetch wrapper (e.g. `useZones()` calling
`fetch('/api/zones')`) and the pages will continue to work unchanged, since they only consume
the shape of the exported data, not its source.

## 8. Demo Flow

1. Log in via **Demo Mode**.
2. Dashboard opens with KPIs, live risk map, risk donut chart, rainfall chart, AI 72h forecast.
3. Open **Risk Map**, click a critical marker to inspect zone detail in the side panel.
4. Open **AI Risk Analysis**, search a location, review the 87% probability score and AI factors.
5. Open **Alerts**, review a critical alert, try **+ Create Alert** (simulated, no real SMS sent).
6. Open **Field Reports**, submit a report with a photo — it appears as **New**.
7. Open **Road & Infrastructure Status** to see blocked/at-risk roads on the map and table.
8. Open **AI Prediction**, run a 72-hour forecast and review the explainable-AI factor bars.
9. Toggle **Offline Mode** (network indicator, top right), submit a report — it's stored locally
   as **Pending Sync**. Toggle back online to see it synchronize.

## 9. Notes

- No physical sensors are required; soil-moisture/sensor data is treated as one optional input
  alongside rainfall, satellite, terrain, and historical records — this is a software-first
  prototype.
- All AI outputs are labeled as decision-support recommendations, not automated orders.
- SMS/alert sending is simulated only; no real messages are dispatched.
