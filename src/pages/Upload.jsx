import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Upload() {
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
      <h1 className="text-center text-2xl font-bold font-poppins my-12">Avalie seu Material</h1>
      <div  className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col justify-start items-start gap-9 overflow-hidden">
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full px-6 py-16 bg-background-field rounded-2xl outline outline-1 outline-offset-[-1px] outline-content-tertiary inline-flex flex-col justify-center items-center gap-3 overflow-hidden"
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

        <div className="mt-6 flex gap-3">
          <Button variant="primary" text="Enviar e Avaliar" onClick={onUpload} disabled={!file || loading}>
            {loading ? 'Enviando...' : 'Enviar e Analisar'}
          </Button>
          <Button variant="secondary" text="Cancelar" onClick={() => window.history.back()} />
        </div>
      </div>
    </section>
  )
}
