"use client";

import  { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/lib/Shader";
import {Suspense, useMemo, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@/hooks/useScroll";

interface ImageProps {
    src: string;
}

const images: ImageProps[] = [
    { src: "/images/look.jpg" },
    { src: "/images/blue.jpg" },
    { src: "/images/nurture.jpg" },
    { src: "/images/rosa.jpg" },
    { src: "/images/in.jpg" },
    { src: "/images/adf.jpg" },
    { src: "/images/green.jpg"},
    { src: "/images/musician.jpg"},
    { src: "/images/flwr.jpg"},
    { src: "/images/1.jpg"},
    { src: "/images/yellow.jpg"},
    { src: "/images/bird.jpg"},
    { src: "/images/kali.png"},
    { src: "/images/p.jpg"},
    { src: "/images/butterfly.jpg"},
    { src: "/images/fog.jpg"},
    { src: "/images/house.jpg"},


];

const PLANE_WIDTH = 2.5;
const PLANE_HEIGHT = 2;
const GAP = 0.2;

function Meshes() {
    const textures = useTexture(images.map(img => img.src)) as THREE.Texture[];
    const materialsRef = useRef<(THREE.ShaderMaterial | null)[]>([]);
    const groupRef      = useRef<THREE.Group>(null!);

    const { scrollX, targetX, velocity } = useScroll();

    const uniformsList = useMemo(() => {
        return textures.map((texture) => ({
            uTexture:   { value: texture },
            uVelocity:  { value: 0 },
        }));
    }, [textures]);

    useFrame(() => {
        const diff = targetX.current - scrollX.current;
        // eslint-disable-next-line react-hooks/immutability
        scrollX.current += diff * 0.1;
        // eslint-disable-next-line react-hooks/immutability
        velocity.current = diff;

        if (groupRef.current) {
            groupRef.current.position.x = scrollX.current * 0.005;
        }

        materialsRef.current.forEach((mat) => {
            if (mat) {
                mat.uniforms.uVelocity.value = THREE.MathUtils.lerp(
                    mat.uniforms.uVelocity.value,
                    velocity.current,
                    0.1
                );
            }
        });
    });

    return (
        <group ref={groupRef}>
            {textures.map((_, index) => (
                <mesh
                    key={index}
                    position={[index * (PLANE_WIDTH + GAP) - 6, 0, 0]}
                >
                    <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 30, 30]} />
                    <shaderMaterial
                        ref={(el) => (materialsRef.current[index] = el)}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={uniformsList[index]}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default function Mesh() {
    return (
        <Suspense fallback={null}>
            <Meshes />
        </Suspense>
    );
}