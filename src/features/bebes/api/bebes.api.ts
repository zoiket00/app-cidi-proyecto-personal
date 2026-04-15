import { supabase } from '@/shared/lib/supabase'
import type { NuevoBebe } from '../types'

export async function buscarBebes(query: string) {
  const { data, error } = await supabase
    .from('bebes')
    .select('*')
    .or(`nombre_bebe.ilike.%${query}%,nombre_madre.ilike.%${query}%`)
    .limit(5)

  if (error) throw error
  return data || []
}

export async function agregarBebe(datos: NuevoBebe) {
  const { nombre_bebe, nombre_madre, institucion, programa, edad, dias } = datos

  // Verificar si ya existe
  const { data: existing } = await supabase
    .from('bebes')
    .select('id')
    .ilike('nombre_bebe', nombre_bebe)
    .maybeSingle()

  let bebeId: string

  if (existing) {
    await supabase
      .from('bebes')
      .update({ nombre_madre, institucion, programa, edad })
      .eq('id', existing.id)
    bebeId = existing.id
  } else {
    const { data: inserted, error } = await supabase
      .from('bebes')
      .insert({ nombre_bebe, nombre_madre, institucion, programa, edad })
      .select('id')
      .single()
    if (error) throw error
    bebeId = inserted.id
  }

  // Asignar días
  if (dias.length > 0) {
    const { error: errDias } = await supabase
      .from('asistencias')
      .upsert(
        dias.map((dia) => ({ bebe_id: bebeId, dia })),
        { onConflict: 'bebe_id,dia', ignoreDuplicates: true }
      )
    if (errDias) throw errDias
  }

  return bebeId
}