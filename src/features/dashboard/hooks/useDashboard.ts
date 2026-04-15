import { useQuery } from '@tanstack/react-query'
import { getRegistrosDashboard } from '../api/dashboard.api'
import type { FiltrosDashboard } from '../types'

export function useDashboard(filtros: FiltrosDashboard) {
  return useQuery({
    queryKey: ['dashboard', filtros],
    queryFn: () => getRegistrosDashboard(filtros),
    staleTime: 1000 * 60 * 5,
  })
}