import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ImageShader = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uTime: 0,
        uHover: 0,
    },
    `
        varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;

      vec3 pos = position;
      // Wave distortion on hover
      pos.z += sin(pos.x * 3.0 + uTime * 2.0) * 0.05 * uHover;
      pos.z += sin(pos.y * 3.0 + uTime * 2.0) * 0.05 * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vec2 uv = vUv;

      // Subtle RGB split on hover
      float split = uHover * 0.008;
      float r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(split, 0.0)).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
);

