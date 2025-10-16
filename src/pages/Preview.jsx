import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Preview() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const download = () => {
    alert('Download iniciado (mock).')
  }

  const shareToForum = () => {
    alert('Compartilhado no fórum (mock).')
    navigate('/forum')
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Pré-visualização do Material Corrigido</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded border" onClick={() => navigate(-1)}>Voltar</button>
          <button className="px-3 py-2 rounded bg-brand text-white" onClick={download}>Baixar PDF</button>
          <button className="px-3 py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" onClick={shareToForum}>Compartilhar no Fórum</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <article className="border rounded p-4 border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold mb-2">Visualização</h2>
          <div className="h-96 rounded bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500">PDF (mock) – Job {jobId}</div>
        </article>
        <article className="border rounded p-4 border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold mb-2">Ajustes rápidos</h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="block font-medium">Contraste</label>
              <div className="flex gap-2 mt-1">
                <button className="px-2 py-1 rounded border">Padrão</button>
                <button className="px-2 py-1 rounded border">Alto contraste</button>
              </div>
            </div>
            <div>
              <label className="block font-medium">Fonte</label>
              <div className="flex gap-2 mt-1">
                <button className="px-2 py-1 rounded border">A-</button>
                <button className="px-2 py-1 rounded border">A+</button>
              </div>
            </div>
            <div>
              <label className="block font-medium">Leitura em voz alta</label>
              <div className="flex gap-2 mt-1">
                <button className="px-2 py-1 rounded border">Ler página</button>
                <button className="px-2 py-1 rounded border">Parar</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
