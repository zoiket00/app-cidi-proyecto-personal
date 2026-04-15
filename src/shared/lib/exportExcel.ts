import * as XLSX from 'xlsx'
import type { RegistroAsistencia } from '@/features/asistencia/types'

export function exportarAsistenciaExcel(
  registros: RegistroAsistencia[],
  dia: string,
  fecha: string
) {
  const filas = registros.map((r) => ({
    'Nombre Bebé': r.nombre_bebe,
    'Nombre Madre': r.nombre_madre,
    'Institución': r.institucion,
    'Programa': r.programa,
    'Edad': r.edad,
    'Asistencia': r.asistencia,
    'Ubicación': r.ubicacion,
    'Reporte': r.reporte,
    'Situación Específica': r.situacion_especifica,
    'Nota': r.nota,
    'Visitante': r.visitante,
    'No CIDI': r.no_cidi,
  }))

  const ws = XLSX.utils.json_to_sheet(filas)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, dia)

  const nombreArchivo = `Asistencia-${dia}-${fecha}.xlsx`
  XLSX.writeFile(wb, nombreArchivo)
}