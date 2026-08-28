import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, CheckCircle2, Eye, BarChart3 } from 'lucide-react'
import RiskBadge from './RiskBadge.jsx'
import { RISK_STYLES, normalizeRisk } from '../utils/risk.js'

export default function AlertCard({ alert, onReview }) {
  const navigate = useNavigate()
  const style = RISK_STYLES[normalizeRisk(alert.level)] || RISK_STYLES.info
  const isReviewed = alert.status !== 'active'

  return (
    <div className={`panel p-5 border-l-4`} style={{ borderLeftColor: style.hex }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <RiskBadge level={alert.level} />
          <span className="font-mono text-xs text-faint">{alert.id}</span>
          {alert.status === 'reviewed' && <span className="chip bg-risk-infoDim text-risk-info ring-1 ring-risk-info/30">Reviewed</span>}
          {alert.status === 'resolved' && <span className="chip bg-risk-lowDim text-risk-low ring-1 ring-risk-low/30">Resolved</span>}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-faint font-mono">
          <Clock size={13} /> {alert.time}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-white font-display font-semibold">
        <MapPin size={15} className="text-faint" /> {alert.location}
      </div>
      <p className="mt-2 text-sm text-slate-400">{alert.reason}</p>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="text-faint">AI probability:</span>
        <span className="font-mono font-semibold" style={{ color: style.hex }}>{alert.probability}%</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => navigate('/risk-map')} className="btn-secondary text-xs !px-3 !py-2">
          <Eye size={14} /> View Location
        </button>
        <button onClick={() => navigate('/risk-analysis')} className="btn-secondary text-xs !px-3 !py-2">
          <BarChart3 size={14} /> View Analysis
        </button>
        {!isReviewed && (
          <button onClick={() => onReview?.(alert.id)} className="btn-secondary text-xs !px-3 !py-2 !text-risk-low">
            <CheckCircle2 size={14} /> Mark Reviewed
          </button>
        )}
      </div>
    </div>
  )
}
