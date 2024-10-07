import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import Game from './components/Game'
import Crosshair from './components/Crosshair'

function App() {
  const [isLocked, setIsLocked] = useState(false)

  const handleClick = useCallback(() => {
    setIsLocked(true)
  }, [])

  const handleUnlock = useCallback(() => {
    setIsLocked(false)
  }, [])

  return (
    <div className="w-full h-screen" onContextMenu={(e) => e.preventDefault()}>
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleClick}
          >
            Click to Play
          </button>
        </div>
      )}
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.5, 5] }}>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -9.81, 0]}>
          <Game isLocked={isLocked} onUnlock={handleUnlock} />
        </Physics>
      </Canvas>
      {isLocked && <Crosshair />}
    </div>
  )
}

export default App