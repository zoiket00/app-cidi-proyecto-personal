import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import type { RegistroDashboard } from '../types'

interface GraficaAsistenciaProps {
  registros: RegistroDashboard[]
}

export function GraficaAsistencia({ registros }: GraficaAsistenciaProps) {
  const porFecha = registros.reduce<Record<string, { presentes: number; ausentes: number }>>(
    (acc, r) => {
      if (!acc[r.fecha]) acc[r.fecha] = { presentes: 0, ausentes: 0 }
      if (r.asistencia === 'Sí') acc[r.fecha].presentes++
      else acc[r.fecha].ausentes++
      return acc
    }, {}
  )

  const data = Object.entries(porFecha).map(([fecha, vals]) => ({
    fecha: fecha.slice(5),
    Presentes: vals.presentes,
    Ausentes: vals.ausentes,
  }))

  if (data.length === 0) return (
    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
      Sin datos para mostrar
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
        Asistencia por Fecha
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Presentes" fill="#85da1a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Ausentes" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}