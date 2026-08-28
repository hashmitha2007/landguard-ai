import React from 'react'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { History, MapPinned, CalendarDays, Waves } from 'lucide-react'
import DataTable from '../components/DataTable.jsx'
import { HISTORICAL_SUMMARY, HISTORICAL_BY_YEAR, HISTORICAL_BY_MONTH, RAINFALL_VS_LANDSLIDE, HISTORICAL_RECORDS } from '../data/mockData.js'

const chartTooltip = { contentStyle: { background: '#111A2E', border: '1px solid #233150', borderRadius: 10, fontSize: 12 }, labelStyle: { color: '#8B98B5' } }
const axisTick = { fill: '#8B98B5', fontSize: 12 }

export default function HistoricalData() {
  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'location', header: 'Location' },
    { key: 'rainfall', header: 'Rainfall', render: (r) => `${r.rainfall} mm` },
    { key: 'slope', header: 'Slope', render: (r) => `${r.slope}°` },
    { key: 'severity', header: 'Severity' },
    { key: 'damage', header: 'Damage' },
    { key: 'source', header: 'Source' }
  ]

  const summaryCards = [
    { icon: History, label: 'Total Historical Incidents', value: HISTORICAL_SUMMARY.totalIncidents },
    { icon: MapPinned, label: 'Most Affected District', value: HISTORICAL_SUMMARY.mostAffectedDistrict },
    { icon: CalendarDays, label: 'Most Affected Month', value: HISTORICAL_SUMMARY.mostAffectedMonth },
    { icon: Waves, label: 'Highest Rainfall Correlation', value: HISTORICAL_SUMMARY.highestRainfallCorrelation }
  ]

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <p className="label-eyebrow">Longitudinal Trends</p>
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">Historical Landslide Analysis</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="panel p-4">
            <div className="h-9 w-9 rounded-lg bg-accent/10 text-accent ring-1 ring-accent/30 flex items-center justify-center mb-3">
              <Icon size={18} />
            </div>
            <p className="label-eyebrow">{label}</p>
            <p className="text-lg font-display font-semibold text-white mt-1 leading-tight">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="panel p-5">
          <p className="label-eyebrow mb-4">Landslides by Year</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HISTORICAL_BY_YEAR} margin={{ left: -20 }}>
                <CartesianGrid stroke="#1E2C48" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: '#233150' }} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="incidents" fill="#3ED6D0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <p className="label-eyebrow mb-4">Landslides by Month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_BY_MONTH} margin={{ left: -20 }}>
                <CartesianGrid stroke="#1E2C48" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: '#233150' }} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="incidents" stroke="#F0883E" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <p className="label-eyebrow mb-4">Rainfall vs Landslide Events</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ left: -20 }}>
              <CartesianGrid stroke="#1E2C48" strokeDasharray="3 3" />
              <XAxis type="number" dataKey="rainfall" name="Rainfall" unit="mm" tick={axisTick} axisLine={{ stroke: '#233150' }} tickLine={false} />
              <YAxis type="number" dataKey="events" name="Events" tick={axisTick} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltip} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={RAINFALL_VS_LANDSLIDE} fill="#E23636" fillOpacity={0.65} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel p-2">
        <DataTable columns={columns} rows={HISTORICAL_RECORDS} />
      </div>
    </div>
  )
}
