import { useState, useMemo } from 'react'
import { Layout } from '@/shared/components/Layout'
import { useDashboard } from '@/features/dashboard/hooks/useDashboard'
import { FiltrosFecha } from '@/features/dashboard/components/FiltrosFecha'
import { StatsCards } from '@/features/dashboard/components/StatsCards'
import { GraficaAsistencia } from '@/features/dashboard/components/GraficaAsistencia'
import { GraficaProgramas } from '@/features/dashboard/components/GraficaProgramas'
import { GraficaDias } from '@/features/dashboard/components/GraficaDias'
import type { FiltrosDashboard, StatsDashboard } from '@/features/dashboard/types'

const filtrosIniciales: FiltrosDashboard = {
  desde: '',
  hasta: '',
  dia: '',
  programa: '',
}

export function DashboardPage() {
  const [filtros, setFiltros] = useState<FiltrosDashboard>(filtrosIniciales)
  const { data: registros, isLoading } = useDashboard(filtros)

  const stats: StatsDashboard = useMemo(() => {
    if (!registros) return { total: 0, presentes: 0, ausentes: 0, reportados: 0, tasaAsistencia: 0 }
    const total = registros.length
    const presentes = registros.filter((r) => r.asistencia === 'Sí').length
    const ausentes = registros.filter((r) => r.asistencia === 'No').length
    const reportados = registros.filter((r) => r.reporte === 'Sí').length
    const tasaAsistencia = total > 0 ? Math.round((presentes / total) * 100) : 0
    return { total, presentes, ausentes, reportados, tasaAsistencia }
  }, [registros])

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Resumen de asistencia CIDI</p>
      </div>

      <FiltrosFecha filtros={filtros} onChange={setFiltros} />

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Cargando datos...
        </div>
      ) : (
        <>
          <StatsCards stats={stats} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GraficaAsistencia registros={registros || []} />
            <GraficaProgramas registros={registros || []} />
          </div>
          <GraficaDias registros={registros || []} />
        </>
      )}
    </Layout>
  )
}