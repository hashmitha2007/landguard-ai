import React from 'react'
import { RISK_STYLES, normalizeRisk } from '../utils/risk.js'

export default function RiskBadge({ level, size = 'md' }) {
  const key = normalizeRisk(level)
  const style = RISK_STYLES[key] || RISK_STYLES.info
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'
  return (
    <span className={`chip ${sizeClasses} ${style.dim} ${style.text} ring-1 ${style.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.bg}`} />
      {style.label}
    </span>
  )
}
