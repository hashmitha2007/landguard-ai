import React from 'react'
import { CheckCircle2, Ban, TriangleAlert, Search } from 'lucide-react'
import RiskMap from '../components/RiskMap.jsx'
import DataTable from '../components/DataTable.jsx'
import RiskBadge from '../components/RiskBadge.jsx'
import { ROADS, ROAD_SUMMARY } from '../data/mockData.js'

const STATUS_COLOR = {
  Open: 'text-risk-low', 'At Risk': 'text-risk-high', Blocked: 'text-risk-critical'
}

const SUMMARY_CARDS = [
  { key: 'open', label: 'Open Roads', icon: CheckCircle2, tone: 'low' },
  { key: 'blocked', label: 'Blocked Roads', icon: Ban, tone: 'critical' },
  { key: 'atRisk', label: 'At Risk', icon: TriangleAlert, tone: 'high' },
  { key: 'underInspection', label: 'Under Inspection', icon: Search, tone: 'info' }
]

export default function RoadStatus() {
  const columns = [
    { key: 'name', header: 'Road' },
    { key: 'district', header: 'District' },
    { key: 'status', header: 'Status', render: (r) => <span className={`font-medium ${STATUS_COLOR[r.status]}`}>{r.status}</span> },
    { key: 'risk', header: 'Risk', render: (r) => <RiskBadge level={r.risk} size="sm" /> },
    { key: 'lastUpdate', header: 'Last Update' },
    { key: 'altRoute', header: 'Alternative Route' }
  ]

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <p className="label-eyebrow">Roads &amp; Critical Infrastructure</p>
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">Connectivity &amp; Infrastructure</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_CARDS.map(({ key, label, icon: Icon, tone }) => {
          const toneClass = { low: 'text-risk-low bg-risk-lowDim ring-risk-low/30', critical: 'text-risk-critical bg-risk-criticalDim ring-risk-critical/30', high: 'text-risk-high bg-risk-highDim ring-risk-high/30', info: 'text-risk-info bg-risk-infoDim ring-risk-info/30' }[tone]
          return (
            <div key={key} className="panel p-4">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ring-1 ${toneClass} mb-3`}>
                <Icon size={18} />
              </div>
              <p className="label-eyebrow">{label}</p>
              <p className="text-2xl font-display font-semibold text-white mt-1">{ROAD_SUMMARY[key]}</p>
            </div>
          )
        })}
      </div>

      <div className="panel p-4">
        <p className="label-eyebrow mb-3">Road Network Status</p>
        <RiskMap zones={[]} roads={ROADS} showZones={false} showRoads height="380px" zoom={6} />
        <div className="flex gap-4 mt-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-risk-low"><span className="h-2 w-2 rounded-full bg-risk-low" /> Open</span>
          <span className="flex items-center gap-1.5 text-risk-high"><span className="h-2 w-2 rounded-full bg-risk-high" /> At Risk</span>
          <span className="flex items-center gap-1.5 text-risk-critical"><span className="h-2 w-2 rounded-full bg-risk-critical" /> Blocked</span>
        </div>
      </div>

      <div className="panel p-2">
        <DataTable columns={columns} rows={ROADS} />
      </div>
    </div>
  )
}
