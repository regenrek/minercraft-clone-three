import React from 'react'
import { useBox } from '@react-three/cannon'
import { Vector3 } from 'three'

interface CubeProps {
  position: Vector3
}

const Cube: React.FC<CubeProps> = ({ position }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [position.x, position.y, position.z],
  }))

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="brown" />
    </mesh>
  )
}

export default Cube