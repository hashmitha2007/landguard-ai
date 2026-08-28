import React from 'react'
import { CheckCircle2, TriangleAlert, Info, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const toneMap = {
  success: { icon: CheckCircle2, color: 'text-risk-low', ring: 'ring-risk-low/30' },
  warning: { icon: TriangleAlert, color: 'text-risk-moderate', ring: 'ring-risk-moderate/30' },
  error: { icon: XCircle, color: 'text-risk-critical', ring: 'ring-risk-critical/30' },
  info: { icon: Info, color: 'text-risk-info', ring: 'ring-risk-info/30' }
}

export default function ToastStack() {
  const { toasts } = useApp()
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((toast) => {
        const conf = toneMap[toast.tone] || toneMap.info
        const Icon = conf.icon
        return (
          <div key={toast.id} className={`panel !bg-base-800 px-4 py-3 flex items-start gap-3 ring-1 ${conf.ring} animate-fade-up`}>
            <Icon size={18} className={`${conf.color} shrink-0 mt-0.5`} />
            <p className="text-sm text-slate-200">{toast.message}</p>
          </div>
        )
      })}
    </div>
  )
}
