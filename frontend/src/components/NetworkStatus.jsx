import React, { useRef, useState } from 'react'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useClickOutside } from '../utils/useClickOutside.js'

export default function NetworkStatus() {
  const { isOnline, toggleOnline, syncing, lastSync, pendingReports } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono border transition ${
          isOnline ? 'border-risk-low/40 bg-risk-lowDim text-risk-low' : 'border-risk-critical/40 bg-risk-criticalDim text-risk-critical'
        }`}
      >
        {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
        <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline Mode'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 panel !bg-base-800 p-4 z-50 animate-fade-up">
          <p className="label-eyebrow mb-3">Connectivity Status</p>
          <div className="space-y-2.5 text-sm">
            <Row label="Internet Connection" value={isOnline ? 'Connected' : 'Offline'} good={isOnline} />
            <Row label="Data Synchronization" value={syncing ? 'Syncing…' : isOnline ? 'Up to date' : 'Paused'} good={!syncing} />
            <Row label="Last Successful Sync" value={lastSync} plain />
            <Row label="Pending Reports" value={String(pendingReports.length)} good={pendingReports.length === 0} />
          </div>
          <button
            onClick={toggleOnline}
            className="mt-4 w-full btn-secondary text-xs"
          >
            {syncing ? <RefreshCw size={14} className="animate-spin" /> : isOnline ? <WifiOff size={14} /> : <Wifi size={14} />}
            {syncing ? 'Synchronizing…' : isOnline ? 'Simulate Offline Mode' : 'Restore Connection'}
          </button>
        </div>
      )}
    </div>
  )
}

function Row({ label, value, good, plain }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-faint">{label}</span>
      <span className={plain ? 'text-slate-300 font-mono text-xs' : `font-mono text-xs ${good ? 'text-risk-low' : 'text-risk-moderate'}`}>{value}</span>
    </div>
  )
}
