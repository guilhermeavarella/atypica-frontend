import React from 'react'

export default function Help() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Ajuda e Suporte</h1>

      <article className="border rounded p-4 border-slate-200 dark:border-slate-700 mb-6">
        <h2 className="font-semibold mb-2">FAQ</h2>
        <details>
          <summary className="cursor-pointer">Como envio um PDF?</summary>
          <div className="mt-2 text-sm">Vá até <strong>Upload</strong>, arraste o PDF para a área indicada e clique em Enviar.</div>
        </details>
        <details className="mt-2">
          <summary className="cursor-pointer">Como funcionam as sugestões?</summary>
          <div className="mt-2 text-sm">O sistema gera uma lista com melhorias de linguagem, exemplos e recursos multimodais. Você pode aceitar todas ou revisar item a item.</div>
        </details>
      </article>

      <article className="border rounded p-4 border-slate-200 dark:border-slate-700 mb-6">
        <h2 className="font-semibold mb-2">Vídeo demonstrativo (com legenda e Libras)</h2>
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">Vídeo (mock)</div>
      </article>

      <article className="border rounded p-4 border-slate-200 dark:border-slate-700">
        <h2 className="font-semibold mb-2">Contato</h2>
        <form className="grid gap-3 max-w-lg">
          <label className="block">
            <span className="text-sm">E-mail</span>
            <input className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" type="email" required />
          </label>
          <label className="block">
            <span className="text-sm">Mensagem</span>
            <textarea className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" rows={4} required />
          </label>
          <button className="px-4 py-2 rounded bg-brand text-white" onClick={(e) => { e.preventDefault(); alert('Mensagem enviada (mock).') }}>Enviar</button>
        </form>
      </article>
    </section>
  )
}
