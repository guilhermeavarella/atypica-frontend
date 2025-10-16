import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  return (
    <section className="max-w-md mx-auto mt-10 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
      <h1 className="text-2xl font-bold mb-2">Bem-vindo(a) ao Atypica</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">Adapte materiais conforme o DUA e compartilhe boas práticas.</p>
      <button className="w-full py-2 rounded bg-brand text-white font-semibold" onClick={() => navigate('/dashboard')}>Entrar com Google (mock)</button>
      <p className="mt-4 text-sm text-slate-500">Ou continue com e-mail (mock)</p>
      <form className="mt-2" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}>
        <label className="block mb-2">
          <span className="block text-sm">E-mail</span>
          <input className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" type="email" required />
        </label>
        <label className="block mb-4">
          <span className="block text-sm">Senha</span>
          <input className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-800" type="password" required />
        </label>
        <button className="w-full py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold" type="submit">Entrar</button>
      </form>
    </section>
  )
}
