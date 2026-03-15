"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";


export default function Cube() {
    const groupRef = useRef<THREE.Group>(null);
    const img1 = useTexture("/images/look.jpg");
    
    return (
        <>
            <group>
                <mesh>
                    <planeGeometry args={[4, 3]} />
                    <meshBasicMaterial map={img1} />
                </mesh>
            </group>
        </>

    );
}