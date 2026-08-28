import React, { useState } from 'react'
import { Layers, MapPin, Gauge, Droplets, Mountain as MountainIcon, TrendingUp, Clock } from 'lucide-react'
import RiskMap from '../components/RiskMap.jsx'
import RiskBadge from '../components/RiskBadge.jsx'
import { RISK_ZONES } from '../data/mockData.js'
import { RISK_STYLES } from '../utils/risk.js'

const LAYER_OPTIONS = [
  'Risk Heatmap', 'Rainfall', 'Soil Moisture', 'Slope', 'Roads',
  'Villages', 'Infrastructure', 'Historical Landslides', 'Satellite Imagery'
]

export default function RiskMapPage() {
  const [layers, setLayers] = useState(() => Object.fromEntries(LAYER_OPTIONS.map((l) => [l, true])))
  const [selected, setSelected] = useState(RISK_ZONES[0])

  function toggleLayer(name) {
    setLayers((l) => ({ ...l, [name]: !l[name] }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-4 animate-fade-up">
      {/* Left: layers */}
      <div className="panel p-4 h-fit">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={15} className="text-accent" />
          <p className="label-eyebrow">Map Layers</p>
        </div>
        <div className="space-y-2.5">
          {LAYER_OPTIONS.map((name) => (
            <label key={name} className="flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={layers[name]} onChange={() => toggleLayer(name)} className="accent-accent h-4 w-4 rounded" />
              {name}
            </label>
          ))}
        </div>
      </div>

      {/* Center: map */}
      <div className="space-y-4 min-w-0">
        <RiskMap
          zones={RISK_ZONES}
          showZones={layers['Risk Heatmap']}
          height="560px"
          zoom={6}
          selectedId={selected?.id}
          onSelectZone={setSelected}
        />
        <div className="panel p-4">
          <p className="label-eyebrow mb-3">Risk Legend</p>
          <div className="flex flex-wrap gap-3">
            <RiskBadge level="critical" /><RiskBadge level="high" /><RiskBadge level="moderate" /><RiskBadge level="low" />
          </div>
        </div>
      </div>

      {/* Right: selected zone */}
      <div className="panel p-5 h-fit sticky top-20">
        <p className="label-eyebrow mb-4">Selected Zone</p>
        {selected ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-white font-display font-semibold">
                <MapPin size={15} className="text-faint" /> {selected.name}
              </div>
              <p className="text-xs text-faint mt-1">{selected.state}</p>
              <div className="mt-2"><RiskBadge level={selected.risk} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Metric icon={Droplets} label="Rainfall" value={`${selected.rainfall} mm`} />
              <Metric icon={Gauge} label="Soil Moisture" value={`${selected.soilMoisture}%`} />
              <Metric icon={MountainIcon} label="Slope" value={`${selected.slope}°`} />
              <Metric icon={TrendingUp} label="Elevation" value={`${selected.elevation} m`} />
            </div>
            <div className="border-t border-line pt-4 space-y-2 text-sm">
              <Row label="Historical incidents" value={selected.historicalIncidents} />
              <Row label="AI probability" value={`${selected.aiProbability}%`} />
              <Row label="Last updated" value={selected.lastUpdated} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-faint">Click a marker on the map to view zone details.</p>
        )}
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-base-900/60 border border-line p-3">
      <div className="flex items-center gap-1.5 text-faint text-xs mb-1"><Icon size={13} /> {label}</div>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-faint flex items-center gap-1.5"><Clock size={12} /> {label}</span>
      <span className="text-slate-200 font-mono">{value}</span>
    </div>
  )
}
