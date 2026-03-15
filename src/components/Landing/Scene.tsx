"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react';
import Cube from "./Cube";
import { Stars } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, -10, -10] }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Suspense fallback={null}>
              <Cube />
          </Suspense>
      </Canvas>  
    );
}