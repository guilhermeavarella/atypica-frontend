import React, { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Comments from '../components/Comments'

import ProfileIcon from '../assets/icons/profile.svg'
import CommentIcon from '../assets/icons/comments.svg'
import SearchIcon from '../assets/icons/search.svg'

function formatTimeAgo(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) {
    return "agora mesmo"; 
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  }

  const days = Math.round(hours / 24);
  if (days < 30) {
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  }

  const months = Math.round(days / 30.44); 
  if (months < 12) {
    return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
  }

  const years = Math.round(days / 365.25); 
  return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
}

const MOCK_TOPICS = [
  {
    id: 'mock-1',
    author: { name: 'Carlos Almeida', avatar: null },
    title: 'Como adaptar textos longos para alunos com TDAH?',
    content:
      'Tenho trabalhado com a adaptação de textos escolares e percebi que alunos com TDAH se beneficiam muito de divisões curtas e visuais no conteúdo. Alguém mais tem sugestões de boas práticas ou ferramentas para tornar a leitura mais acessível e envolvente?',
    createdAt: new Date().getTime() - 14 * 60 * 60 * 1000,
    comments: [
      { author: 'Marina Lopes', text: 'Uso ícones e cores para destacar trechos importantes, ajuda muito na atenção! 🎨' },
      { author: 'Rafael S.', text: 'Também recomendo incluir pausas e resumos rápidos entre os parágrafos.' },
    ],
  },
  {
    id: 'mock-2',
    author: { name: 'Julio Passos de Souza', avatar: null },
    title: 'Compartilhando um material adaptado de Ciências',
    content:
      'Adaptei um material de Ciências sobre o sistema solar com linguagem simplificada e ilustrações contrastantes. O app facilitou muito o processo! Estou deixando aqui o link para quem quiser testar e sugerir melhorias.',
    createdAt: new Date().getTime() - 25 * 60 * 60 * 1000,
    comments: [
      { author: 'Lívia Campos', text: 'Ficou excelente, Julio! As imagens são bem claras e fáceis de entender. 🌍' },
      { author: 'André M.', text: 'Adorei! Acho que vou adaptar o de Geografia com base no seu modelo.' },
    ],
  },
  {
    id: 'mock-3',
    author: { name: 'Ariane Junior', avatar: null },
    title: 'Dúvida: como deixar os materiais mais inclusivos para dislexia?',
    content:
      'Olá, pessoal! Estou produzindo um material para alunos com dislexia e gostaria de sugestões de fontes, espaçamento e estilos visuais que melhorem a leitura. Alguém aqui já experimentou recursos específicos dentro do app?',
    createdAt: new Date().getTime() - 560 * 60 * 60 * 1000,
    comments: [
      { author: 'Fernando Vieira', text: 'Uso a fonte OpenDyslexic e aumento o espaçamento entre linhas, ajuda bastante.' },
      { author: 'Paula Reis', text: 'Também evito blocos longos de texto — separo por cores e ícones.' },
    ],
  },
  {
    id: 'mock-4',
    author: { name: 'Carlos Almeida', avatar: null },
    title: 'Conteúdos informativos sobre neurodiversidade',
    content:
      'Sugiro que o app tenha uma seção de artigos curtos explicando os diferentes tipos de neurodivergência. Isso ajuda professores e colegas a entenderem melhor as necessidades e fortalece a empatia no ambiente escolar.',
    createdAt: new Date().getTime() - 72 * 60 * 60 * 1000,
    comments: [
      { author: 'Ana Paula', text: 'Excelente ideia, Carlos! Informação é a base da inclusão. 💡' },
      { author: 'João Victor', text: 'Podemos até incluir histórias reais de adaptação bem-sucedida.' },
    ],
  },
  {
    id: 'mock-5',
    author: { name: 'Julio Passos de Souza', avatar: null },
    title: 'Feedback sobre a ferramenta de compartilhamento',
    content:
      'Notei que o compartilhamento de materiais adaptados funciona bem, mas poderia ter uma aba de recomendações — tipo “usuários que adaptaram este material também gostaram de...”. O que acham dessa melhoria?',
    createdAt: new Date().getTime() - 8 * 60 * 60 * 1000,
    comments: [
      { author: 'Clara N.', text: 'Seria ótimo! Facilitaria encontrar recursos parecidos rapidamente. 🔎' },
      { author: 'Rafael S.', text: 'Concordo, Julio. Isso deixaria a experiência mais colaborativa.' },
    ],
  },
]


export default function Forum() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [openComposer, setOpenComposer] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: '', content: '' })
  const [selected, setSelected] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/forum')
      let finalTopics = data.topics || []
      if (finalTopics.length === 0) {
        finalTopics = MOCK_TOPICS
      }
      setTopics(finalTopics)
    } catch (error) {
      console.error('Erro ao carregar API, usando MOCK:', error)
      setTopics(MOCK_TOPICS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filteredSorted = useMemo(() => {
    let list = [...topics]
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => b.createdAt - a.createdAt)
    return list
  }, [topics, query])

  const createTopic = async (e) => {
    e?.preventDefault?.()
    if (!newTopic.title.trim() || !newTopic.content.trim()) return
    await api.post('/forum', { ...newTopic })
    setNewTopic({ title: '', content: '' })
    setOpenComposer(false)
    load()
  }

  const handleAddComment = async (text) => {
    if (!selected) return
    try {
      await api.post(`/forum/${selected.id}/comments`, { text })
      await load()
    } catch (error) {
      console.error('Erro ao comentar:', error)
    }
  }

  return (
    <section className="p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-poppins text-[2rem] font-bold text-content-primary">
          Central da comunidade
        </h1>
        <Button variant="primary" text="Publicar" onClick={() => setOpenComposer(true)} />
      </div>

      {/* Container principal */}
      <div className="bg-background-fixed-white border border-content-light rounded-[30px] p-6 pb-12 shadow-sm">
        {/* Barra de busca */}
        <div className="relative mb-8">
          <img
            src={SearchIcon}
            alt="Buscar"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-light"
          />
          <input
            className="w-full pl-11 pr-4 py-2 border border-content-tertiary rounded-2xl text-sm bg-background-fixed-white focus:outline-none"
            placeholder="Buscar por um título, conteúdo ou material"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Lista de tópicos */}
        {loading ? (
          <p>Carregando…</p>
        ) : (
          <ul className="flex flex-col gap-4 pl-8 pr-8">
            {filteredSorted.map((t) => (
              <li
                key={t.id}
                className="border border-content-tertiary rounded-3xl p-5 hover:bg-background-purple-light transition"
              >
                <button
                  className="text-left w-full"
                  onClick={() => setSelected(t)}
                >
                  {/* Autor */}
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={ProfileIcon}
                      alt="Perfil"
                      className="w-8 h-8"
                    />
                    <div className="font-poppins text-sm flex items-baseline gap-2 text-brand-primary">
                      <p className="font-semibold">
                        {t.author.name} •
                      </p>
                      <p className="text-xs">
                        {formatTimeAgo(t.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <h3 className="font-semibold text-xl text-content-primary">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-content-secondary">
                    {t.content}
                  </p>

                  {/* Comentários */}
                  <div className="mt-3">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-brand-primary-light text-content-inverse">
                      <img src={CommentIcon} alt="Comentários" className="w-5 h-5" />
                      {(t.comments || []).length}
                    </button>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de novo tópico */}
        <Modal
          open={openComposer}
          onClose={() => setOpenComposer(false)}
          title="Novo tópico"
          actions={
            <>
              <Button variant="secundary" text="Cancelar" onClick={() => setOpenComposer(false)} />
              <Button variant="primary" text="Publicar" onClick={createTopic} />
            </>
          }
        >
          <form className="grid gap-3" onSubmit={createTopic}>
            <label className="block">
              <span className="text-sm font-medium">Título</span>
              <input
                className="w-full px-3 py-2 border rounded bg-background-fixed-white"
                value={newTopic.title}
                onChange={(e) =>
                  setNewTopic((v) => ({ ...v, title: e.target.value }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Conteúdo</span>
              <textarea
                className="w-full px-3 py-2 border rounded bg-background-fixed-white"
                rows={5}
                value={newTopic.content}
                onChange={(e) =>
                  setNewTopic((v) => ({ ...v, content: e.target.value }))
                }
                required
              />
            </label>
          </form>
        </Modal>

        {/* Drawer lateral para comentários */}
        {selected && (
          <div className="fixed inset-0 z-40" aria-modal="true" role="dialog">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSelected(null)}
            />
            <aside className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-background-fixed-white border-l border-content-light shadow-xl p-4 overflow-y-auto">
              <div className="flex items-start justify-end">
                <button
                  className="px-2 py-1 rounded border text-slate-500 hover:text-slate-700"
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                >
                  ✕
                </button>
              </div>

              {/* Cabeçalho do post */}
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={ProfileIcon}
                  alt="Perfil"
                  className="w-8 h-8"
                />
                <div className="font-poppins text-sm flex items-baseline gap-2 text-brand-primary">
                  <p className="font-semibold">
                    {selected.author.name} •
                  </p>
                  <p className="text-xs">
                    {formatTimeAgo(selected.createdAt)}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-4 text-content-primary">
                {selected.title}
              </h2>
              <p className="mt-2 text-content-secondary whitespace-pre-line">
                {selected.content}
              </p>

              <Comments
                comments={selected.comments || []}
                onAddComment={handleAddComment}
              />
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
