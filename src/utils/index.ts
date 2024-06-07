export const linearAnimation = (x: number, y: number, a: number) => {
  return x * (1 - a) + y * a;
};

// Shaders
// export const vertex = `
// void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `

// export const fragment = `
// void main() {
//   gl_FragColor = vec4(1., 0., 0., 1.);
// }
// `;

export const vertex = `
  varying vec2 vUv;
  uniform vec2 uOffset;
  uniform float uAmplitude;
  float PI = 3.141592653589793238;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uOffset.x * uAmplitude;
    newPosition.y += sin(uv.x * PI) * uOffset.y * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

export const fragment = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uAlpha;

  void main() {
      vec3 texture = texture2D(uTexture, vUv).rgb;
      gl_FragColor = vec4(texture, uAlpha);
  }
`
