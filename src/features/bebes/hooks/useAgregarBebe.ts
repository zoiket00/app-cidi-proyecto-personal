import { useMutation, useQueryClient } from '@tanstack/react-query'
import { agregarBebe } from '../api/bebes.api'
import { toast } from 'sonner'

export function useAgregarBebe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: agregarBebe,
    onSuccess: () => {
      toast.success('Bebé agregado correctamente ✅')
      queryClient.invalidateQueries({ queryKey: ['asistencia'] })
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`)
    },
  })
}