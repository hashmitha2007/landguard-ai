import React from 'react'

export default function ProgressBar({ value, max = 100, color = '#3ED6D0', label, valueLabel, height = 'h-2' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="w-full">
      {(label || valueLabel) && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="text-slate-300">{label}</span>
          <span className="font-mono text-slate-400">{valueLabel ?? `${value}%`}</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-base-700 overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
