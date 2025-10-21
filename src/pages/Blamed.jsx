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
  const [requirements, setRequirements] = useState([])
  const [unsatisfiedRequirements, setUnsatisfiedRequirements] = useState([])
  const [satisfiedRequirements, setSatisfiedRequirements] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRequirements, setSelectedRequirements] = useState([])
  const { handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlamed = async () => {
      try {
        // const { data } = await api.get(`/blame/${jobId}`) // API CALL
        const response = await fetch("/mocks/blamed.json") // Mocked response
        const data = await response.json()
        
        if (data?.requirements) {
          // Set the full requirements array first (unchanged)
          setRequirements(data.requirements)

          // Categorize into satisfied and unsatisfied
          const unsatisfied = data.requirements.filter(req => req.satisfied === false)
          const satisfied = data.requirements.filter(req => req.satisfied === true)

          setUnsatisfiedRequirements(unsatisfied) 
          setSatisfiedRequirements(satisfied)
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


    fetchBlamed()
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

  const onSubmit = () => {
    const selectedData = { selectedRequirements }
    console.log(selectedData)
    // INSERIR SUBMIT PARA A API
    navigate(`/solutioned/${jobId}`);
  }

  if (loading) return <p className="text-center mt-8 font-medium">Avaliando...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4 gap-6">
      <h1 className="text-center text-2xl font-bold font-poppins my-6">Sua avaliação</h1>
      {satisfiedRequirements.length === 0 ? ( null ) : (
      <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
        <div className="w-full inline-flex flex-col justify-start items-start gap-1">
          <div className="text-2xl font-semibold font-poppins">Destaques</div>
          <p className="text-content-secondary">Abaixo estão os pontos positivos que tornam seu material acessível a todos.</p>
        </div>

        <div className="w-full accordion accordion-flush">
          <div className="flex flex-col gap-6">

              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue=""
              >
              {satisfiedRequirements.map((req) => (
              <div>
                <AccordionItem key={req.id} value={req.id.toString()}>
                  <AccordionTrigger key={req.id} value={req.id.toString()}>{req.name}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      {req.justification}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                </div>
              
            ))}
            </Accordion>
          </div>
        </div>
      </section>
      )}

      <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
        <div className="w-full inline-flex flex-col justify-start items-start gap-1">
          <div className="text-2xl font-semibold font-poppins">Seus pontos de melhoria</div>
          <p className="text-content-secondary">Abaixo estão os pontos que podem ser melhorados no seu material. Clique em cada um para ver a justificativa.</p>
        </div>

        <div className="w-full accordion accordion-flush" id="accordionFlushExample">
          {unsatisfiedRequirements.length === 0 ? (
            <p className="text-lg text-center font-semibold text-brand-primary my-4">
              Seu material está excelente! Não encontramos problemas de acessibilidade.
            </p>
          ) 
          : (
            <div className="flex flex-col gap-6">

                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue=""
                >
                {unsatisfiedRequirements.map((req) => (
                <div>
                  <AccordionItem key={req.id} value={req.id.toString()}>
                    <AccordionTrigger key={req.id} value={req.id.toString()}>
                        <Checkbox key={req.id} 
                          checked={selectedRequirements.includes(req.id)} 
                          onCheckedChange={() => handleCheckboxChange(req.id)}>
                        </Checkbox>
                        {req.name}
                      </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p>
                        {req.justification}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  </div>
                
              ))}
              </Accordion>
            </div>
          )}
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
