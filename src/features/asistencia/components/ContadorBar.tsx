import type { Contadores } from '../types'

interface ContadorBarProps {
  contadores: Contadores
}

export function ContadorBar({ contadores }: ContadorBarProps) {
  return (
    <div className="grid grid-cols-6 gap-3 mb-6">
      <div className="bg-blue-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-wide">Total</p>
        <p className="text-3xl font-bold text-blue-600">{contadores.total}</p>
      </div>
      <div className="bg-green-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-green-400 uppercase tracking-wide">Asistencia</p>
        <p className="text-3xl font-bold text-green-600">{contadores.presentes}</p>
      </div>
      <div className="bg-red-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-red-400 uppercase tracking-wide">Inasistencia</p>
        <p className="text-3xl font-bold text-red-600">{contadores.ausentes}</p>
      </div>
      <div className="bg-orange-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-wide">Reportados</p>
        <p className="text-3xl font-bold text-orange-600">{contadores.reportados}</p>
      </div>
      <div className="bg-blue-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-wide">Extras</p>
        <p className="text-3xl font-bold text-blue-600">{contadores.extras}</p>
      </div>
      <div className="bg-purple-50 rounded-xl p-3 text-center shadow-sm">
        <p className="text-xs font-bold text-purple-400 uppercase tracking-wide">No CIDI</p>
        <p className="text-3xl font-bold text-purple-600">{contadores.noCidi}</p>
      </div>
    </div>
  )
}