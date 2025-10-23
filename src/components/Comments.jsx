import React, { useState } from 'react'

export default function Comments({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Chama a função passada pelo componente pai
      await onAddComment(newComment)
      setNewComment('') // Limpa o input em caso de sucesso
    } catch (error) {
      // O componente pai (Forum.jsx) já deve mostrar o alerta
      console.error("Falha ao enviar comentário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-6">
      <h3 className="font-semibold mb-3">Comentários</h3>

      {/* Lista de Comentários */}
      <ul className="space-y-3">
        {(comments && comments.length > 0) ? (
          comments.map((c, idx) => (
            <li key={idx} className="text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="font-medium text-slate-900 dark:text-slate-100">{c.author}</span>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{c.text}</p>
            </li>
          ))
        ) : (
          <li className="text-sm text-slate-500 italic">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </li>
        )}
      </ul>

      {/* Formulário de Novo Comentário */}
      <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="com">Novo comentário</label>
        <input
          id="com"
          name="com"
          className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 disabled:opacity-50"
          placeholder="Escreva um comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    </section>
  )
}