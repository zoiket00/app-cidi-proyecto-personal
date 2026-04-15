import { supabase } from '@/shared/lib/supabase'
import type { FiltrosDashboard } from '../types'

export async function getRegistrosDashboard(filtros: FiltrosDashboard) {
  let query = supabase
    .from('registros_asistencia')
    .select('*')
    .order('fecha', { ascending: true })

  if (filtros.desde) query = query.gte('fecha', filtros.desde)
  if (filtros.hasta) query = query.lte('fecha', filtros.hasta)
  if (filtros.dia) query = query.eq('dia', filtros.dia)
  if (filtros.programa) query = query.eq('programa', filtros.programa)

  const { data, error } = await query
  if (error) throw error
  return data || []
}