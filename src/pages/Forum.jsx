import React, { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import Modal from '../components/Modal'
import Pill from '../components/Pill'

export default function Forum() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  // Command bar state
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent') // 'recent' | 'likes'
  const [level, setLevel] = useState('all') // 'all' | fundamental | medio | superior | eja
  const [view, setView] = useState('grid') // 'grid' | 'list'

  // Composer state (modal)
  const [openComposer, setOpenComposer] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: '', content: '', level: 'fundamental', tags: '' })

  // Details drawer state
  const [selected, setSelected] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/forum')
      setTopics(data.topics || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filteredSorted = useMemo(() => {
    let list = [...topics]
    if (level !== 'all') list = list.filter(t => t.level === level)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q) ||
        (t.tags || []).some(tag => tag.toLowerCase().includes(q))
      )
    }
    if (sort === 'recent') list.sort((a,b) => b.createdAt - a.createdAt)
    if (sort === 'likes') list.sort((a,b) => b.likes - a.likes)
    return list
  }, [topics, query, level, sort])

  const createTopic = async (e) => {
    e?.preventDefault?.()
    if (!newTopic.title.trim()) return
    await api.post('/forum', { ...newTopic, tags: newTopic.tags.split(',').map(t => t.trim()).filter(Boolean) })
    setNewTopic({ title: '', content: '', level: 'fundamental', tags: '' })
    setOpenComposer(false)
    load()
  }

  const like = async (id) => {
    await api.post(`/forum/${id}/like`)
    load()
  }

  const addComment = async (id, text) => {
    if (!text.trim()) return
    await api.post(`/forum/${id}/comments`, { text })
    // Keep drawer open on refresh
    const sel = selected?.id === id ? selected : null
    await load()
    if (sel) setSelected(topics.find(t => t.id === id) || null)
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Fórum e Comunidade</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded bg-brand text-white" onClick={() => setOpenComposer(true)}>+ Novo</button>
        </div>
      </div>

      {/* Command Bar */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex-1">
          <label className="sr-only" htmlFor="forum-search">Buscar</label>
          <input id="forum-search" className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" placeholder="Buscar por título, conteúdo ou tag" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm" htmlFor="forum-level">Nível</label>
          <select id="forum-level" className="px-2 py-2 border rounded bg-white dark:bg-slate-800" value={level} onChange={e => setLevel(e.target.value)}>
            <option value="all">Todos</option>
            <option value="fundamental">Fundamental</option>
            <option value="medio">Médio</option>
            <option value="superior">Superior</option>
            <option value="eja">EJA</option>
          </select>
          <label className="text-sm" htmlFor="forum-sort">Ordenar</label>
          <select id="forum-sort" className="px-2 py-2 border rounded bg-white dark:bg-slate-800" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recent">Mais recentes</option>
            <option value="likes">Mais curtidos</option>
          </select>
          <div className="ml-2 inline-flex rounded overflow-hidden border">
            <button className={`px-3 py-2 ${view==='grid' ? 'bg-slate-200 dark:bg-slate-700' : ''}`} onClick={() => setView('grid')} aria-pressed={view==='grid'}>Grade</button>
            <button className={`px-3 py-2 ${view==='list' ? 'bg-slate-200 dark:bg-slate-700' : ''}`} onClick={() => setView('list')} aria-pressed={view==='list'}>Lista</button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p>Carregando…</p>
      ) : (
        view === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSorted.map(t => (
              <article key={t.id} className="group border rounded-lg p-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-md transition" role="button" tabIndex={0} onClick={() => setSelected(t)} onKeyDown={(e) => { if (e.key==='Enter') setSelected(t) }}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg line-clamp-2">{t.title}</h3>
                  <button className="px-2 py-1 rounded border text-sm" onClick={(e) => { e.stopPropagation(); like(t.id) }} aria-label={`Curtir tópico ${t.title}`}>👍 {t.likes}</button>
                </div>
                <div className="text-xs text-slate-500 mt-1">{t.level?.toUpperCase()} • {new Date(t.createdAt).toLocaleDateString()}</div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{t.content}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(t.tags||[]).map((tag, i) => <Pill key={i} color="blue">#{tag}</Pill>)}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredSorted.map(t => (
              <li key={t.id} className="py-3 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <button className="text-left" onClick={() => setSelected(t)}>
                    <div className="font-semibold truncate">{t.title}</div>
                    <div className="text-xs text-slate-500">{t.level?.toUpperCase()} • {new Date(t.createdAt).toLocaleString()}</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{t.content}</div>
                    <div className="mt-2 flex flex-wrap gap-2">{(t.tags||[]).map((tag,i)=><Pill key={i} color="blue">#{tag}</Pill>)}</div>
                  </button>
                </div>
                <div className="shrink-0">
                  <button className="px-3 py-1 rounded border" onClick={() => like(t.id)}>👍 {t.likes}</button>
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {/* Composer Modal */}
      <Modal open={openComposer} onClose={() => setOpenComposer(false)} title="Novo tópico" actions={(
        <>
          <button className="px-4 py-2 rounded border" onClick={() => setOpenComposer(false)}>Cancelar</button>
          <button className="px-4 py-2 rounded bg-brand text-white" onClick={createTopic}>Publicar</button>
        </>
      )}>
        <form className="grid gap-3" onSubmit={createTopic}>
          <label className="block">
            <span className="text-sm">Título</span>
            <input className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" value={newTopic.title} onChange={e => setNewTopic(v => ({ ...v, title: e.target.value }))} required />
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm">Nível</span>
              <select className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" value={newTopic.level} onChange={e => setNewTopic(v => ({ ...v, level: e.target.value }))}>
                <option value="fundamental">Fundamental</option>
                <option value="medio">Médio</option>
                <option value="superior">Superior</option>
                <option value="eja">EJA</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm">Tags (vírgula)</span>
              <input className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" placeholder="ex: matemática, multimodal" value={newTopic.tags} onChange={e => setNewTopic(v => ({ ...v, tags: e.target.value }))} />
            </label>
          </div>
          <label className="block">
            <span className="text-sm">Conteúdo</span>
            <textarea className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" rows={5} value={newTopic.content} onChange={e => setNewTopic(v => ({ ...v, content: e.target.value }))} required />
          </label>
          <div>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" /> Permitir anexos (mock)
            </label>
          </div>
        </form>
      </Modal>

      {/* Details Drawer */}
      {selected && (
        <div className="fixed inset-0 z-40" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-xl p-4 overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <div className="text-sm text-slate-500">{selected.level?.toUpperCase()} • {new Date(selected.createdAt).toLocaleString()}</div>
                <div className="mt-2 flex flex-wrap gap-2">{(selected.tags||[]).map((tag,i)=><Pill key={i} color="blue">#{tag}</Pill>)}</div>
              </div>
              <button className="px-2 py-1 rounded border" onClick={() => setSelected(null)} aria-label="Fechar">✕</button>
            </div>
            <p className="mt-4 whitespace-pre-line text-slate-800 dark:text-slate-200">{selected.content}</p>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-500">Curtidas: {selected.likes}</div>
              <button className="px-3 py-1 rounded border" onClick={async () => { await like(selected.id); const updated = (await api.get('/forum')).data.topics.find(t => t.id === selected.id); setSelected(updated) }}>Curtir 👍</button>
            </div>

            <section className="mt-6">
              <h3 className="font-semibold mb-2">Comentários</h3>
              <ul className="space-y-2">
                {selected.comments?.map((c, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="font-medium">{c.author}</span>: {c.text}
                  </li>
                ))}
              </ul>
              <form className="mt-3 flex gap-2" onSubmit={async (e) => { e.preventDefault(); const text = e.currentTarget.com.value; await addComment(selected.id, text); const updated = (await api.get('/forum')).data.topics.find(t => t.id === selected.id); setSelected(updated); e.currentTarget.reset() }}>
                <label className="sr-only" htmlFor="com">Novo comentário</label>
                <input id="com" name="com" className="flex-1 px-3 py-2 border rounded bg-white dark:bg-slate-800" placeholder="Escreva um comentário" />
                <button className="px-3 py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">Enviar</button>
              </form>
            </section>
          </aside>
        </div>
      )}
    </section>
  )
}
