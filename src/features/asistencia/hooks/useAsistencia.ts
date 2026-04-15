import { useQuery } from '@tanstack/react-query'
import { getBebePorDia } from '../api/asistencia.api'
import type { Dia } from '../types'

export function useAsistencia(dia: Dia) {
  return useQuery({
    queryKey: ['asistencia', dia],
    queryFn: () => getBebePorDia(dia),
    enabled: !!dia,
  })
}