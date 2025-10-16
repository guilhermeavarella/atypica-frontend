import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import AccessibilityBar from './components/AccessibilityBar'

export default function App() {
  const location = useLocation()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-700">
        <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between" aria-label="Principal">
          <Link to="/" className="flex items-center gap-2" aria-label="Ir para tela inicial">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-brand text-white font-bold" aria-hidden>α</span>
            <span className="text-xl font-bold">Atypica</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="hover:underline" to="/upload">Upload</Link>
            <Link className="hover:underline" to="/forum">Fórum</Link>
            <Link className="hover:underline" to="/help">Ajuda</Link>
            <button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800" onClick={() => setDark(v => !v)} aria-pressed={dark} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
              {dark ? 'Claro' : 'Escuro'}
            </button>
          </div>
        </nav>
      </header>

      <AccessibilityBar />

      <main id="main" className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto p-4 text-sm text-slate-500 dark:text-slate-400">© 2025 Atypica • Protótipo</div>
      </footer>
    </div>
  )
}
