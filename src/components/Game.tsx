import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'
import { PointerLockControls } from '@react-three/drei'
import Cube from './Cube'
import Ground from './Ground'
import Tree from './Tree'
import House from './House'

const JUMP_FORCE = 4
const SPEED = 5

interface GameProps {
  isLocked: boolean
  onUnlock: () => void
}

const Game: React.FC<GameProps> = ({ isLocked, onUnlock }) => {
  const [cubes, setCubes] = useState<{ position: Vector3; key: number }[]>([])
  const [cubeCounter, setCubeCounter] = useState(0)

  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
    fixedRotation: true,
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  const pos = useRef([0, 1, 0])
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p))
  }, [api.position])

  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const [canJump, setCanJump] = useState(false)

  useFrame(() => {
    if (!isLocked) return

    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    )
    const sideVector = new Vector3(
      Number(moveLeft) - Number(moveRight),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (canJump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2])
      setCanJump(false)
    }
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLocked) return
    switch (e.code) {
      case 'KeyW':
        setMoveForward(true)
        break
      case 'KeyS':
        setMoveBackward(true)
        break
      case 'KeyA':
        setMoveLeft(true)
        break
      case 'KeyD':
        setMoveRight(true)
        break
      case 'Space':
        setCanJump(true)
        break
    }
  }, [isLocked])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (!isLocked) return
    switch (e.code) {
      case 'KeyW':
        setMoveForward(false)
        break
      case 'KeyS':
        setMoveBackward(false)
        break
      case 'KeyA':
        setMoveLeft(false)
        break
      case 'KeyD':
        setMoveRight(false)
        break
      case 'Space':
        setCanJump(false)
        break
    }
  }, [isLocked])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const handleClick = useCallback((e: MouseEvent) => {
    if (!isLocked) return
    e.preventDefault()
    const clickedPosition = new Vector3(pos.current[0], pos.current[1], pos.current[2])
    clickedPosition.add(camera.getWorldDirection(new Vector3()).multiplyScalar(3))

    if (e.button === 0) { // Left click (break block)
      setCubes((prevCubes) => prevCubes.filter((cube) => 
        !cube.position.equals(clickedPosition.round())
      ))
    } else if (e.button === 2) { // Right click (place block)
      setCubes((prevCubes) => [
        ...prevCubes,
        { position: clickedPosition.round(), key: cubeCounter }
      ])
      setCubeCounter((prev) => prev + 1)
    }
  }, [isLocked, camera, cubeCounter])

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick])

  return (
    <>
      <PointerLockControls
        ref={controlsRef}
        onUnlock={onUnlock}
      />
      <mesh ref={ref} />
      <Ground />
      {cubes.map(({ position, key }) => (
        <Cube key={key} position={position} />
      ))}
      <Tree position={new Vector3(5, 0, 5)} />
      <Tree position={new Vector3(-5, 0, -5)} />
      <Tree position={new Vector3(8, 0, -8)} />
      <House position={new Vector3(10, 0, 10)} />
    </>
  )
}

export default Game