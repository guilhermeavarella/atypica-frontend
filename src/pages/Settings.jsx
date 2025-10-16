import React, { useState } from 'react'

export default function Settings() {
  const [prefs, setPrefs] = useState({
    notifications: { whatsapp: false, email: true, lms: false },
    accessibility: { tts: true, highContrast: false, font: 'default' }
  })

  const update = (path, value) => {
    setPrefs(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      const parts = path.split('.')
      let ref = copy
      for (let i = 0; i < parts.length - 1; i++) ref = ref[parts[i]]
      ref[parts.at(-1)] = value
      return copy
    })
  }

  const save = () => {
    alert('Preferências salvas (mock).')
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="border rounded p-4 border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold mb-3">Notificações</h2>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={prefs.notifications.whatsapp} onChange={e => update('notifications.whatsapp', e.target.checked)} />
            WhatsApp
          </label>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={prefs.notifications.email} onChange={e => update('notifications.email', e.target.checked)} />
            E-mail
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={prefs.notifications.lms} onChange={e => update('notifications.lms', e.target.checked)} />
            LMS
          </label>
        </article>

        <article className="border rounded p-4 border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold mb-3">Acessibilidade</h2>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={prefs.accessibility.tts} onChange={e => update('accessibility.tts', e.target.checked)} />
            Leitura em voz alta (TTS)
          </label>
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={prefs.accessibility.highContrast} onChange={e => update('accessibility.highContrast', e.target.checked)} />
            Alto contraste por padrão
          </label>
          <div className="mt-2">
            <label className="block text-sm mb-1">Fonte</label>
            <select className="border rounded px-2 py-1 bg-white dark:bg-slate-800" value={prefs.accessibility.font} onChange={e => update('accessibility.font', e.target.value)}>
              <option value="default">Padrão</option>
              <option value="lexend">Lexend</option>
              <option value="open-dyslexic">OpenDyslexic</option>
            </select>
          </div>
        </article>
      </div>

      <div className="mt-6">
        <button className="px-4 py-2 rounded bg-brand text-white" onClick={save}>Salvar Preferências</button>
      </div>
    </section>
  )
}
