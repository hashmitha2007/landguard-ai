import React from 'react'
import { Languages } from 'lucide-react'
import { LANGUAGES } from '../data/translations.js'
import { useApp } from '../context/AppContext.jsx'

export default function LanguageSelector({ compact = false }) {
  const { language, setLanguage } = useApp()
  return (
    <label className={`relative flex items-center gap-2 ${compact ? '' : 'bg-base-800 border border-line rounded-lg px-2.5 py-1.5'}`}>
      <Languages size={15} className="text-faint" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select language"
        className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer pr-1"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-base-800 text-slate-200">{l.label}</option>
        ))}
      </select>
    </label>
  )
}
