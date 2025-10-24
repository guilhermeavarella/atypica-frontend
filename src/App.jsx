import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./components/AccessibilityMenu"

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  const [fontScale, setFontScale] = useState(1)
  const [highContrast, setHighContrast] = useState(false)
  const [reading, setReading] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const px = 16 * fontScale
    document.documentElement.style.setProperty('--base-font-size', `${px}px`)
  }, [fontScale])

  useEffect(() => {
    document.body.classList.toggle('contrast-boost', highContrast)
  }, [highContrast])

  useEffect(() => {
    const styleId = 'contrast-boost-style'
    if (!document.getElementById(styleId)) {
      const s = document.createElement('style')
      s.id = styleId
      s.textContent = `.contrast-boost { filter: contrast(1.2) saturate(1.1); }`
      document.head.appendChild(s)
    }
  }, [])

  const speakSelection = () => {
    if (!('speechSynthesis' in window)) return
    const sel = window.getSelection()?.toString() || document.getElementById('main')?.innerText || ''
    if (!sel) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(sel)
    utter.lang = 'pt-BR'
    window.speechSynthesis.speak(utter)
    setReading(true)
    utter.onend = () => setReading(false)
  }

  const stop = () => {
    window.speechSynthesis?.cancel()
    setReading(false)
  }

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="fixed top-24 left-5 rounded-full p-1 bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"><img src="/src/assets/icons/accessibility.svg" alt="Menu de acessibilidade" className="h-12 w-12" /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" side="right">
          <DropdownMenuLabel>Opções de acessibilidade</DropdownMenuLabel>
          <DropdownMenuGroup className="p-2 flex flex-col gap-2">
            <DropdownMenuItem onClick={() => {
              setHighContrast(v => !v)
            }}>
              <img src="/src/assets/icons/accessibility-menu/contrast.svg" alt="ícone" className="h-6 w-6" />
              Alto contraste
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              reading ? stop() : speakSelection()
            }}>
              <img src="/src/assets/icons/accessibility-menu/tts.svg" alt="ícone" className="h-6 w-6" />
              {reading ? 'Parar leitura' : 'Ler em voz alta'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setFontScale(s => Math.max(0.75, s - 0.1))
            }}>
              <img src="/src/assets/icons/accessibility-menu/larger.svg" alt="ícone" className="h-6 w-6" />
              Texto maior
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setFontScale(s => Math.min(1.75, s + 0.1))
            }}>
              <img src="/src/assets/icons/accessibility-menu/smaller.svg" alt="ícone" className="h-6 w-6" />
              Texto menor
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
