import type { FiltrosDashboard } from '../types'
import { DIAS } from '../../asistencia/types'

const PROGRAMAS = ['Hotelería', 'Cocina', 'Belleza', 'Auxiliar Administrativo', 'Otro']

interface FiltrosFechaProps {
  filtros: FiltrosDashboard
  onChange: (filtros: FiltrosDashboard) => void
}

export function FiltrosFecha({ filtros, onChange }: FiltrosFechaProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Desde</label>
        <input
          type="date"
          value={filtros.desde}
          onChange={(e) => onChange({ ...filtros, desde: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hasta</label>
        <input
          type="date"
          value={filtros.hasta}
          onChange={(e) => onChange({ ...filtros, hasta: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Día</label>
        <select
          value={filtros.dia}
          onChange={(e) => onChange({ ...filtros, dia: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos</option>
          {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Programa</label>
        <select
          value={filtros.programa}
          onChange={(e) => onChange({ ...filtros, programa: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos</option>
          {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <button
        onClick={() => onChange({ desde: '', hasta: '', dia: '', programa: '' })}
        className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        Limpiar filtros
      </button>
    </div>
  )
}