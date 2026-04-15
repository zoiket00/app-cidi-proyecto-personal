import { supabase } from '@/shared/lib/supabase'
import type { Dia, RegistroAsistencia } from '../types'

export async function getBebePorDia(dia: Dia) {
  const { data: asistencias, error: errA } = await supabase
    .from('asistencias')
    .select('bebe_id')
    .eq('dia', dia)

  if (errA) throw errA
  if (!asistencias || asistencias.length === 0) return []

  const ids = asistencias.map((a) => a.bebe_id)

  const { data: bebes, error: errB } = await supabase
    .from('bebes')
    .select('*')
    .in('id', ids)
    .order('nombre_bebe', { ascending: true })

  if (errB) throw errB
  return bebes || []
}

export async function guardarAsistencia(
  registros: RegistroAsistencia[],
  fecha: string,
  dia: string
) {
  const filas = registros.map((r) => ({
    nombre_bebe: r.nombre_bebe.trim(),
    nombre_madre: r.nombre_madre.trim(),
    institucion: r.institucion.trim(),
    programa: r.programa.trim(),
    edad: r.edad.trim(),
    fecha,
    dia,
    asistencia: r.asistencia || 'No',
    ubicacion: r.ubicacion.trim(),
    reporte: r.reporte || 'No',
    situacion_especifica: r.situacion_especifica.trim(),
    nota: r.nota.trim(),
    visitante: r.visitante.trim(),
    no_cidi: r.no_cidi.trim(),
  }))

  const { error } = await supabase
    .from('registros_asistencia')
    .upsert(filas, { onConflict: 'nombre_bebe,nombre_madre,fecha' })

  if (error) throw error
  return filas.length
}