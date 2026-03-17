export const vertexShader = `
  uniform float uVelocity;
  varying vec2 vUv;
  varying float vWorldX;

  float smootherStep(float edge0, float edge1, float x) {
    x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return x * x * x * (x * (x * 6.0 - 8.0) + 10.0);
  }

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldX = worldPos.x * 0.5;

    float distanceFromCenter = abs(worldPos.x * 0.18); 
    float edgeFactor = smootherStep(0.0, 5.0, distanceFromCenter);

    float wave = sin(worldPos.x * 0.0009) * uVelocity * 1.8;
    
    worldPos.y -= (wave * edgeFactor) * 1.9;
    worldPos.z += (wave * edgeFactor) * 0.8;
    
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
    vec3 grayscale = vec3(grayValue); // Creates a vec3 like (gray, gray, gray)
    float distanceFromCenter = abs(vWorldX);

    float colorFactor = smoothstep(2.5, 4.5, distanceFromCenter);

    vec3 finalColor = mix(texColor.rgb, grayscale, colorFactor);

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;