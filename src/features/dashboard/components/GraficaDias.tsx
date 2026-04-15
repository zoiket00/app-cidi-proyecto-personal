import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'
import type { RegistroDashboard } from '../types'
import { DIAS } from '../../asistencia/types'

interface GraficaDiasProps {
  registros: RegistroDashboard[]
}

export function GraficaDias({ registros }: GraficaDiasProps) {
  const porDia = DIAS.map((dia) => {
    const delDia = registros.filter((r) => r.dia === dia)
    const presentes = delDia.filter((r) => r.asistencia === 'Sí').length
    return { dia, Asistencia: presentes, Total: delDia.length }
  })

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
        Asistencia por Día
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={porDia}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dia" tick={{ fontSize: 12 }} />
          <Radar
            name="Asistencia"
            dataKey="Asistencia"
            stroke="#85da1a"
            fill="#85da1a"
            fillOpacity={0.4}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}