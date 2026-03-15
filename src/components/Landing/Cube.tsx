"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function Cube() {
    const groupRef = useRef<THREE.Group>(null);
    const img1 = useTexture("/images/look.jpg");
    const img2 = useTexture("/images/blue.jpg");
    const img3 = useTexture("/images/rosa.jpg");
    const img4 = useTexture("/images/nurture.jpg");

    const scroll = useScroll();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.y = scroll.offset * 100;
        }
    });

    useGSAP(() => {
        if (!groupRef.current) return;

        gsap.to(groupRef.current.position, {

        });
    })
    
    return (
        <>
            <group ref={groupRef}
                   onPointerEnter={() => document.body.style.cursor = 'pointer'}
                   onPointerLeave={() => document.body.style.cursor = 'default'}
            >
                <mesh position={[0, 6, 0]}>
                    <planeGeometry args={[2.5, 2]} />
                    <meshBasicMaterial map={img1} />
                </mesh>

                <mesh position={[0, 3, 0]}>
                    <planeGeometry args={[2.5, 2]} />
                    <meshBasicMaterial map={img2} />
                </mesh>

                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[2.5, 2]} />
                    <meshBasicMaterial map={img3} />
                </mesh>
                <mesh position={[0, -3, 0]}>
                    <planeGeometry args={[2.5, 2]} />
                    <meshBasicMaterial map={img4} />
                </mesh>
            </group>
        </>
    );
}