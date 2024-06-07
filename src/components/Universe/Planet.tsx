/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLoader, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
// import { useControls } from 'leva';
import { ForwardedRef, forwardRef } from 'react';
import { TextureLoader } from 'three';

export const Planet = forwardRef((props: JSX.IntrinsicElements['mesh'], ref: ForwardedRef<null>) => {
  const [colorMap]  = useLoader(TextureLoader, ['/2k_mars.jpg']);
  const { viewport } = useThree();

  // const materialProps = {
  //   thickness: { value: 3, min: 0, max: 3, step: 0.05 },
  //   roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
  //   transmission: {value: 1.0, min: 0, max: 1, step: 0.1},
  //   ior: { value: 3.0, min: 0, max: 3, step: 0.1 },
  //   chromaticAberration: { value: 1.0, min: 0, max: 1},
  //   backside: { value: true },
  // };

  return (
    <>
      <ambientLight intensity={0.03} />
      <directionalLight intensity={3.5} position={[1, 0, -.25]} />
      {/* @ts-ignore */}
      <motion.mesh ref={ref} {...props} scale={viewport.width / 8}>
        <sphereGeometry args={[1, 64, 64]}/>
        <meshStandardMaterial
          map={colorMap}
        />
      </motion.mesh>
    </>
  )
});
