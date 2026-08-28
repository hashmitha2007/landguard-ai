import React, { useEffect, useState } from 'react'
import { Menu, Mountain, ChevronDown } from 'lucide-react'
import { REGIONS } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'
import NotificationPanel from './NotificationPanel.jsx'
import NetworkStatus from './NetworkStatus.jsx'
import LanguageSelector from './LanguageSelector.jsx'

export default function Header({ onMenuClick, title }) {
  const { region, setRegion, officer } = useApp()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const dateLabel = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })
  const timeLabel = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 bg-base-900/90 backdrop-blur border-b border-line flex items-center gap-3 px-3 sm:px-5">
      <button onClick={onMenuClick} className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-base-700 text-slate-300" aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 md:hidden">
        <div className="h-8 w-8 rounded-lg bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center text-accent">
          <Mountain size={16} />
        </div>
      </div>

      {title && <h1 className="hidden lg:block font-display font-semibold text-white text-base mr-2">{title}</h1>}

      <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-faint mr-1">
        <span>{dateLabel}</span>
        <span className="text-line">|</span>
        <span>{timeLabel} IST</span>
      </div>

      <div className="relative ml-auto sm:ml-0">
        <label className="flex items-center gap-1.5 bg-base-800 border border-line rounded-lg px-2.5 py-1.5">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            aria-label="Select region"
            className="bg-transparent text-xs sm:text-sm text-slate-200 outline-none cursor-pointer max-w-[110px] sm:max-w-none"
          >
            {REGIONS.map((r) => <option key={r} value={r} className="bg-base-800">{r}</option>)}
          </select>
          <ChevronDown size={13} className="text-faint" />
        </label>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto sm:ml-0">
        <NetworkStatus />
        <NotificationPanel />
        <div className="hidden sm:block"><LanguageSelector /></div>
        <div className="hidden md:flex h-8 w-8 rounded-full bg-base-700 items-center justify-center text-xs font-semibold text-slate-300 ml-1">
          {officer?.name?.[0] ?? 'D'}
        </div>
      </div>
    </header>
  )
}
