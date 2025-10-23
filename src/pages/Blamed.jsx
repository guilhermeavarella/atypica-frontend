import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, } from "../components/RequirementAccordion"
import Button from "../components/Button"
import { Checkbox } from "../components/Checkbox"
import { useForm } from 'react-hook-form';
import { Check } from "lucide-react"

export default function Blamed() {
  const { jobId } = useParams()
  const [unsatisfiedBlamings, setUnsatisfiedBlamings] = useState([])
  const [satisfiedBlamings, setSatisfiedBlamings] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRequirements, setSelectedRequirements] = useState([])
  const { handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    function formatRequirementName(requirement) {
      const [id, name] = requirement.requirement_name.split(" - ");
      if (!name) return requirement.requirement_name;
      return name.charAt(0) + name.slice(1).toLowerCase();
    }
    const fetchRequirements = async (reqId) => {
      const { data } = await api.get(`/get_requirement_definition?requirement_id=${reqId}`) // API CALL
      return data
    }

    const separateQuestions = async (blamings) => {
      const grouped = new Map()

      for (const blaming of blamings) {
        const qid = blaming.question_id
        if (!grouped.has(qid)) {
          grouped.set(qid, [])
        }
        grouped.get(qid).push(blaming)
      }

      return Array.from(grouped.entries()).map(([qid, blamings]) => ({
        question_id: qid,
        blamings,
      })).sort((a, b) => a.question_id - b.question_id)
    }


    const formatBlamings = async (data) => {
      const unsatisfied = []
      const satisfied = []
      for (let i = 0; i < data.length; i++) {
        const requirementDetails = await fetchRequirements(data[i].requirement_id)
        data[i].requirement_name = formatRequirementName(requirementDetails)

        if (data[i].satisfied) {
          satisfied.push(data[i])
        } else {
          unsatisfied.push(data[i])
        }
      }
      
      setUnsatisfiedBlamings(await separateQuestions(unsatisfied))
      setSatisfiedBlamings(await separateQuestions(satisfied))
    }

    const fetchBlamings = async () => {
      try {
        const { data } = await api.get(`/blame`) // API CALL
        
        if (data) {
          await formatBlamings(data)
        } else {
          setError("Resposta inesperada do servidor.")
        }
      } catch (err) {
        console.error(err)
        setError("Falha ao carregar avaliação.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlamings()
  }, [jobId]) 

  const handleCheckboxChange = (reqId) => {
    setSelectedRequirements((prevSelected) => {
      if (prevSelected.includes(reqId)) {
        return prevSelected.filter(id => id !== reqId)
      } else {
        return [...prevSelected, reqId]
      }
    })
  }

  const totalBlamings = unsatisfiedBlamings.length + satisfiedBlamings.length

  const onSubmit = () => {
    const selectedData = { selectedRequirements }
    console.log(selectedData)
    // INSERIR SUBMIT PARA A API
    navigate(`/adapted/${jobId}`);
  }

  if (loading) return <p className="text-center mt-8 text-xl font-semibold text-brand-primary">Avaliando...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>
  if (unsatisfiedBlamings.length === 0) return (
    <section className="w-full p-12 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col items-center gap-9">
      <p className="text-center text-lg font-semibold text-brand-primary">Parabéns! Seu material está excelente! Não encontramos problemas de acessibilidade.</p>
      <div className="flex flex-col w-64 justify-center gap-2">
        <Button variant="primary" text="Avaliar novo material" onClick={() => navigate(`/upload`)} />
        <Button variant="secondary" text="Voltar ao início" onClick={() => navigate(`/home`)} />
      </div>
    </section>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4 gap-6">
      <h1 className="text-center text-2xl font-bold font-poppins my-6">Sua avaliação completa</h1>

      {satisfiedBlamings.length < totalBlamings/2 ? (
        <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
          <div className="w-full inline-flex flex-col justify-start items-start gap-1">
            <div className="text-2xl font-semibold font-poppins">Seu material pode melhorar!</div>
            <p className="text-content-secondary">Existem requisitos de acessibilidade que podem ser melhorados no seu material. Confira os pontos positivos e negativos.</p>
          </div>
          <p className="text-sm font-semibold text-brand-primary-light">Aspectos acessíveis no seu material: <b className="text-m">{satisfiedBlamings.length}/{totalBlamings}</b></p>
        </section>
      ) : (
        <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
          <div className="w-full inline-flex flex-col justify-start items-start gap-1">
            <div className="text-2xl font-semibold font-poppins">Parabéns! Seu material já está bem acessível</div>
            <p className="text-content-secondary">Mas ainda há o que melhorar. Confira os pontos positivos e negativos.</p>
          </div>
          <p className="text-sm font-semibold text-brand-primary-light">Aspectos acessíveis no seu material: <b className="text-m">{satisfiedBlamings.length}/{totalBlamings}</b></p>
        </section>
      )}

      {satisfiedBlamings.length === 0 ? ( null ) : (
        <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
          <div className="w-full inline-flex flex-col justify-start items-start gap-1">
            <div className="text-2xl font-semibold font-poppins">Destaques</div>
            <p className="text-content-secondary">Abaixo estão os pontos positivos que tornam seu material acessível a todos.</p>
          </div>

          <div className="w-full accordion accordion-flush">
            <div className="flex flex-col gap-6">
              {satisfiedBlamings.map((question) => (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full px-9"
                  defaultValue=""
                  key={`question_id_${question.question_id}`}
                >
                    <p className="text-lg font-semibold mb-2">Questão {question.question_id}</p>
                    {question.blamings.map((blaming) => (
                      <div>
                        <AccordionItem key={`${blaming.question_id}${blaming.requirement_id}`} value={`${blaming.question_id}${blaming.requirement_id}`}>
                          <AccordionTrigger key={`${blaming.question_id}${blaming.requirement_id}`} value={`${blaming.question_id}${blaming.requirement_id}`}>
                            <div className="flex gap-2">
                              {blaming.requirement_name}
                            </div>
                            <p className="shrink-0 text-brand-primary font-semibold hover:underline">Por quê?</p>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col text-pretty">
                            <p>
                              {blaming.analysis}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
        <div className="w-full inline-flex flex-col justify-start items-start gap-1">
          <div className="text-2xl font-semibold font-poppins">Seus pontos de melhoria</div>
          <p className="text-content-secondary">Abaixo estão os pontos que podem ser melhorados no seu material. Clique em cada um para ver a justificativa.</p>
        </div>

        <div className="w-full accordion accordion-flush">
            <div className="flex flex-col gap-6">
              {unsatisfiedBlamings.map((question) => (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full px-9"
                  defaultValue=""
                  key={`question_id_${question.question_id}`}
                >
                    <p className="text-lg font-semibold mb-2"> {question.question_id === 0 ? "Geral" : `Questão ${question.question_id}`}</p>
                    {question.blamings.map((blaming) => (
                      <div>
                        <AccordionItem key={`${blaming.question_id}${blaming.requirement_id}`} value={`${blaming.question_id}${blaming.requirement_id}`}>
                          <AccordionTrigger key={`${blaming.question_id}${blaming.requirement_id}`} value={`${blaming.question_id}${blaming.requirement_id}`}>
                            <div className="flex gap-2">
                              <Checkbox key={`${blaming.question_id}/${blaming.requirement_id}`} 
                                checked={selectedRequirements.includes(`${blaming.question_id}/${blaming.requirement_id}`)} 
                                onCheckedChange={() => handleCheckboxChange(`${blaming.question_id}/${blaming.requirement_id}`)}>
                              </Checkbox>
                              {blaming.requirement_name}
                            </div>
                            <p className="shrink-0 text-brand-primary font-semibold hover:underline">Por quê?</p>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col text-pretty ml-9">
                            <p>
                              {blaming.analysis}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
      </section>

      <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
        <div className="w-full inline-flex flex-col justify-start items-start gap-1">
          <h1 className="text-2xl font-semibold font-poppins">Deseja melhorar o material?</h1>
          <p className="text-content-secondary">Por favor, selecione acima os aspectos que deseja melhorar.</p>
        </div>
        <div className="w-full inline-flex flex-row justify-start items-center gap-4">
          <p className="text-sm font-semibold text-brand-primary-light">{selectedRequirements.length} aspectos selecionados:</p>
          <Button variant="primary" text="Melhorar meu material" type="submit" onClick={() => {handleSubmit()}} />
        </div>
      </section>
    </form>
  )
}
