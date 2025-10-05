'use client'

import { useState } from 'react'
import { ApiClient } from '@/lib/api'
import type { ReportFormData, ReportResponse } from '@/types/report'

const SECTORS = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Financeiro',
  'Varejo',
  'Indústria',
  'Serviços',
  'Publicidade/Marketing',
  'Jurídico',
  'Outro'
]

const SYMPTOMS = [
  'Exaustão física constante',
  'Insônia ou problemas de sono',
  'Ansiedade',
  'Depressão',
  'Irritabilidade',
  'Dificuldade de concentração',
  'Dores de cabeça frequentes',
  'Problemas digestivos',
  'Isolamento social',
  'Perda de motivação'
]

interface Props {
  onSuccess: (data: ReportResponse) => void
}

export default function ReportForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<ReportFormData>({
    sector: '',
    companySize: '1-50',
    position: '',
    workHoursPerWeek: 40,
    hasOvertime: false,
    hasWeekendWork: false,
    burnoutSymptoms: [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await ApiClient.submitReport(formData)
      onSuccess(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar relato')
    } finally {
      setLoading(false)
    }
  }

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      burnoutSymptoms: prev.burnoutSymptoms.includes(symptom)
        ? prev.burnoutSymptoms.filter(s => s !== symptom)
        : [...prev.burnoutSymptoms, symptom]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Setor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Setor *
        </label>
        <select
          required
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Selecione...</option>
          {SECTORS.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {/* Tamanho da Empresa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tamanho da Empresa *
        </label>
        <select
          required
          value={formData.companySize}
          onChange={(e) => setFormData({ ...formData, companySize: e.target.value as any })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="1-50">1-50 funcionários</option>
          <option value="51-200">51-200 funcionários</option>
          <option value="201-1000">201-1000 funcionários</option>
          <option value="1000+">1000+ funcionários</option>
        </select>
      </div>

      {/* Cargo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cargo/Função *
        </label>
        <input
          type="text"
          required
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ex: Desenvolvedor, Enfermeira, Gerente..."
        />
      </div>

      {/* Horas de Trabalho */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Horas de Trabalho por Semana *
        </label>
        <input
          type="number"
          required
          min="1"
          max="168"
          value={formData.workHoursPerWeek}
          onChange={(e) => setFormData({ ...formData, workHoursPerWeek: parseInt(e.target.value) })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.hasOvertime}
            onChange={(e) => setFormData({ ...formData, hasOvertime: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Faço horas extras regularmente</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.hasWeekendWork}
            onChange={(e) => setFormData({ ...formData, hasWeekendWork: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Trabalho aos finais de semana</span>
        </label>
      </div>

      {/* Sintomas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sintomas de Burnout (selecione todos que se aplicam) *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SYMPTOMS.map(symptom => (
            <label key={symptom} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.burnoutSymptoms.includes(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Campos Opcionais */}
      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-900 mb-4">Informações Opcionais (Anônimas)</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa (opcional - será convertido em hash anônimo)
            </label>
            <input
              type="text"
              value={formData.companyName || ''}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relato Livre (opcional - informações pessoais serão removidas automaticamente)
            </label>
            <textarea
              rows={4}
              value={formData.freeText || ''}
              onChange={(e) => setFormData({ ...formData, freeText: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Conte sua experiência... (emails, telefones e documentos serão removidos automaticamente)"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || formData.burnoutSymptoms.length === 0}
        className="w-full bg-primary-600 text-white py-3 px-4 rounded font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Enviar Relato Anônimo'}
      </button>
    </form>
  )
}
