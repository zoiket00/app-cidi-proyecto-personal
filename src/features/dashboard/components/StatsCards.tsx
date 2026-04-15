import type { StatsDashboard } from '../types'

interface StatsCardsProps {
  stats: StatsDashboard
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-wide">Total</p>
        <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
      </div>
      <div className="bg-green-50 rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs font-bold text-green-400 uppercase tracking-wide">Presentes</p>
        <p className="text-4xl font-bold text-green-600">{stats.presentes}</p>
      </div>
      <div className="bg-red-50 rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs font-bold text-red-400 uppercase tracking-wide">Ausentes</p>
        <p className="text-4xl font-bold text-red-600">{stats.ausentes}</p>
      </div>
      <div className="bg-orange-50 rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-wide">Reportados</p>
        <p className="text-4xl font-bold text-orange-600">{stats.reportados}</p>
      </div>
      <div className="bg-emerald-50 rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Tasa</p>
        <p className="text-4xl font-bold text-emerald-600">{stats.tasaAsistencia}%</p>
      </div>
    </div>
  )
}