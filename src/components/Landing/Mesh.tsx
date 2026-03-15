"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ITEM_COUNT = 4;
const GAP = 3;
const TOTAL_HEIGHT = ITEM_COUNT * GAP;

export default function Mesh() {
    const groupRef = useRef<THREE.Group>(null);
    const [img1, img2, img3, img4] = useTexture([
        "/images/look.jpg",
        "/images/blue.jpg",
        "/images/rosa.jpg",
        "/images/nurture.jpg",
    ]);

    const textures = [img1, img2, img3, img4];

    const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

    const scrollY = useRef(0);
    const scroll = useScroll();
    const lastOffset = useRef(scroll.offset);

    useFrame(() => {
        const delta = scroll.offset - lastOffset.current;
        lastOffset.current = scroll.offset;

        scrollY.current += delta * TOTAL_HEIGHT * 4;

        meshRefs.current.forEach((mesh, i) => {
            if (!mesh) return;

            let y = -i * GAP + scrollY.current;

            y = ((y % TOTAL_HEIGHT) + TOTAL_HEIGHT) % TOTAL_HEIGHT;

            if (y > TOTAL_HEIGHT / 2) {
                y -= TOTAL_HEIGHT;
            }

            mesh.position.y = y;
        });
    });

    useGSAP(() => {
        if (!groupRef.current) return;

        gsap.to(groupRef.current.position, {

        });
    })

    return (
        <>
            {textures.map((tex, i) => (
                <mesh
                    key={i}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    onPointerEnter={() => document.body.style.cursor = "pointer"}
                    onPointerLeave={() => document.body.style.cursor = "default"}
                >
                    <planeGeometry args={[2.5, 2, 16, 16]} />
                    <meshBasicMaterial map={tex} />
                </mesh>
            ))}

        </>
    );
}