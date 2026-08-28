import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose?.() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${widths[size]} panel !bg-base-800 p-0 max-h-[90vh] overflow-hidden flex flex-col animate-fade-up`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
          <h3 className="font-display font-semibold text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-faint hover:text-white transition p-1 rounded-lg hover:bg-base-700" aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-line flex items-center justify-end gap-3 shrink-0">{footer}</div>}
      </div>
    </div>
  )
}
