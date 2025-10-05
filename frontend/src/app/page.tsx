'use client'

import { useState } from 'react'
import ReportForm from '@/components/forms/ReportForm'
import type { ReportResponse } from '@/types/report'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const [response, setResponse] = useState<ReportResponse | null>(null)

  const handleSuccess = (data: ReportResponse) => {
    setResponse(data)
    setSubmitted(true)
  }

  if (submitted && response) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            ✅ Relato Enviado com Sucesso!
          </h2>
          
          <div className="bg-white p-4 rounded border border-green-300 mb-4">
            <p className="text-sm text-gray-600 mb-2">Seu código de acesso:</p>
            <p className="text-2xl font-mono font-bold text-primary-600">
              {response.accessCode}
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            {response.instructions}
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                setSubmitted(false)
                setResponse(null)
              }}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700"
            >
              Enviar Outro Relato
            </button>
            <a
              href="/dashboard"
              className="block w-full text-center bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Ver Dashboard Público
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sua Exaustão Não é um Fracasso Pessoal. É um Dado.
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Denuncie anonimamente condições de trabalho tóxicas que levam ao burnout. 
          Seus dados serão agregados e publicados para pressionar empresas e setores a mudarem.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>🔒 Anonimato Total:</strong> Não coletamos seu IP, email ou qualquer informação que possa identificá-lo. 
            Seu relato é completamente anônimo e seguro.
          </p>
        </div>
      </div>

      <ReportForm onSuccess={handleSuccess} />
    </div>
  )
}
