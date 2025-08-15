import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {  useMemo, useRef } from "react";
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";
import type {PropsWithChildren} from "react";

// const simplex = useMemo(() => new SimplexNoise(), []);
const simplex = new SimplexNoise();

function fbmNoise(simplex: SimplexNoise, x: number, y: number, t: number) {
    let total = 0;
    let amplitude = 1.0;
    let frequency = 0.5;

    for (let i = 0; i < 4; i++) {
        total += amplitude * simplex.noise3d(x * frequency, y * frequency, t * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return total;
    }

function Wave() {
    const ref = useRef<THREE.Mesh>(null)
    const { camera, size } = useThree();
    const geometry = useMemo(() => {
        // distance from camera to plane
        const pad = 1.2;
        const planeZ = 0;
        const distance = Math.abs(camera.position.z - planeZ);

        // convert fov to radians
        if (camera instanceof THREE.PerspectiveCamera) {
            const vFOV = THREE.MathUtils.degToRad(camera.fov);
            const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
            const visibleWidth = visibleHeight * camera.aspect;
            return new THREE.PlaneGeometry(visibleWidth * pad, visibleHeight * pad, 150, 150)
        }
        // geo.rotateX(-Math.PI / 2.5);
        return new THREE.PlaneGeometry(8, 4, 150, 150)
    }, [camera, size]);

      const boxgeometry = useMemo(() => {
            return new THREE.BoxGeometry(0.2, 0.2, 0.2)
        }, [])

    const pos = geometry.attributes.position as THREE.BufferAttribute;

    // eslint-disable-next-line no-shadow

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = 0.5 * fbmNoise(simplex, x / 2, y / 2, t / 10)
            pos.setZ(i, z)
        }
        pos.needsUpdate = true;
        const z = 0.5 * fbmNoise(simplex, 1, 1, t / 10)
        if (ref.current) {
      ref.current.position.setZ(z) // Note: Y/Z swap if plane is rotated
    }

    })

    return (
        <points 
            geometry={geometry} 
            position={[0, -3, 0]}
            rotation={[-Math.PI/1.5, 0, 0]}
        >

            <pointsMaterial size={0.02} color="white"></pointsMaterial>
                <group ref={ref} position={[2, 2, 0]}  rotation={[Math.PI / 1.5, (Math.PI / 180) * 10, 0]} >
                {/* <axesHelper></axesHelper> */}
      {/* Horizontal bar */}
      <mesh  position={[0, 0.2, 0]}>
        <boxGeometry args={[0.175, 0.02, 0.02]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      {/* Vertical bar */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.02]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </group>
        </points>
    )
}

function RidingCube({scale = 2 }) {
  const ref = useRef<THREE.Mesh>(null)

  const boxgeometry = useMemo(() => {
    return new THREE.BoxGeometry(0.2, 0.2, 0.2)
  }, [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const x = 0
    const y = -3
    const z = fbmNoise(simplex, x / 2, y / 2, t / 10)
    if (ref.current) {
      ref.current.position.setY(z) // Note: Y/Z swap if plane is rotated
    }
  })

  return (
    <mesh ref={ref} position={[0, -3, 0]} geometry={boxgeometry} rotation={[-Math.PI/1.5, 0, 0]}>
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default function Waves({children} : PropsWithChildren) {
  return (
    <>
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{position: "absolute", zIndex: "0"}}>
      <color attach="background" args={["black"]} />
      <ambientLight />
      <Wave />
      {/* <RidingCube></RidingCube> */}
    </Canvas>
    {children}
    </>
  );
}