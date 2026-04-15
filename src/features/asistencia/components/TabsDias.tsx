import { useState } from 'react'
import { TablaAsistencia } from './TablaAsistencia'
import { DIAS, type Dia } from '../types'

export function TabsDias() {
  const [diaActivo, setDiaActivo] = useState<Dia>('Lunes')

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {DIAS.map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaActivo(dia)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition
              ${diaActivo === dia
                ? 'bg-green-500 text-white'
                : 'text-gray-500 hover:text-green-600 hover:bg-green-50'}`}
          >
            {dia}
          </button>
        ))}
      </div>

      <TablaAsistencia dia={diaActivo} />
    </div>
  )
}