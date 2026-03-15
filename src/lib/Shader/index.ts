import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ImageMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uTime: 0.0,
        uHover: 0.0,
        uSpeed: 0.0,
    },
    `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;
        uniform float uSpeed;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            
            pos.z += sin(pos.y * 4.0 + uTime * 2.0) * abs(uSpeed) * 0.4;
           
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0)
        }
    `,
    `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uHover;
        uniform float uSpeed;
        
        void main() {
            vec2 uv = vUv;
            
            uv.y += sin(uv.x * 3.0 + uTime) * abs(uSpeed) * 0.03;
            
            float split = uHover * 0.012 + abs(uSpeed) * 0.008;
            float r = texture2D(uTexture, uv + vec2( split, 0.0)).r;
            float g = texture2D(uTexture, uv).g;
            float b = texture2D(uTexture, uv - vec2( split, 0.0)).b;
            
            gl_FragColor = vec4(col, 1.0);
        }
    `
);

export type ImageMaterialImpl = InstanceType<typeof ImageMaterial>;