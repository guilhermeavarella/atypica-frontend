import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [level, setLevel] = useState('fundamental')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  const onUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('level', level)
      const { data } = await api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate(`/analysis/${data.jobId}`)
    } catch (e) {
      alert('Falha no upload (mock).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Upload de Material</h1>

      <div className="mb-4">
        <label className="block mb-1">Nível de ensino</label>
        <select className="border rounded px-3 py-2 bg-white dark:bg-slate-800" value={level} onChange={e => setLevel(e.target.value)}>
          <option value="fundamental">Fundamental</option>
          <option value="medio">Médio</option>
          <option value="superior">Superior</option>
          <option value="eja">EJA</option>
        </select>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded p-10 text-center bg-slate-50 dark:bg-slate-800/40"
        aria-label="Área de soltar arquivo"
      >
        {file ? (
          <div>
            <p className="mb-2">Selecionado: <strong>{file.name}</strong></p>
            <button className="px-3 py-2 rounded bg-brand text-white" onClick={() => setFile(null)}>Trocar</button>
          </div>
        ) : (
          <>
            <p className="mb-2">Arraste e solte seu PDF aqui</p>
            <p className="mb-4 text-sm text-slate-500">ou</p>
            <label className="inline-block px-3 py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 cursor-pointer">
              Selecionar arquivo
              <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 rounded bg-brand text-white disabled:opacity-50" onClick={onUpload} disabled={!file || loading}>
          {loading ? 'Enviando...' : 'Enviar e Analisar'}
        </button>
        <button className="px-4 py-2 rounded border" onClick={() => window.history.back()}>Cancelar</button>
      </div>
    </section>
  )
}
