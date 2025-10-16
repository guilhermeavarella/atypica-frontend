import React, { useEffect, useState } from 'react'

export default function AccessibilityBar() {
  const [fontScale, setFontScale] = useState(1)
  const [highContrast, setHighContrast] = useState(false)
  const [reading, setReading] = useState(false)

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
    <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto p-2 flex items-center gap-2 text-sm">
        <span className="sr-only" id="a11ybar">Barra de acessibilidade</span>
        <button className="px-2 py-1 rounded bg-white dark:bg-slate-700" aria-describedby="a11ybar" onClick={() => setFontScale(s => Math.max(0.75, s - 0.1))}>A-</button>
        <button className="px-2 py-1 rounded bg-white dark:bg-slate-700" aria-describedby="a11ybar" onClick={() => setFontScale(s => Math.min(1.75, s + 0.1))}>A+</button>
        <button className="px-2 py-1 rounded bg-white dark:bg-slate-700" aria-pressed={highContrast} aria-describedby="a11ybar" onClick={() => setHighContrast(v => !v)}>
          Alto contraste
        </button>
        <button className="px-2 py-1 rounded bg-white dark:bg-slate-700" onClick={reading ? stop : speakSelection} aria-live="polite">
          {reading ? 'Parar leitura' : 'Ler em voz alta'}
        </button>
      </div>
    </div>
  )
}
