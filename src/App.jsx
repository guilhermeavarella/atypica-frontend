import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './components/Button'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-background-purple-light text-content-primary dark:bg-slate-900 dark:text-slate-100">
      {!isLoginPage && (
        <header className="bg-background-fixed-white border-b border-content-light">
          <nav className="w-full mx-auto p-4 flex items-center justify-between" aria-label="Principal">
            <Link to="/dashboard" aria-label="Ir para tela inicial">
              <img src="/src/assets/logos/large.svg" alt="logo da Atypica" className="h-10 mx-1" />
            </Link>
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <Button variant="secondary" text="Painel" onClick={() => { navigate('/dashboard') }} />
                  <Button variant="secondary" text="Biblioteca" onClick={() => { navigate('/forum') }} />
                  <Button variant="secondary" text="Comunidade" onClick={() => { navigate('/forum') }} />
                  <Button variant="secondary" text="Ajuda" onClick={() => { navigate('/help') }} />
                </div>
                <Button variant="primary" text="Avaliar material" onClick={() => { navigate('/upload') }} />
                  {/*<button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800" onClick={() => setDark(v => !v)} aria-pressed={dark} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
                    {dark ? 'Claro' : 'Escuro'}
                  </button>*/}
              </div>
              <div className="flex items-center gap-1 lg:gap-3">
                <button onClick={() => {  }}><img src="/src/assets/icons/notifications.svg" alt="Notificações" className="h-9"/></button>
                <button onClick={() => {  }}><img src="/src/assets/icons/profile.svg" alt="Perfil" className="h-[2.625rem]"/></button>
              </div>
            </div>
          </nav>
        </header>
      )}

      <main id="main" className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>

      {!isLoginPage && (
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto p-4 text-sm text-slate-500 dark:text-slate-400">© 2025 Atypica • Protótipo</div>
      </footer>
      )}
    </div>
  )
}
