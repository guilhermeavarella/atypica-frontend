import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, } from "../components/RequirementAccordion"
import Button from "../components/Button"

export default function Adapted() {
  const { jobId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adaptations, setAdaptations] = useState([])
  const [blamings, setBlamings] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blamingsResponse = await api.get(`/blame`) // API CALL
        setBlamings(blamingsResponse.data)

        const adaptationsResponse = await api.get(`/adaptations`) // API CALL
        if (!adaptationsResponse.data) {
          setError("Resposta inesperada do servidor.")
          return
        }
        setAdaptations(adaptationsResponse.data)
      } catch (err) {
        console.error(err)
        setError("Falha ao carregar material.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [jobId])

  const onPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const onNext = () => {
    if (currentQuestionIndex < adaptations.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }


  if (loading) return <p className="text-center mt-8 text-xl font-semibold text-brand-primary">Carregando...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

  return (
      <section className="flex flex-col py-4 gap-6">
        <h1 className="text-center text-2xl font-bold font-poppins my-6">Material melhorado</h1>
        <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">

          { currentQuestionIndex <= adaptations.length ? (
            <div className="w-full inline-flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full max-w-[50%] flex flex-col items-center gap-8">
                <div className="whitespace-pre-line flex flex-col gap-2">
                  <p className="text-lg font-semibold">Questão original</p>
                  <div className="w-full p-4 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light">
                    <p className="text-sm font-normal text-pretty">{adaptations[currentQuestionIndex].old_question}</p>
                  </div>
                </div>
                <div className="whitespace-pre-line flex flex-col gap-2">
                  <p className="text-lg font-semibold">Questão adaptada</p>
                  <div className="w-full p-4 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light">
                    <p className="text-sm font-normal text-pretty">{adaptations[currentQuestionIndex].new_question}</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <p className="text-lg font-semibold">O que mudou?</p>
                
                <div className="w-full p-4 flex flex-col rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light gap-2">
                  <div className="whitespace-pre-line flex flex-col gap-2">
                    <p className="text-sm text-center font-semibold">Resumo das mudanças</p>
                    <p className="text-sm font-normal text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  <div className="whitespace-pre-line flex flex-col gap-2">
                    <p className="text-sm text-center font-semibold">Adaptações</p>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue=""
                    >
                        {adaptations[currentQuestionIndex].requirements_ids.map((reqId, i) => (
                          <div>
                            <AccordionItem key={`${reqId}`} value={`${reqId}`}>
                              <AccordionTrigger key={`${reqId}`} value={`${reqId}`}>
                                Adaptação ao requisito {reqId}
                              </AccordionTrigger>
                              <AccordionContent className="flex flex-col text-pretty">
                                <p>
                                  {adaptations[currentQuestionIndex].changes[i]}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full inline-flex flex-col md:flex-row items-center md:items-start gap-6 ">
              <div className="w-full max-w-[50%] text-lg font-semibold font-poppins">
                Wrong
              </div>
              <div className="w-full max-w-[50%] text-lg font-semibold font-poppins">
                Wrong
              </div>
            </div>
          )}

          <div className="w-full flex flex-row justify-between">
            <Button variant="primary" text="Questão anterior" onClick={() => {onPrevious()}}></Button>
            <Button variant="primary" text="Próxima questão" onClick={() => {onNext()}}></Button>
          </div>
        </section>
      </section>
  )
}