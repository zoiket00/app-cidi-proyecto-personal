export interface Bebe {
  id: string
  nombre_bebe: string
  nombre_madre: string
  institucion: string
  programa: string
  edad: string
}

export interface BebeDB {
  id: string
  nombre_bebe: string
  nombre_madre: string | null
  institucion: string | null
  programa: string | null
  edad: string | null
}

export interface RegistroAsistencia {
  id?: string
  nombre_bebe: string
  nombre_madre: string
  institucion: string
  programa: string
  edad: string
  fecha: string
  dia: string
  asistencia: 'Sí' | 'No' | ''
  ubicacion: string
  reporte: 'Sí' | 'No'
  situacion_especifica: string
  nota: string
  visitante: string
  no_cidi: string
}

export type Dia = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes'

export const DIAS: Dia[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']

export interface Contadores {
  total: number
  presentes: number
  ausentes: number
  reportados: number
  extras: number
  noCidi: number
}