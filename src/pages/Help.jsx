import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Help() {
  const [file, setFile] = useState(null)
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
      console.log('File:', file)
      const { data } = await api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }) // AJUSTAR POST ENDPOINT
      navigate(`/blamed/${data.jobId}`)
    } catch (e) {
      alert('Falha no upload (mock).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1 className="font-poppins text-[2rem] font-bold mt-4 mb-4 text-center">Central de Ajuda</h1>

      <article className="bg-background-fixed-white border rounded-3xl p-[2rem] border-slate-200 dark:border-slate-700 mb-6">
        <h2 className="font-poppins text-2xl font-bold mb-2">Perguntas Frequentes</h2>

        <details>
          <summary className="cursor-pointer">Como envio meu material?</summary>
          <div className="mt-2 text-sm">Vá até <strong>Upload</strong>, arraste o PDF para a área indicada e clique em Enviar.</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">Que tipos de adaptações são feitas para tornar o material acessível?</summary>
          <div className="mt-2 text-sm">O sistema gera uma lista com melhorias de linguagem, exemplos e recursos multimodais. Você pode aceitar todas ou revisar item a item.</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">Posso escolher o tipo de adaptações para tornar o material acessível?</summary>
          <div className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis dolores. Nemo placeat hic nobis nisi vel possimus aperiam necessitatibus, eveniet saepe excepturi, cumque vitae dolorem sequi, assumenda eum veniam?</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">Como encontro materiais já adaptados?</summary>
          <div className="mt-2 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias consequatur ratione asperiores dolor perferendis. Odit doloremque omnis optio delectus quidem neque eveniet dolor sit incidunt! Pariatur modi recusandae autem mollitia.</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">Como compartilho um material adaptado com a comunicade?</summary>
          <div className="mt-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis sed voluptatibus sapiente expedita unde culpa illum quo corporis molestiae iste porro excepturi, modi, voluptatum perferendis. Possimus beatae iste cumque qui.</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">É possível avaliar ou comentar os materiais compartilhados?</summary>
          <div className="mt-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas architecto officiis repudiandae ullam! Aliquid explicabo quia est ex harum libero veniam ea magnam! Repudiandae dolorem minima laboriosam ea numquam ipsa!</div>
        </details>

        <details className="mt-2">
          <summary className="cursor-pointer">Como posso usar os recursos de acessibilidade na plataforma?</summary>
          <div className="mt-2 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum accusamus vitae qui, voluptates aliquid consectetur? Nobis maxime officia iste tempore blanditiis, mollitia incidunt quas, dolore reprehenderit ex, est culpa ducimus?</div>
        </details>
      </article>

      <article className="bg-background-fixed-white border rounded-3xl p-[2rem] border-slate-200 dark:border-slate-700 mb-6">
        <h2 className="font-poppins text-2xl font-bold">Como usar o Atypica?</h2>
        <p className="font-normal mb-2">Assista o video abaixo</p>
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">Vídeo (mock)</div>
      </article>

      <article className="bg-background-fixed-white border rounded-3xl p-[2rem] border-slate-200 dark:border-slate-700">
        <h2 className="font-poppins text-2xl font-bold text-center">Entre em contaFto</h2>
        <p className="font-normal mb-2 text-center">Precisa de ajuda? Fale conosco</p>

        <form className="grid gap-3 max-w-lg mx-auto">
          <label className="block mb-2">
            <span className="block text-sm font-semibold">E-mail</span>
            <input className="w-full h-[2.5rem] px-3.5 py-3 rounded-2xl border border-content-secondary" type="email" />
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-semibold">Nome</span>
            <input className="w-full h-[2.5rem] px-3.5 py-3 rounded-2xl border border-content-secondary" type="text" />
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-semibold">Assunto</span>
            <input className="w-full h-[2.5rem] px-3.5 py-3 rounded-2xl border border-content-secondary" type="text" />
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-semibold">Mensagem</span>
            <textarea className="w-full h-40 px-3.5 py-3 rounded-2xl border border-content-secondary" />
            <span className="block text-xs font-normal">Por favor, escreva sua mensagem para respondermos o mais rápido possivel.</span>
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-semibold">Anexo <strong className='font-thin'>(opcional)</strong></span>
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              className="w-full px-6 py-16 bg-background-field rounded-2xl outline outline-1 outline-content-tertiary inline-flex flex-col justify-center items-center gap-3 overflow-hidden"
              aria-label="Área de soltar arquivo"
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <p>Arquivo: <strong className="text-brand-primary">{file.name}</strong></p>
                  <Button variant="secondary" text="Alterar" onClick={() => setFile(null)} />
                </div>
              ) : (
                <>
                  <p>Arraste e solte seu PDF aqui</p>
                  <p className="text-sm text-content-secondary">ou</p>
                  <Button variant="primary" text="Selecionar arquivo" onClick={() => document.querySelector('input[type=file]').click()} />
                  <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </>
              )}
            </div>
          </label>

          <button className="w-full min-h-[2.25rem] px-[2rem] py-[0.75rem] bg-brand-primary rounded-3xl inline-flex justify-center items-center gap-1" onClick={(e) => { e.preventDefault(); alert('Mensagem enviada (mock).') }}>
            <div className="text-center justify-center text-content-inverse text-sm font-semibold font-poppins">Continuar</div>
          </button>
        </form>
      </article>
    </section>
  )
}
