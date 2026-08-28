import React from 'react'
import { MapPin, Clock, Camera, User } from 'lucide-react'

const STATUS_STYLE = {
  New: 'bg-risk-infoDim text-risk-info ring-risk-info/30',
  'Under Review': 'bg-risk-moderateDim text-risk-moderate ring-risk-moderate/30',
  Verified: 'bg-accent/10 text-accent ring-accent/30',
  Resolved: 'bg-risk-lowDim text-risk-low ring-risk-low/30'
}

export default function FieldReportCard({ report }) {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-faint">{report.id}</span>
        <span className={`chip ring-1 ${STATUS_STYLE[report.status] || STATUS_STYLE.New}`}>{report.status}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-white font-medium text-sm">
        <MapPin size={14} className="text-faint" /> {report.location}
      </div>
      <p className="mt-1 text-sm text-slate-400 line-clamp-2">{report.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-faint font-mono">
        <span>{report.type}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {report.time}</span>
        <span className="flex items-center gap-1"><User size={12} /> {report.reporterType}</span>
        {report.photo && <span className="flex items-center gap-1 text-accent"><Camera size={12} /> Photo attached</span>}
      </div>
    </div>
  )
}
