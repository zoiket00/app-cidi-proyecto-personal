import type { Dia } from '../asistencia/types'

export interface NuevoBebe {
  nombre_bebe: string
  nombre_madre: string
  institucion: string
  programa: string
  edad: string
  dias: Dia[]
  es_visitante: boolean
  es_no_cidi: boolean
}