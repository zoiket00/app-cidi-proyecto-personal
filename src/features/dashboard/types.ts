export interface RegistroDashboard {
  nombre_bebe: string
  nombre_madre: string
  institucion: string
  programa: string
  edad: string
  fecha: string
  dia: string
  asistencia: string
  reporte: string
  visitante: string
  no_cidi: string
}

export interface FiltrosDashboard {
  desde: string
  hasta: string
  dia: string
  programa: string
}

export interface StatsDashboard {
  total: number
  presentes: number
  ausentes: number
  reportados: number
  tasaAsistencia: number
}