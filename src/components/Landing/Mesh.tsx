"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import {Suspense, useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@/hooks/useScroll";
import { vertexShader, fragmentShader } from "@/lib/Shader";

interface ImageProps {
    src: string;
}

const images: ImageProps[] = [
    { src: "/images/look.jpg" },
    { src: "/images/blue.jpg" },
    { src: "/images/nurture.jpg" },
    { src: "/images/rosa.jpg" }
];

const PLANE_WIDTH = 2;
const PLANE_HEIGHT = 1;
const GAP = 0.05;

function Meshes() {
    const textures = useTexture(images.map(img => img.src)) as THREE.Texture[];
    const materialRef = useRef<(THREE.ShaderMaterial | null)[]>([]);
    const groupRef = useRef<THREE.Group>(null!);

    const { scrollX, targetX, velocity } = useScroll();

    const uniformsList = useMemo(() => {
        return textures.map((texture) => ({
            uTexture: { value: texture },
            uVelocity: { value: 0 }
        }));
    }, [textures]);

    return (
        <group ref={groupRef}>
            {textures.map((_, index) => (
                <mesh
                    key={index}
                    position={[index * (PLANE_WIDTH + GAP), 0, 0]}
                >
                    <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 30, 30]} />
                    <shaderMaterial
                        ref={(el) => (materialRef.current[index] = el)}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={uniformsList[index]}
                    />
                </mesh>
                )
            )}
        </group>
    )
}

export defaul