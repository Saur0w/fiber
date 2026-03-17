export const vertexShader = `
  uniform float uVelocity;
  varying vec2 vUv;
  varying float vWorldX;

  void main() {
    vUv = uv;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    
    vWorldX = worldPos.x;
    float wave = sin(worldPos.x * 0.9) * uVelocity * 0.006;

    worldPos.y += wave * 0.5;          
    worldPos.z += wave * 0.5;   

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  varying float vWorldX;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    float grayValue = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(grayValue);
    
    float distanceFromCenter = abs(vWorldX);
    float colorFactor = smoothstep(2.5, 4.5, distanceFromCenter);
    vec3 finalColor = mix(texColor.rgb, grayscale, colorFactor);
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;