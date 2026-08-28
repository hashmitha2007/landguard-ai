import React, { useState } from 'react'
import { User, BellRing, Languages, Map, SlidersHorizontal, Database, Activity, RefreshCw } from 'lucide-react'
import { LANGUAGES } from '../data/translations.js'
import { SYSTEM_STATUS } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

const STATUS_DOT = { Connected: 'bg-risk-low', Running: 'bg-accent', Syncing: 'bg-risk-moderate' }

export default function Settings() {
  const { officer, language, setLanguage, isOnline, lastSync, pushToast } = useApp()
  const [lowNetwork, setLowNetwork] = useState(false)
  const [notif, setNotif] = useState({ critical: true, high: true, moderate: false, reports: true })
  const [thresholds, setThresholds] = useState({ critical: 75, high: 55, moderate: 30 })

  return (
    <div className="space-y-5 animate-fade-up max-w-4xl">
      <div>
        <p className="label-eyebrow">Preferences &amp; System</p>
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">Settings</h2>
      </div>

      <Section icon={User} title="Profile">
        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput label="Full Name" defaultValue={officer?.name ?? 'Demo Officer'} />
          <LabeledInput label="Officer ID" defaultValue={officer?.id ?? 'OFC-2291'} readOnly />
          <LabeledInput label="Role" defaultValue={officer?.role ?? 'District Nodal Officer'} readOnly />
          <LabeledInput label="Contact Number" defaultValue="+91 98XXXXXX21" />
        </div>
      </Section>

      <Section icon={BellRing} title="Notification Settings">
        <div className="space-y-3">
          {[
            { key: 'critical', label: 'Critical risk alerts' },
            { key: 'high', label: 'High risk alerts' },
            { key: 'moderate', label: 'Moderate risk alerts' },
            { key: 'reports', label: 'New field report notifications' }
          ].map((n) => (
            <ToggleRow key={n.key} label={n.label} checked={notif[n.key]} onChange={() => setNotif((s) => ({ ...s, [n.key]: !s[n.key] }))} />
          ))}
        </div>
      </Section>

      <Section icon={Languages} title="Language">
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`chip !text-sm !py-2 !px-4 border ${language === l.code ? 'bg-accent/15 text-accent border-accent/40' : 'bg-base-800 text-slate-400 border-line'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Section>

      <Section icon={Map} title="Map Preferences">
        <div className="grid sm:grid-cols-2 gap-4">
          <SelectRow label="Default Base Layer" options={['Dark GIS', 'Satellite', 'Terrain']} />
          <SelectRow label="Default Zoom Level" options={['District', 'State', 'Full Region']} />
        </div>
        <ToggleRow label="Show risk heatmap by default" checked defaultOn className="mt-4" />
      </Section>

      <Section icon={SlidersHorizontal} title="Alert Thresholds">
        <div className="space-y-4">
          {['critical', 'high', 'moderate'].map((level) => (
            <div key={level}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="capitalize text-slate-300">{level} threshold</span>
                <span className="font-mono text-faint">{thresholds[level]}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={thresholds[level]}
                onChange={(e) => setThresholds((t) => ({ ...t, [level]: Number(e.target.value) }))}
                className="w-full accent-accent"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Database} title="Data Sources">
        <div className="grid sm:grid-cols-2 gap-3">
          {['Rainfall / IMD Feed', 'Soil Moisture Sensors (optional)', 'Satellite Imagery', 'Terrain / Slope DEM', 'Historical Landslide Records'].map((s) => (
            <div key={s} className="flex items-center justify-between rounded-lg bg-base-900/60 border border-line px-3.5 py-2.5 text-sm">
              <span className="text-slate-300">{s}</span>
              <span className="chip bg-risk-lowDim text-risk-low ring-1 ring-risk-low/30">Active</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-base-900/60 border border-line px-3.5 py-3">
          <div>
            <p className="text-sm text-slate-200 font-medium">Low Network Mode</p>
            <p className="text-xs text-faint mt-0.5">Reduces map tile and image quality on slow connections.</p>
          </div>
          <Switch checked={lowNetwork} onChange={() => setLowNetwork((v) => !v)} />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-base-900/60 border border-line px-3.5 py-3">
          <div>
            <p className="text-sm text-slate-200 font-medium">Offline Data Sync</p>
            <p className="text-xs text-faint mt-0.5">Status: {isOnline ? 'Connected' : 'Offline'} · Last sync: {lastSync}</p>
          </div>
          <button onClick={() => pushToast('Manual sync simulated.', 'success')} className="btn-secondary !py-2 !px-3 text-xs">
            <RefreshCw size={13} /> Sync now
          </button>
        </div>
      </Section>

      <Section icon={Activity} title="System Status">
        <div className="grid sm:grid-cols-2 gap-3">
          {SYSTEM_STATUS.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-lg bg-base-900/60 border border-line px-3.5 py-2.5 text-sm">
              <span className="text-slate-300">{s.name}</span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-faint">
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[s.status] || 'bg-faint'}`} /> {s.status}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-accent" />
        <p className="label-eyebrow">{title}</p>
      </div>
      {children}
    </div>
  )
}

function LabeledInput({ label, ...props }) {
  return (
    <div>
      <label className="label-eyebrow block mb-1.5">{label}</label>
      <input className="input-field" {...props} />
    </div>
  )
}

function SelectRow({ label, options }) {
  return (
    <div>
      <label className="label-eyebrow block mb-1.5">{label}</label>
      <select className="input-field">{options.map((o) => <option key={o}>{o}</option>)}</select>
    </div>
  )
}

function ToggleRow({ label, checked, onChange, className = '', defaultOn = false }) {
  const [state, setState] = useState(checked ?? defaultOn)
  const isControlled = checked !== undefined && onChange
  const value = isControlled ? checked : state
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-sm text-slate-300">{label}</span>
      <Switch checked={value} onChange={isControlled ? onChange : () => setState((v) => !v)} />
    </div>
  )
}

function Switch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      role="switch" aria-checked={checked}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-accent' : 'bg-base-700'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}
