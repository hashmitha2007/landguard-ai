import React, { useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useClickOutside } from '../utils/useClickOutside.js'

export default function NotificationPanel() {
  const { notifications, markNotificationsRead } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => { setOpen((o) => !o); if (!open) markNotificationsRead() }}
        className="relative p-2 rounded-lg hover:bg-base-700 transition text-slate-300"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-risk-critical text-[10px] font-bold flex items-center justify-center text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 panel !bg-base-800 p-0 z-50 animate-fade-up overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <p className="font-display font-semibold text-sm text-white">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-line">
            {notifications.map((n) => (
              <div key={n.id} className={`px-4 py-3 text-sm ${!n.read ? 'bg-accent/5' : ''}`}>
                <p className="text-slate-200">{n.text}</p>
                <p className="text-xs text-faint font-mono mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
