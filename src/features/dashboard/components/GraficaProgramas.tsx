import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import type { RegistroDashboard } from '../types'

const COLORS = ['#85da1a', '#6ab514', '#f59e0b', '#f87171', '#a78bfa', '#60a5fa']

interface GraficaProgramasProps {
  registros: RegistroDashboard[]
}

export function GraficaProgramas({ registros }: GraficaProgramasProps) {
  const porPrograma = registros.reduce<Record<string, number>>((acc, r) => {
    const prog = r.programa || 'Sin programa'
    acc[prog] = (acc[prog] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(porPrograma).map(([name, value]) => ({ name, value }))

  if (data.length === 0) return (
    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
      Sin datos para mostrar
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
        Distribución por Programa
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}