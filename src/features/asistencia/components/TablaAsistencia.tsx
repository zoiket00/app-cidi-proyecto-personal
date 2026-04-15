import { useState, useMemo } from 'react'
import { useAsistencia } from '../hooks/useAsistencia'
import { useGuardarAsistencia } from '../hooks/useGuardarAsistencia'
import { FilaBebe } from './FilaBebe'
import { ContadorBar } from './ContadorBar'
import type { Dia, RegistroAsistencia, Contadores, BebeDB } from '../types'
import { format } from 'date-fns'
import { Save, Search, Download } from 'lucide-react'
import { exportarAsistenciaExcel } from '@/shared/lib/exportExcel'

interface TablaAsistenciaProps {
  dia: Dia
}

const hoy = format(new Date(), 'yyyy-MM-dd')

function bebeToRegistro(b: BebeDB, dia: Dia): RegistroAsistencia {
  return {
    nombre_bebe: b.nombre_bebe,
    nombre_madre: b.nombre_madre || '',
    institucion: b.institucion || '',
    programa: b.programa || '',
    edad: b.edad || '',
    fecha: hoy,
    dia,
    asistencia: '',
    ubicacion: '',
    reporte: 'No',
    situacion_especifica: '',
    nota: '',
    visitante: '',
    no_cidi: '',
  }
}

export function TablaAsistencia({ dia }: TablaAsistenciaProps) {
  const { data: bebes, isLoading, error } = useAsistencia(dia)
  const { mutate: guardar, isPending } = useGuardarAsistencia()
  const [overrides, setOverrides] = useState<Record<string, Partial<RegistroAsistencia>>>({})
  const [busqueda, setBusqueda] = useState('')

  const registros: RegistroAsistencia[] = useMemo(() => {
    if (!bebes) return []
    return bebes.map((b) => ({
      ...bebeToRegistro(b, dia),
      ...(overrides[b.nombre_bebe] || {}),
    }))
  }, [bebes, dia, overrides])

  const contadores: Contadores = useMemo(() => ({
    total: registros.length,
    presentes: registros.filter((r) => r.asistencia === 'Sí').length,
    ausentes: registros.filter((r) => r.asistencia === 'No').length,
    reportados: registros.filter((r) => r.reporte === 'Sí').length,
    extras: registros.filter((r) => r.visitante === 'Sí').length,
    noCidi: registros.filter((r) => r.no_cidi === 'Sí').length,
  }), [registros])

  const registrosFiltrados = useMemo(() => {
    if (!busqueda) return registros
    const q = busqueda.toLowerCase()
    return registros.filter(
      (r) =>
        r.nombre_bebe.toLowerCase().includes(q) ||
        r.nombre_madre.toLowerCase().includes(q)
    )
  }, [registros, busqueda])

  function handleChange(updated: RegistroAsistencia) {
    setOverrides((prev) => ({
      ...prev,
      [updated.nombre_bebe]: updated,
    }))
  }

  function handleGuardar() {
    guardar({ registros, fecha: hoy, dia })
  }

  if (isLoading) return (
    <div className="flex items-center justify-center py-20 text-gray-400">
      Cargando bebés...
    </div>
  )

  if (error) return (
    <div className="text-red-500 py-10 text-center">
      Error cargando datos
    </div>
  )

  if (!bebes || bebes.length === 0) return (
    <div className="text-gray-400 py-10 text-center">
      No hay bebés registrados para {dia}
    </div>
  )

  return (
    <div>
      <ContadorBar contadores={contadores} />

      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar bebé o madre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => exportarAsistenciaExcel(registros, dia, hoy)}
            className="flex items-center gap-2 bg-white border-2 border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition hover:bg-green-50"
          >
            <Download size={16} />
            Exportar Excel
          </button>

          <button
            onClick={handleGuardar}
            disabled={isPending}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
          >
            <Save size={16} />
            {isPending ? 'Guardando...' : 'Guardar Asistencia'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-500 text-white text-sm">
              <th className="px-4 py-3">Bebé</th>
              <th className="px-4 py-3">Madre</th>
              <th className="px-4 py-3">Institución</th>
              <th className="px-4 py-3">Programa</th>
              <th className="px-4 py-3">Edad</th>
              <th className="px-4 py-3">Asistencia</th>
              <th className="px-4 py-3">Reporte</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((registro) => (
              <FilaBebe
                key={registro.nombre_bebe}
                registro={registro}
                onChange={handleChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}