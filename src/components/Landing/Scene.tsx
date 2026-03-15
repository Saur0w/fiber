"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense } from 'react';
import Obj from "./Cube";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10] }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
              <ScrollControls pages={4} damping={0.25} >
                  <Obj />
              </ScrollControls>
          </Suspense>
      </Canvas>  
    );
}