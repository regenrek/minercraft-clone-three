import React from 'react'
import { useBox } from '@react-three/cannon'
import { Vector3 } from 'three'

interface TreeProps {
  position: Vector3
}

const Tree: React.FC<TreeProps> = ({ position }) => {
  const [trunkRef] = useBox(() => ({
    type: 'Static',
    position: [position.x, position.y + 2, position.z],
    args: [1, 4, 1],
  }))

  const [leavesRef] = useBox(() => ({
    type: 'Static',
    position: [position.x, position.y + 5, position.z],
    args: [3, 3, 3],
  }))

  return (
    <group>
      <mesh ref={trunkRef}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh ref={leavesRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  )
}

export default Tree