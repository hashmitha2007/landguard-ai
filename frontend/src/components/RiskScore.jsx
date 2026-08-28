import React from 'react'
import RiskBadge from './RiskBadge.jsx'
import { normalizeRisk, RISK_STYLES } from '../utils/risk.js'

export default function RiskScore({ score, level, confidenceLabel }) {
  const style = RISK_STYLES[normalizeRisk(level)] || RISK_STYLES.info
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#1E2C48" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="54" fill="none" stroke={style.hex} strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-display font-bold text-white tabular-nums">{score}%</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-faint mt-1">Probability</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-2">
        <RiskBadge level={level} />
        {confidenceLabel && <p className="text-xs font-mono text-faint">{confidenceLabel}</p>}
      </div>
    </div>
  )
}
