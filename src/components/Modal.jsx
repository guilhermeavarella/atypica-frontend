import React, { useEffect } from 'react'

export default function Modal({ open, title, children, onClose, actions }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-auto my-10 max-w-2xl bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="px-2 py-1 rounded border" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-auto">{children}</div>
        {actions && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
