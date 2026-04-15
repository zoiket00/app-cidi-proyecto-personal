import { useState } from 'react'
import { useAgregarBebe } from '../hooks/useAgregarBebe'
import { useBuscarBebes } from '../hooks/useBebes'
import type { NuevoBebe } from '../types'
import type { Dia } from '../../asistencia/types'
import { DIAS } from '../../asistencia/types'
import { X, Search } from 'lucide-react'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface ModalAgregarBebeProps {
  abierto: boolean
  onCerrar: () => void
}

const INSTITUCIONES = ['UTE', 'ULA 1', 'ULA 2', 'Tsf', 'Otra']
const PROGRAMAS = ['Hotelería', 'Cocina', 'Belleza', 'Auxiliar Administrativo', 'Otro']
const EDADES = ['6-15', '16-30']

const formInicial: NuevoBebe = {
  nombre_bebe: '',
  nombre_madre: '',
  institucion: '',
  programa: '',
  edad: '',
  dias: [],
  es_visitante: false,
  es_no_cidi: false,
}

export function ModalAgregarBebe({ abierto, onCerrar }: ModalAgregarBebeProps) {
  const [form, setForm] = useState<NuevoBebe>(formInicial)
  const [busqueda, setBusqueda] = useState('')
  const busquedaDebounced = useDebounce(busqueda, 300)
  const { data: resultados } = useBuscarBebes(busquedaDebounced)
  const { mutate: agregar, isPending } = useAgregarBebe()

  if (!abierto) return null

  function toggleDia(dia: Dia) {
    setForm((prev) => ({
      ...prev,
      dias: prev.dias.includes(dia)
        ? prev.dias.filter((d) => d !== dia)
        : [...prev.dias, dia],
    }))
  }

  function seleccionarExistente(bebe: { id: string; nombre_bebe: string; nombre_madre: string; institucion: string; programa: string; edad: string }) {
    setForm((prev) => ({
      ...prev,
      nombre_bebe: bebe.nombre_bebe,
      nombre_madre: bebe.nombre_madre || '',
      institucion: bebe.institucion || '',
      programa: bebe.programa || '',
      edad: bebe.edad || '',
    }))
    setBusqueda('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre_bebe || !form.nombre_madre) return
    agregar(form, {
      onSuccess: () => {
        setForm(formInicial)
        onCerrar()
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">Agregar Bebé</h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar bebé existente
            </label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre del bebé o madre..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {resultados && resultados.length > 0 && busqueda && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                {resultados.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => seleccionarExistente(b)}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 text-sm border-b last:border-0"
                  >
                    <p className="font-medium text-green-700">{b.nombre_bebe}</p>
                    <p className="text-gray-500 text-xs">{b.nombre_madre}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4" />

          <form onSubmit={handleSubmit} className="space-y-3">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Bebé *
              </label>
              <input
                type="text"
                value={form.nombre_bebe}
                onChange={(e) => setForm({ ...form, nombre_bebe: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Madre *
              </label>
              <input
                type="text"
                value={form.nombre_madre}
                onChange={(e) => setForm({ ...form, nombre_madre: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Institución</label>
                <select
                  value={form.institucion}
                  onChange={(e) => setForm({ ...form, institucion: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccionar</option>
                  {INSTITUCIONES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Programa</label>
                <select
                  value={form.programa}
                  onChange={(e) => setForm({ ...form, programa: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccionar</option>
                  {PROGRAMAS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Edad</label>
                <select
                  value={form.edad}
                  onChange={(e) => setForm({ ...form, edad: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccionar</option>
                  {EDADES.map((ed) => (
                    <option key={ed} value={ed}>{ed} meses</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Días que asiste
              </label>
              <div className="flex gap-2 flex-wrap">
                {DIAS.map((dia) => (
                  <button
                    key={dia}
                    type="button"
                    onClick={() => toggleDia(dia)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition
                      ${form.dias.includes(dia)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 text-gray-500 hover:border-green-400'}`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.es_no_cidi}
                  onChange={(e) => setForm({ ...form, es_no_cidi: e.target.checked })}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-sm text-purple-700 font-medium">No CIDI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.es_visitante}
                  onChange={(e) => setForm({ ...form, es_visitante: e.target.checked })}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-sm text-blue-700 font-medium">Extra</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 mt-2"
            >
              {isPending ? 'Guardando...' : 'Agregar a la Lista'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}