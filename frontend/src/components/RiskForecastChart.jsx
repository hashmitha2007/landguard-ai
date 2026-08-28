import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { BrainCircuit } from 'lucide-react'

export default function RiskForecastChart({ data, confidence = 89 }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit size={16} className="text-accent" />
          <p className="label-eyebrow !text-accent">AI Forecast — Predicted Risk, Next 72 Hours</p>
        </div>
        <span className="chip bg-accent/10 text-accent ring-1 ring-accent/30">Confidence {confidence}%</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0883E" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#F0883E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2C48" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#8B98B5', fontSize: 12 }} axisLine={{ stroke: '#233150' }} tickLine={false} />
            <YAxis tick={{ fill: '#8B98B5', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#111A2E', border: '1px solid #233150', borderRadius: 10, fontSize: 12 }}
              labelStyle={{ color: '#8B98B5' }}
              formatter={(v) => [`${v}%`, 'Risk probability']}
            />
            <Area type="monotone" dataKey="probability" stroke="#F0883E" strokeWidth={2.5} fill="url(#forecastFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
