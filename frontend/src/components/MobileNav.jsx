import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, BarChart3, BellRing, ClipboardList, Construction, History, BrainCircuit, Settings, Mountain, X, LogOut } from 'lucide-react'
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

export default function MobileNav({ open, onClose }) {
  const { language, logout } = useApp()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-72 bg-base-850 border-r border-line flex flex-col animate-fade-up">
        <div className="h-16 flex items-center justify-between px-4 border-b border-line shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center text-accent">
              <Mountain size={19} />
            </div>
            <p className="font-display font-bold text-white text-sm">LANDGUARD AI</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-base-700 text-faint" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {NAV_ITEMS.map(({ to, key, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent/10 text-accent ring-1 ring-accent/25' : 'text-slate-300 hover:bg-base-700/60'
                }`
              }
            >
              <Icon size={19} />
              {t(language, key)}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-line">
          <button onClick={logout} className="w-full btn-secondary text-sm justify-center">
            <LogOut size={15} /> {t(language, 'logout')}
          </button>
        </div>
      </div>
    </div>
  )
}
