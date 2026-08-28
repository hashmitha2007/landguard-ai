import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { MapPin } from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import RiskMap from '../components/RiskMap.jsx'
import WeatherCard from '../components/WeatherCard.jsx'
import RainfallChart from '../components/RainfallChart.jsx'
import RiskForecastChart from '../components/RiskForecastChart.jsx'
import { KPIS, RISK_SUMMARY, RAINFALL_NOW, RAINFALL_7DAY, AI_FORECAST_72H, RISK_ZONES } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

export default function Dashboard() {
  const { region } = useApp()
  const navigate = useNavigate()
  const [selectedZone, setSelectedZone] = useState(null)

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">Live Situational Overview</p>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
            {region === 'All NER' ? 'North Eastern Region' : region} — Risk Snapshot
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {KPIS.map((kpi) => <StatCard key={kpi.id} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 panel p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="label-eyebrow">Live Risk Map</p>
            <button onClick={() => navigate('/risk-map')} className="text-xs text-accent hover:underline font-mono">Open full map →</button>
          </div>
          <RiskMap zones={RISK_ZONES} showZones height="380px" selectedId={selectedZone?.id} onSelectZone={setSelectedZone} />
          {selectedZone && (
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <MapPin size={14} className="text-accent" /> {selectedZone.name} — {selectedZone.aiProbability}% AI probability
            </div>
          )}
        </div>

        <div className="panel p-4 sm:p-5 flex flex-col">
          <p className="label-eyebrow mb-2">Current Regional Risk</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={RISK_SUMMARY} dataKey="value" nameKey="level" innerRadius={55} outerRadius={82} paddingAngle={3}>
                  {RISK_SUMMARY.map((entry) => <Cell key={entry.level} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#111A2E', border: '1px solid #233150', borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {RISK_SUMMARY.map((r) => (
              <div key={r.level} className="flex items-center gap-2 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                <span className="text-slate-300">{r.level}</span>
                <span className="ml-auto font-mono text-slate-400">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeatherCard data={RAINFALL_NOW} />
        <RainfallChart data={RAINFALL_7DAY} />
      </div>

      <RiskForecastChart data={AI_FORECAST_72H} confidence={89} />
    </div>
  )
}
