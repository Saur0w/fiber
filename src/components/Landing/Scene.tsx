"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react';
import Obj from "./Cube";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10] }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
              <Obj />
          </Suspense>
      </Canvas>  
    );
}