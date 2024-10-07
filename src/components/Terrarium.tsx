import React from 'react'
import { Plant, Leaf } from 'lucide-react'

interface TerrariumProps {
  plantHealth: number
}

const Terrarium: React.FC<TerrariumProps> = ({ plantHealth }) => {
  const getPlantColor = () => {
    if (plantHealth > 80) return 'text-green-500'
    if (plantHealth > 50) return 'text-green-300'
    if (plantHealth > 20) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-lg p-8 mb-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brown-200 to-transparent" />
      <Plant className={`w-32 h-32 mx-auto ${getPlantColor()}`} />
      {[...Array(5)].map((_, index) => (
        <Leaf
          key={index}
          className={`w-8 h-8 absolute ${getPlantColor()} opacity-${
            Math.max(0, plantHealth - 20 * index)
          }`}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default Terrarium