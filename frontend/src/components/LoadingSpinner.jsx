import React from 'react'
import { RadarIcon } from 'lucide-react'

export default function LoadingSpinner({ label = 'Loading', size = 'md' }) {
  const dim = size === 'sm' ? 16 : size === 'lg' ? 36 : 24
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-faint">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-10 w-10 rounded-full border border-accent/30 animate-pulse-ring" />
        <RadarIcon size={dim} className="text-accent animate-radar-sweep" />
      </div>
      <p className="text-xs font-mono uppercase tracking-widest">{label}</p>
    </div>
  )
}
