'use client'

import { useEffect, useState } from 'react'
import { ApiClient } from '@/lib/api'
import type { DashboardData } from '@/types/report'
import Loading from '@/components/ui/Loading'
import ErrorMessage from '@/components/ui/ErrorMessage'
import StatCard from '@/components/charts/StatCard'
import BarChart from '@/components/charts/BarChart'
import DataTable from '@/components/charts/DataTable'

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const dashboardData = await ApiClient.getDashboardData()
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard Público</h1>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard Público</h1>
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard Público</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-700">
            Ainda não há dados suficientes para exibir o dashboard. 
            Seja o primeiro a <a href="/" className="text-primary-600 font-bold hover:underline">enviar um relato</a>!
          </p>
        </div>
      </div>
    )
  }

  // Calcular estatísticas gerais
  const totalReports = data.bySector.reduce((sum, s) => sum + s.total_reports, 0)
  const avgWorkHours = data.bySector.length > 0
    ? Math.round(data.bySector.reduce((sum, s) => sum + s.avg_work_hours, 0) / data.bySector.length)
    : 0
  const avgOvertimePercentage = data.bySector.length > 0
    ? Math.round(data.bySector.reduce((sum, s) => sum + s.overtime_percentage, 0) / data.bySector.length)
    : 0

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dashboard Público de Burnout
        </h1>
        <p className="text-xl text-gray-600">
          Dados agregados e anonimizados de trabalhadores brasileiros em burnout
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total de Relatos"
          value={totalReports.toLocaleString('pt-BR')}
          subtitle="Trabalhadores que compartilharam suas experiências"
          icon="📊"
        />
        <StatCard
          title="Média de Horas Trabalhadas"
          value={`${avgWorkHours}h`}
          subtitle="Por semana"
          icon="⏰"
        />
        <StatCard
          title="Trabalham Horas Extras"
          value={`${avgOvertimePercentage}%`}
          subtitle="Dos trabalhadores relataram horas extras regulares"
          icon="😰"
        />
      </div>

      {/* Alerta de Conscientização */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-red-900 mb-2">
          ⚠️ Estes dados representam sofrimento real
        </h3>
        <p className="text-red-800">
          Cada número neste dashboard representa um trabalhador em burnout. 
          Use estes dados para pressionar por mudanças reais nas condições de trabalho.
        </p>
      </div>

      {/* Gráficos */}
      <div className="space-y-8">
        {/* Relatos por Setor */}
        {data.bySector.length > 0 && (
          <BarChart
            title="Relatos por Setor"
            data={data.bySector.map(s => ({
              label: s.sector,
              value: s.total_reports
            }))}
          />
        )}

        {/* Horas Médias por Setor */}
        {data.bySector.length > 0 && (
          <BarChart
            title="Horas Médias de Trabalho por Setor"
            data={data.bySector.map(s => ({
              label: s.sector,
              value: Math.round(s.avg_work_hours),
              color: s.avg_work_hours > 44 ? '#dc2626' : '#f59e0b'
            }))}
          />
        )}

        {/* Sintomas Mais Comuns */}
        {data.topSymptoms.length > 0 && (
          <BarChart
            title="Sintomas Mais Relatados"
            data={data.topSymptoms.map(s => ({
              label: s.symptom,
              value: s.frequency
            }))}
          />
        )}

        {/* Relatos por Tamanho de Empresa */}
        {data.byCompanySize.length > 0 && (
          <BarChart
            title="Relatos por Tamanho de Empresa"
            data={data.byCompanySize.map(c => ({
              label: c.company_size,
              value: c.total_reports
            }))}
          />
        )}

        {/* Tabela de Setores Detalhada */}
        {data.bySector.length > 0 && (
          <DataTable
            title="Análise Detalhada por Setor"
            columns={[
              { key: 'sector', label: 'Setor' },
              { key: 'total_reports', label: 'Relatos', format: (v) => v.toLocaleString('pt-BR') },
              { key: 'avg_work_hours', label: 'Horas/Semana', format: (v) => Math.round(v) + 'h' },
              { key: 'overtime_percentage', label: 'Horas Extras', format: (v) => Math.round(v) + '%' },
              { key: 'weekend_work_percentage', label: 'Trabalho aos Finais de Semana', format: (v) => Math.round(v) + '%' }
            ]}
            data={data.bySector}
          />
        )}

        {/* Empresas com Mais Relatos */}
        {data.topCompanies.length > 0 && (
          <DataTable
            title="Empresas com Mais Relatos (Anonimizadas)"
            columns={[
              { key: 'company_hash', label: 'ID Anônimo' },
              { key: 'sector', label: 'Setor' },
              { key: 'total_reports', label: 'Relatos', format: (v) => v.toLocaleString('pt-BR') },
              { key: 'avg_work_hours', label: 'Horas/Semana', format: (v) => Math.round(v) + 'h' }
            ]}
            data={data.topCompanies}
          />
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Você também está em burnout?
        </h2>
        <p className="text-gray-700 mb-6">
          Compartilhe sua experiência de forma anônima e ajude a construir evidências 
          para mudanças sistêmicas.
        </p>
        <a
          href="/"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition"
        >
          Enviar Relato Anônimo
        </a>
      </div>
    </div>
  )
}
