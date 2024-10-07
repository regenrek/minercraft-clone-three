import React from 'react'
import { useBox } from '@react-three/cannon'
import { Vector3 } from 'three'

interface HouseProps {
  position: Vector3
}

const House: React.FC<HouseProps> = ({ position }) => {
  const [wallsRef] = useBox(() => ({
    type: 'Static',
    position: [position.x, position.y + 2, position.z],
    args: [6, 4, 6],
  }))

  const [roofRef] = useBox(() => ({
    type: 'Static',
    position: [position.x, position.y + 5, position.z],
    args: [7, 2, 7],
    rotation: [Math.PI / 4, 0, 0],
  }))

  return (
    <group>
      <mesh ref={wallsRef}>
        <boxGeometry args={[6, 4, 6]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      <mesh ref={roofRef}>
        <boxGeometry args={[7, 2, 7]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

export default House