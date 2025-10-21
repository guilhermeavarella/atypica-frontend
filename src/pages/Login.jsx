import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SectionButton from '../components/SectionButton'

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="w-full self-stretch max-w-[1200px] inline-flex flex-col justify-center items-center gap-[2.5rem] p-[1.5rem]">
      <img src="/src/assets/logos/large.svg" alt="logo da Atypica" className="h-[4.5rem]" />
      <section className="w-[24rem] p-[3rem] bg-white rounded-3xl outline outline-1 outline-content-light inline-flex flex-col justify-start items-center gap-[1rem] overflow-hidden">
        <div className="inline-flex flex-col justify-start items-center gap-0.5">
          <div className="text-center justify-center text-content-primary text-2xl font-bold font-poppins">Acesse sua conta</div>
          <div className="text-center justify-center text-content-secondary text-sm">Torne seu material acessível para todos</div>
        </div>
        <form className="w-full mt-2" onSubmit={(e) => { navigate('/dashboard') }}>
          <label className="block mb-2">
            <span className="block text-sm">E-mail</span>
            <input className="w-full h-[2.5rem] px-3.5 py-3 rounded-2xl border border-content-secondary" type="email"/>
          </label>
          <label className="block mb-4">
            <span className="block text-sm">Senha</span>
            <input className="w-full h-[2.5rem] px-3.5 py-3 rounded-2xl border border-content-secondary" type="password" />
          </label>
          <button className="mt-3 w-full min-h-[2.25rem] px-[2rem] py-[0.75rem] bg-brand-primary rounded-3xl inline-flex justify-center items-center gap-1" onClick={() => { navigate('/dashboard') }}>
            <div className="text-center justify-center text-content-inverse text-sm font-semibold font-poppins">Continuar</div>
          </button>
        </form>
        <div className="text-center justify-center text-content-secondary text-sm underline">Esqueceu sua senha?</div>
        <div className="text-center justify-center text-content-secondary text-base font-normal">ou</div>
        <div className="self-stretch inline-flex flex-col justify-start items-center gap-3">
          <SectionButton text="Receber código via E-mail" icon="/src/assets/icons/email.svg" onClick={() => { navigate('/dashboard') }} />
          <SectionButton text="Acessar via QR code" icon="/src/assets/icons/qr.svg" onClick={() => { navigate('/dashboard') }} />
          <SectionButton text="Acessar com Google" icon="/src/assets/icons/google.svg" onClick={() => { navigate('/dashboard') }} />
          <SectionButton text="Acessar com Microsoft" icon="/src/assets/icons/microsoft.svg" onClick={() => { navigate('/dashboard') }} />
        </div>
        <p className="text-content-light mt-[-0.25rem] text-sm">_____________________________________</p>
        <div className="inline-flex flex-col text-center justify-center text-content-secondary text-sm">Não tem uma conta? <button className="text-brand-primary font-semibold" onClick={() => {}}>Comece agora</button></div>
      </section>
    </div>
  )
}
