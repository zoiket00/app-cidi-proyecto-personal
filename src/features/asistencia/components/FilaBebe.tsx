import { useState } from 'react'
import type { RegistroAsistencia } from '../types'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilaBebeProps {
  registro: RegistroAsistencia
  onChange: (registro: RegistroAsistencia) => void
}

export function FilaBebe({ registro, onChange }: FilaBebeProps) {
  const [mostrarReporte, setMostrarReporte] = useState(false)

  const rowClass =
    registro.asistencia === 'Sí'
      ? 'bg-green-50'
      : registro.asistencia === 'No'
      ? 'bg-red-50'
      : 'bg-white'

  function setAsistencia(valor: 'Sí' | 'No') {
    onChange({ ...registro, asistencia: valor })
  }

  function setReporte(valor: 'Sí' | 'No') {
    onChange({ ...registro, reporte: valor })
  }

  return (
    <>
      <tr className={`${rowClass} border-b transition-colors`}>
        <td className="px-4 py-3 text-sm font-medium text-gray-800">
          {registro.nombre_bebe}
          {registro.visitante === 'Sí' && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Extra</span>
          )}
          {registro.no_cidi === 'Sí' && (
            <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">No CIDI</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{registro.nombre_madre}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{registro.institucion}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{registro.programa}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{registro.edad}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setAsistencia('Sí')}
              className={`px-3 py-1 rounded text-sm font-semibold border-2 transition
                ${registro.asistencia === 'Sí'
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'border-green-600 text-green-600 hover:bg-green-50'}`}
            >
              Sí
            </button>
            <button
              onClick={() => setAsistencia('No')}
              className={`px-3 py-1 rounded text-sm font-semibold border-2 transition
                ${registro.asistencia === 'No'
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-red-500 text-red-500 hover:bg-red-50'}`}
            >
              No
            </button>
          </div>
        </td>
        <td className="px-4 py-3">
          {registro.asistencia === 'No' && (
            <button
              onClick={() => setMostrarReporte(!mostrarReporte)}
              className="flex items-center gap-1 text-xs text-red-500 border border-red-400 px-2 py-1 rounded hover:bg-red-50 transition"
            >
              Reporte {mostrarReporte ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </td>
      </tr>

      {/* Acordeón reporte */}
      {mostrarReporte && registro.asistencia === 'No' && (
        <tr className="bg-red-50 border-b border-red-100">
          <td colSpan={7} className="px-6 py-3 border-l-4 border-red-400">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-red-500 uppercase">Reporte</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReporte('Sí')}
                    className={`px-3 py-1 rounded text-xs font-semibold border-2 transition
                      ${registro.reporte === 'Sí'
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-red-500 text-red-500'}`}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setReporte('No')}
                    className={`px-3 py-1 rounded text-xs font-semibold border-2 transition
                      ${registro.reporte === 'No'
                        ? 'bg-gray-500 border-gray-500 text-white'
                        : 'border-gray-400 text-gray-500'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-red-500 uppercase">Ubicación</label>
                <select
                  value={registro.ubicacion}
                  onChange={(e) => onChange({ ...registro, ubicacion: e.target.value })}
                  className="text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Seleccionar</option>
                  <option value="Casa">Casa</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-bold text-red-500 uppercase">Nota</label>
                <input
                  type="text"
                  value={registro.nota}
                  onChange={(e) => onChange({ ...registro, nota: e.target.value })}
                  placeholder="Observación..."
                  className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}