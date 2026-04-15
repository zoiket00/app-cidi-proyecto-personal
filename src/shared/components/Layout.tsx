import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ModalAgregarBebe } from '@/features/bebes/components/ModalAgregarBebe'
import { LogOut, LayoutDashboard, ClipboardList, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { perfil, logout } = useAuth()
  const router = useRouter()
  const [modalAbierto, setModalAbierto] = useState(false)

  async function handleLogout() {
    await logout()
    toast.success('Sesión cerrada')
    router.navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-lg font-bold">J</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                Fundación Juanfe
              </h1>
              <p className="text-green-100 text-xs">Control de Asistencia CIDI</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-600 transition"
              activeProps={{ className: 'bg-green-700' }}
            >
              <ClipboardList size={16} />
              Asistencia
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-600 transition"
              activeProps={{ className: 'bg-green-700' }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <button
              onClick={() => setModalAbierto(true)}
              className="flex items-center gap-1 bg-white text-green-600 text-sm px-3 py-2 rounded-lg hover:bg-green-50 transition font-semibold"
            >
              <Plus size={16} />
              Añadir Bebé
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium">{perfil?.nombre}</p>
              <p className="text-green-100 text-xs capitalize">{perfil?.rol}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-green-200 transition"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      <ModalAgregarBebe
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </div>
  )
}