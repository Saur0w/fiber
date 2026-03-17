"use client";

import {useTexture} from "@react-three/drei";
import * as THREE from "three";
import {fragmentShader, vertexShader} from "@/lib/Shader";
import {Suspense, useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useScroll} from "@/hooks/useScroll";

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

const PLANE_WIDTH = 2;
const PLANE_HEIGHT = 1.5;
const GAP = 0.09;

const ITEM_WIDTH = PLANE_WIDTH + GAP;
const TOTAL_WIDTH = images.length * ITEM_WIDTH;

function Meshes() {
    const textures = useTexture(images.map(img => img.src)) as THREE.Texture[];
    const materialsRef = useRef<(THREE.ShaderMaterial | null)[]>([]);
    const meshesRef = useRef<(THREE.Mesh | null)[]>([]);

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

        meshesRef.current.forEach((mesh, index) => {
            if (mesh) {
                const basePosition = index * ITEM_WIDTH;
                const currentX = basePosition + (scrollX.current * 0.005);
                mesh.position.x = ((currentX + TOTAL_WIDTH / 2) % TOTAL_WIDTH + TOTAL_WIDTH) % TOTAL_WIDTH - TOTAL_WIDTH / 2;
            }
        });

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
        <group>
            {textures.map((_, index) => (
                <mesh
                    key={index}
                    ref={(el) => (meshesRef.current[index] = el)}
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