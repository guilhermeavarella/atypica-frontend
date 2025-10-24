import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from '../components/Button'

const mockResources = [
  { title: "Práticas inclusivas em ambiente educacional", description: "Entenda como a linguagem simples e outras..." },
  { title: "Como lecionar de forma acessível e consciente", description: "Exemplos práticos de como adaptar modelos..." },
  { title: "Neurodiversidade: verdades e práticas", description: "Definições, ideias errôneas e exemplos reais..." }
]

const mockRecents = [
  { name: "Avaliacao3.pdf", date: "12/09/2025" },
  { name: "Atividade_cap2.pdf", date: "13/09/2025" },
  { name: "2-Roteiro_especificacao.pdf", date: "20/09/2025" },
  { name: "Prova3_alt2025.pdf", date: "25/10/2025" }
]

export default function Home() {
    const navigate = useNavigate()
    
    return (
        <section className="flex flex-col py-4 gap-6">
            <div className="w-full inline-flex flex-row items-center justify-between">
                <div className="inline-flex flex-col justify-start gap-1">
                    <h1 className="text-center text-2xl font-bold font-poppins">Bem vindo(a) ao Atypica!</h1>
                    <p className="text-content-secondary">Torne seu material acessível para todos</p>
                </div>
                <img src="/src/assets/icons/inifin.png" alt="Atypica símbolo" className="w-16 h-16"/>
            </div>

            <div className="w-full inline-flex items-center border border-content-tertiary rounded-2xl bg-background-fixed-white px-4 gap-2">
                <img src="/src/assets/icons/search.svg" alt="Buscar" className="w-5 h-5 snap-center"/>
                <input className="w-full py-2 text-sm text-content-light" placeholder="Buscar por um título, conteúdo ou material"/>
            </div>

            <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
                <img src="/src/assets/icons/docs_art.svg" alt="Ilustração de documentos" className="w-24 h-24 self-center"/>
                <div className="w-full inline-flex flex-col justify-start items-center gap-1">
                    <h1 className="text-2xl font-semibold font-poppins">Avalie e adapte seus materiais</h1>
                    <p className="text-content-secondary">Receba uma avaliação do seu material em requisitos de acessibilidade e promova uma educação inclusiva</p>
                </div>
                <div className="w-full inline-flex flex-row justify-center items-center gap-4">
                    <Button variant="primary" text="Avaliar material" type="submit" onClick={() => {navigate(`/upload`)}} />
                </div>
            </section>

            <div className="w-full inline-flex flex-col md:flex-row items-center gap-6">
                <section className="md:max-w-[24rem] w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-3 pb-12">
                    <h1 className="text-2xl font-semibold font-poppins">Recursos educacionais</h1>
                    <ul className="divide-y divide-content-light">
                        {mockResources.map(h => (
                            <li className="py-2 flex items-center justify-between gap-4 cursor-pointer">
                                <div>
                                    <div className="font-medium font-poppins">{h.title}</div>
                                    <div className="font-medium text-sm text-brand-primary-light">{h.description}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="md:max-w-[48rem] w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-3">
                    <h1 className="text-2xl font-semibold font-poppins">Recentes</h1>
                    <ul className="divide-y divide-content-light">
                        {mockRecents.map(h => (
                            <li className="py-2 flex items-center justify-between gap-4 cursor-pointer">
                                <div>
                                    <div className="font-medium font-poppins">{h.name}</div>
                                    <div className="font-medium text-sm text-brand-primary-light">{h.date}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-brand-primary font-semibold underline">Ver</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <section className="w-full p-8 bg-background-fixed-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-content-light inline-flex flex-col gap-9">
                <div className="w-full inline-flex flex-col justify-start items-center gap-1">
                    <h1 className="text-2xl font-semibold font-poppins">Compartilhe com a comunidade</h1>
                    <p className="text-content-secondary">Compartilhe seu material com toda a comunidade para que mais pessoas possam usar!</p>
                </div>
                <div className="w-full inline-flex flex-row justify-center items-center gap-4">
                    <Button variant="primary" text="Quero compartilhar" type="submit" onClick={() => {navigate(`/forum`)}} />
                </div>
            </section>
        </section>
  )
}