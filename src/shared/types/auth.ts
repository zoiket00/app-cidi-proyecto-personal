export type Rol = 'admin' | 'coordinadora' | 'profesora'

export interface Perfil {
  id: string
  nombre: string
  rol: Rol
  activo: boolean
  created_at: string
}