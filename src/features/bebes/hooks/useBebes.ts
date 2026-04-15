import { useQuery } from '@tanstack/react-query'
import { buscarBebes } from '../api/bebes.api'

export function useBuscarBebes(query: string) {
  return useQuery({
    queryKey: ['bebes', 'buscar', query],
    queryFn: () => buscarBebes(query),
    enabled: query.length >= 2,
  })
}