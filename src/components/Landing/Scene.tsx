"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense } from 'react';
import Obj from "./Mesh";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10] }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
              <ScrollControls pages={10} damping={0.15} infinite>
                  <Obj />
              </ScrollControls>
          </Suspense>
      </Canvas>  
    );
}