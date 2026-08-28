import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, BarChart3, BellRing, ClipboardList, Construction, History, BrainCircuit, Settings, Mountain, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { t } from '../data/translations.js'

const NAV_ITEMS = [
  { to: '/dashboard', key: 'dashboard', icon: LayoutDashboard },
  { to: '/risk-map', key: 'riskMap', icon: Map },
  { to: '/risk-analysis', key: 'riskAnalysis', icon: BarChart3 },
  { to: '/alerts', key: 'alerts', icon: BellRing },
  { to: '/field-reports', key: 'fieldReports', icon: ClipboardList },
  { to: '/road-status', key: 'roadStatus', icon: Construction },
  { to: '/historical-data', key: 'historicalData', icon: History },
  { to: '/ai-prediction', key: 'aiPrediction', icon: BrainCircuit },
  { to: '/settings', key: 'settings', icon: Settings }
]

export default function Sidebar() {
  const { language, logout, officer } = useApp()

  return (
    <aside className="hidden md:flex md:flex-col w-[76px] xl:w-64 shrink-0 h-screen sticky top-0 bg-base-850 border-r border-line">
      <div className="h-16 flex items-center gap-2.5 px-4 xl:px-5 border-b border-line shrink-0">
        <div className="h-9 w-9 rounded-lg bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center text-accent shrink-0">
          <Mountain size={19} />
        </div>
        <div className="hidden xl:block leading-tight">
          <p className="font-display font-bold text-white text-sm tracking-wide">LANDGUARD AI</p>
          <p className="text-[10px] text-faint font-mono">Early Warning System</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 xl:px-3 space-y-1">
        {NAV_ITEMS.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={t(language, key)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors justify-center xl:justify-start ${
                isActive ? 'bg-accent/10 text-accent ring-1 ring-accent/25' : 'text-slate-400 hover:text-slate-100 hover:bg-base-700/60'
              }`
            }
          >
            <Icon size={19} className="shrink-0" />
            <span className="hidden xl:inline truncate">{t(language, key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-3 xl:p-4 shrink-0">
        <div className="hidden xl:flex items-center gap-2.5 mb-3">
          <div className="h-8 w-8 rounded-full bg-base-700 flex items-center justify-center text-xs font-semibold text-slate-300">
            {officer?.name?.[0] ?? 'D'}
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-xs text-slate-200 font-medium truncate">{officer?.name ?? 'Demo Officer'}</p>
            <p className="text-[10px] text-faint truncate">{officer?.role ?? 'Nodal Officer'}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full btn-secondary text-xs !py-2 justify-center">
          <LogOut size={14} />
          <span className="hidden xl:inline">{t(language, 'logout')}</span>
        </button>
      </div>
    </aside>
  )
}
