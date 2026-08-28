import React from 'react'
import { CloudRain, Droplets, TrendingUp } from 'lucide-react'

export default function WeatherCard({ data }) {
  const items = [
    { label: 'Current', value: `${data.current} mm/hr`, icon: CloudRain },
    { label: '24h Rainfall', value: `${data.unit24h} mm`, icon: Droplets },
    { label: '72h Rainfall', value: `${data.unit72h} mm`, icon: Droplets },
    { label: 'Anomaly', value: `+${data.anomaly}%`, icon: TrendingUp }
  ]
  return (
    <div className="panel p-5">
      <p className="label-eyebrow mb-4">Rainfall Monitoring</p>
      <div className="grid grid-cols-2 gap-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl bg-base-900/60 border border-line p-3.5">
            <div className="flex items-center gap-1.5 text-faint text-xs mb-1.5">
              <Icon size={13} /> {label}
            </div>
            <p className="text-xl font-display font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
