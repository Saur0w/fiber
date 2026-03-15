"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";


export default function Cube() {
    const groupRef = useRef<THREE.Group>(null);
    const earthRef = useRef<THREE.Mesh>(null);
    const sunRef = useRef<THREE.Mesh>(null);

    const earthTexture = useTexture("/textures/earth.jpg");
    const sunTexture = useTexture("/textures/sun.jpg");

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.019;
        }

        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001;
        }

        if (sunRef.current) {
            sunRef.current.rotation.y += 0.0001;
        }

    });
    return (
        <>
            <group>
                <mesh position={[0, 0, 0]} ref={sunRef}>
                    <sphereGeometry args={[2, 64, 64]} />
                    <meshBasicMaterial map={sunTexture} />
                </mesh>
            </group>
            <group ref={groupRef}>
                <mesh position={[-5, 0, 0]} ref={earthRef}>
                    <sphereGeometry args={[0.5, 64, 64]} />
                    <meshBasicMaterial map={earthTexture} />
                </mesh>
            </group>
        </>

    );
}