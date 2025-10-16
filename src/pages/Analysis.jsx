import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function Analysis() {
  const { jobId } = useParams()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('in_queue')
  const navigate = useNavigate()

  useEffect(() => {
    if (!jobId) return
    let timer = null

    const fetchStatus = async () => {
      try {
        const { data } = await api.get(`/status/${jobId}`)
        setProgress(data.progress)
        setStatus(data.status)
        if (data.status === 'completed') {
          navigate(`/suggestions/${jobId}`)
        }
      } catch (e) {
        // silent fail for mock
      }
    }

    fetchStatus()
    timer = setInterval(fetchStatus, 1200)
    return () => clearInterval(timer)
  }, [jobId, navigate])

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Análise em Progresso</h1>
      <div className="max-w-xl">
        <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">Status: {status}</div>
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded">
          <div className="h-3 bg-brand rounded" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 text-sm">{progress}%</div>
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-300">Você será redirecionado(a) para as sugestões quando a análise terminar.</p>
    </section>
  )
}
