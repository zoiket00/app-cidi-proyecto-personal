import { useMutation } from '@tanstack/react-query'
import { guardarAsistencia } from '../api/asistencia.api'
import { toast } from 'sonner'
import type { RegistroAsistencia } from '../types'

export function useGuardarAsistencia() {
  return useMutation({
    mutationFn: ({
      registros,
      fecha,
      dia,
    }: {
      registros: RegistroAsistencia[]
      fecha: string
      dia: string
    }) => guardarAsistencia(registros, fecha, dia),
    onSuccess: (total) => {
      toast.success(`✅ ${total} registros guardados correctamente`)
    },
    onError: (error: Error) => {
      toast.error(`Error al guardar: ${error.message}`)
    },
  })
}