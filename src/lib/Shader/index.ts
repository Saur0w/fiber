import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ImageMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uTime:    0.0,
        uHover:   0.0,
        uSpeed:   0.0,
    },
    // Vertex Shader
    `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSpeed;

        void main() {
            vUv = uv;
            
            // 1. Get the position of the vertex relative to the camera
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            
            // 2. Calculate squared distance from the center of the screen.
            // Squaring X and Y creates a smooth, parabolic "reel" or "dome" curve.
            float distanceFromCenter = (viewPosition.x * viewPosition.x) + (viewPosition.y * viewPosition.y);
            
            // 3. Push the geometry backward (negative Z) at the edges.
            // We multiply by abs(uSpeed) so it stays perfectly flat when not scrolling.
            // Tweak the 0.015 multiplier to make the bend more or less aggressive!
            viewPosition.z -= distanceFromCenter * abs(uSpeed) * 0.015;

            gl_Position = projectionMatrix * viewPosition;
        }
    `,
    // Fragment Shader
    `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uHover;
        uniform float uSpeed;

        void main() {
            vec2 uv = vUv;
            
            // I've removed the internal sine wave distortion here to keep the 
            // images looking clean and flat, focusing just on the 3D reel effect.

            // RGB Shift (Chromatic Aberration) based on scroll speed and hover
            float split = uHover * 0.012 + abs(uSpeed) * 0.005;
            float r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
            float g = texture2D(uTexture, uv).g;
            float b = texture2D(uTexture, uv - vec2(split, 0.0)).b;

            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `
);

export type ImageMaterialImpl = THREE.ShaderMaterial & {
    uTexture: THREE.Texture;
    uTime:    number;
    uHover:   number;
    uSpeed:   number;
};