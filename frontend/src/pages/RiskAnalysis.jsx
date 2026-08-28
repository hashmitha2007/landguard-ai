import React, { useMemo, useState } from 'react'
import { Search, Info, ShieldAlert } from 'lucide-react'
import ProgressBar from '../components/ProgressBar.jsx'
import RiskScore from '../components/RiskScore.jsx'
import { RISK_ZONES, AI_FACTORS, RECOMMENDATIONS } from '../data/mockData.js'
import { normalizeRisk } from '../utils/risk.js'

export default function RiskAnalysis() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(RISK_ZONES[0].id)

  const filtered = useMemo(
    () =>
      RISK_ZONES.filter((z) =>
        z.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  const zone =
    RISK_ZONES.find((z) => z.id === selectedId) || RISK_ZONES[0]

  const recs =
    RECOMMENDATIONS[normalizeRisk(zone.risk)] ||
    RECOMMENDATIONS.moderate

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Page Heading */}
      <div>
        <p className="label-eyebrow">
          AI-Powered Assessment
        </p>

        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
          AI Risk Analysis
        </h2>
      </div>

      {/* Search Box */}
      <div className="panel p-4 relative z-30">

        <div className="relative">

          {/* Search Icon */}
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
          />

          {/* Search Input */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a location, road, or district…"
            className="input-field"
            style={{
              paddingLeft: '42px'
            }}
          />

        </div>

        {/* Search Results */}
        {query && (
          <div className="absolute left-4 right-4 top-full mt-2 panel !bg-base-800 z-50 max-h-56 overflow-y-auto">

            {filtered.length === 0 && (
              <p className="px-4 py-3 text-sm text-faint">
                No matching locations.
              </p>
            )}

            {filtered.map((z) => (
              <button
                key={z.id}
                onClick={() => {
                  setSelectedId(z.id)
                  setQuery('')
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-base-700 transition"
              >
                {z.name}{' '}
                <span className="text-faint text-xs">
                  — {z.state}
                </span>
              </button>
            ))}

          </div>
        )}

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Left Section */}
        <div className="xl:col-span-2 space-y-5">

          {/* Environmental Indicators */}
          <div className="panel p-5">

            <p className="label-eyebrow mb-4">
              Environmental Indicators — {zone.name}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              <Indicator
                label="Rainfall"
                value={`${zone.rainfall} mm`}
              />

              <Indicator
                label="Soil Moisture"
                value={`${zone.soilMoisture}%`}
              />

              <Indicator
                label="Slope"
                value={`${zone.slope}°`}
              />

              <Indicator
                label="Elevation"
                value={`${zone.elevation} m`}
              />

              <Indicator
                label="Rainfall Anomaly"
                value={`+${zone.anomaly}%`}
              />

              <Indicator
                label="Vegetation Condition"
                value={zone.vegetation}
              />

              <Indicator
                label="Historical Landslides"
                value={zone.historicalIncidents}
              />

            </div>

          </div>

          {/* AI Factors */}
          <div className="panel p-5">

            <p className="label-eyebrow mb-4">
              AI Factors
            </p>

            <div className="space-y-4">

              {AI_FACTORS.map((f) => (
                <ProgressBar
                  key={f.label}
                  label={f.label}
                  value={f.weight}
                  color={f.color}
                  valueLabel={`${f.weight}%`}
                />
              ))}

            </div>

          </div>

          {/* Recommended Action */}
          <div className="panel p-5 border-l-4 border-l-accent">

            <div className="flex items-center gap-2 mb-3">

              <ShieldAlert
                size={16}
                className="text-accent"
              />

              <p className="label-eyebrow !text-accent">
                Recommended Action
              </p>

            </div>

            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">

              {recs.map((r) => (
                <li key={r}>
                  {r}
                </li>
              ))}

            </ul>

            <div className="mt-4 flex items-start gap-2 text-xs text-faint bg-base-900/60 rounded-lg p-3">

              <Info
                size={14}
                className="shrink-0 mt-0.5"
              />

              These are AI-generated decision-support recommendations
              for review by authorized personnel — not automatic
              government orders.

            </div>

          </div>

        </div>

        {/* AI Prediction */}
        <div className="panel p-6 flex flex-col items-center justify-center h-fit">

          <p className="label-eyebrow mb-5 self-start">
            AI Prediction
          </p>

          <RiskScore
            score={zone.aiProbability}
            level={zone.risk}
            confidenceLabel="Prediction confidence: 89%"
          />

        </div>

      </div>

    </div>
  )
}


/* Environmental Indicator */
function Indicator({ label, value }) {
  return (
    <div className="rounded-xl bg-base-900/60 border border-line p-3.5">

      <p className="text-xs text-faint mb-1">
        {label}
      </p>

      <p className="text-base font-semibold text-white">
        {value}
      </p>

    </div>
  )
}