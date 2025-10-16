import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'

const mockHistory = [
  { id: 'job-101', name: 'Frações - 6º ano.pdf', date: '2025-09-15', level: 'yellow' },
  { id: 'job-102', name: 'Fotossíntese - 1º EM.pdf', date: '2025-09-14', level: 'green' },
  { id: 'job-103', name: 'Derivadas - Cálculo I.pdf', date: '2025-09-12', level: 'red' }
]

export default function Dashboard() {
  return (
    <section aria-labelledby="dash-title">
      <div className="flex items-center justify-between mb-4">
        <h1 id="dash-title" className="text-2xl font-bold">Dashboard</h1>
        <Link to="/upload" className="px-3 py-2 rounded bg-brand text-white font-semibold">+ Novo Upload</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <article className="p-4 rounded border border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold mb-2">Indicadores</h2>
          <div className="flex gap-2 items-center">
            <Badge level="green" label="Bom" />
            <Badge level="yellow" label="Atenção" />
            <Badge level="red" label="Crítico" />
          </div>
        </article>
        <article className="p-4 rounded border border-slate-200 dark:border-slate-700 md:col-span-2">
          <h2 className="font-semibold mb-2">Histórico</h2>
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {mockHistory.map(h => (
              <li key={h.id} className="py-2 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-slate-500">{h.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge level={h.level} />
                  <Link className="underline" to={`/analysis/${h.id}`}>Ver</Link>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
