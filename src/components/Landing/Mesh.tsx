"use client";

import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useTexture, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { ImageMaterial, ImageMaterialImpl } from "@/lib/Shader";

extend({ ImageMaterial });

const ITEM_COUNT   = 4;
const SLOTS        = ITEM_COUNT * 2;
const GAP          = 3;
const TOTAL_HEIGHT = SLOTS * GAP;

type ImageMaterialProps = {
    ref:      (el: ImageMaterialImpl | null) => void;
    uTexture: THREE.Texture;
    uTime:    number;
    uHover:   number;
    uSpeed:   number;
};

export default function Mesh() {
    const [img1, img2, img3, img4] = useTexture([
        "/images/look.jpg",
        "/images/blue.jpg",
        "/images/rosa.jpg",
        "/images/nurture.jpg",
    ]);

    const textures  = [img1, img2, img3, img4];
    const meshRefs  = useRef<(THREE.Mesh | null)[]>([]);
    const matRefs   = useRef<(ImageMaterialImpl | null)[]>([]);
    const hoverRefs = useRef<number[]>(Array(SLOTS).fill(0));

    const scrollY     = useRef(0);
    const scrollSpeed = useRef(0);
    const scroll      = useScroll();
    const lastOffset  = useRef(scroll.offset);

    useFrame(({ clock }) => {
        const delta = scroll.offset - lastOffset.current;
        lastOffset.current = scroll.offset;

        scrollSpeed.current = THREE.MathUtils.lerp(scrollSpeed.current, delta, 0.15);
        scrollY.current += delta * TOTAL_HEIGHT * 10;

        meshRefs.current.forEach((mesh, i) => {
            if (!mesh) return;

            let y = -i * GAP + scrollY.current;
            y = ((y % TOTAL_HEIGHT) + TOTAL_HEIGHT) % TOTAL_HEIGHT;
            if (y > TOTAL_HEIGHT / 2) y -= TOTAL_HEIGHT;
            mesh.position.y = y;

            const mat = matRefs.current[i];
            if (!mat) return;

            mat.uTime  = clock.getElapsedTime();
            mat.uSpeed = scrollSpeed.current;
            mat.uHover = THREE.MathUtils.lerp(mat.uHover, hoverRefs.current[i], 0.08);
        });
    });

    return (
        <>
            {Array.from({ length: SLOTS }, (_, i) => (
                <mesh
                    key={i}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    onPointerEnter={() => {
                        document.body.style.cursor = "pointer";
                        hoverRefs.current[i] = 1;
                    }}
                    onPointerLeave={() => {
                        document.body.style.cursor = "default";
                        hoverRefs.current[i] = 0;
                    }}
                >
                    <planeGeometry args={[2.5, 2, 24, 24]} />

                    <imageMaterial
                        {...({
                            ref:      (el: ImageMaterialImpl | null) => { matRefs.current[i] = el; },
                            uTexture: textures[i % ITEM_COUNT],
                            uTime:    0,
                            uHover:   0,
                            uSpeed:   0,
                        } as unknown as ImageMaterialProps)}
                    />
                </mesh>
            ))}
        </>
    );
}