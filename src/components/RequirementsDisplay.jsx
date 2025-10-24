import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDIalog"

export function RequirementsDisplay() {
  const [requirements, setRequirements] = useState([]); // start empty

  useEffect(() => {
    fetch("/mocks/requirements.json")
      .then((res) => res.json())
      .then((data) => setRequirements(data));
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button type="button" className="w-6 h-6 flex items-start justify-start"> <img src="/src/assets/icons/reqs.svg" alt="Ver requisitos" className="w-6 h-6"/> </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[64rem] max-h-[56rem] p-8 overflow-scroll bg-background-fixed-white">
        <p className="w-full text-center text-lg font-semibold">Sobre os requisitos</p>
        <div className="w-full">
          <p className="font-semibold text-sm text-brand-primary-light mb-2">
            RF: Requisitos Funcionais. Avaliam objetivamente a estrutura do material e enunciados. <br/>
            RNF: Requisitos Não Funcionais. Avaliam subjetivamente aspectos como clareza, acessibilidade e usabilidade.
          </p>
        </div>
        <AlertDialogCancel className="w-full flex flex-col gap-6">
        {requirements.map((requirement, index) => (
          <AlertDialogHeader key={index}>
            <AlertDialogTitle className="font-medium text-content-primary">{requirement.name}</AlertDialogTitle>
            <AlertDialogDescription className="font-medium text-sm text-content-secondary">
              {requirement.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
        ))}
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
