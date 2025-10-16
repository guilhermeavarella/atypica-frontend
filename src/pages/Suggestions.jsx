import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import Badge from '../components/Badge'

export default function Suggestions() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/suggestions/${jobId}`)
        setItems(data.items || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [jobId])

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter(i => i.category === filter)
  }, [items, filter])

  const acceptAll = () => {
    alert('Alterações aceitas (mock).')
    navigate(`/preview/${jobId}`)
  }

  if (loading) return <p>Carregando…</p>

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Sugestões de Acessibilidade</h1>
        <div className="flex gap-2 items-center">
          <label className="text-sm">Filtro</label>
          <select className="border rounded px-2 py-1 bg-white dark:bg-slate-800" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="linguagem">Clareza de linguagem</option>
            <option value="exemplos">Exemplos diversos</option>
            <option value="multimodal">Recursos multimodais</option>
          </select>
          <button className="px-3 py-2 rounded bg-brand text-white" onClick={acceptAll}>Aceitar alterações</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((s, idx) => (
          <article key={idx} className="border rounded p-4 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">{s.title}</h2>
              <Badge level={s.level} />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{s.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">Original</h3>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 text-sm whitespace-pre-line">{s.original}</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Sugerido</h3>
                <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 text-sm whitespace-pre-line">{s.suggested}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
