import React from 'react'
import * as Icons from 'lucide-react'
import { RISK_STYLES } from '../utils/risk.js'

export default function StatCard({ label, value, trend, trendUp, icon, tone = 'info' }) {
  const Icon = Icons[icon] || Icons.Activity
  const style = RISK_STYLES[tone] || RISK_STYLES.info
  const TrendIcon = trendUp ? Icons.ArrowUpRight : Icons.ArrowDownRight

  return (
    <div className="panel p-4 sm:p-5 animate-fade-up hover:border-line/80 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="label-eyebrow">{label}</p>
          <p className="text-3xl font-display font-semibold text-white mt-2 tabular-nums">{value.toLocaleString()}</p>
        </div>
        <div className={`h-10 w-10 shrink-0 rounded-xl ${style.dim} ${style.text} flex items-center justify-center ring-1 ${style.ring}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      <div className={`mt-3 inline-flex items-center gap-1 text-xs font-mono ${trendUp ? 'text-risk-high' : 'text-risk-low'}`}>
        <TrendIcon size={13} />
        {trend}
      </div>
    </div>
  )
}
