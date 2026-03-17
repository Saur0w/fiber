"use client";

import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";

export default function Scene() {
    return (
        <Canvas
            camera={{position: [0, 0, 10], fov: 50}}
            gl={{ antialias: true, alpha: true }}
        >
            <Mesh />
        </Canvas>
    )
}