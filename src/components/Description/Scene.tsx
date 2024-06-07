/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAspect, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { animate, useMotionValue, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { fragment, linearAnimation, vertex } from '../../utils';
import { useMouse } from '../../hooks/useMouse';
import styles from './style.module.css';

type ActiveProjectProps = {
  activeProject: number | null;
}

const images = [
  {
    src: "/images/1.jpg"
  },
  {
    src: "/images/2.jpg"
  },
  {
    src: "/images/3.jpg"
  },
  {
    src: "/images/4.jpg"
  },
  {
    src: "/images/5.jpg"
  },
];

const Model = ({ activeProject }: ActiveProjectProps) => {
  const mesh = useRef<any>(null);
  const { viewport } = useThree();
  const dimension = useWindowSize();
  const mouse = useMouse();
  const opacity = useMotionValue(0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const textures = images.map((project) => useTexture(project.src))

  const scale = useAspect(
    textures[0].image.width,
    textures[0].image.height,
    0.225
  );

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const uniforms = useRef({
    uTexture: { value: textures[0] },
    uOffset: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uAlpha: { value: 0 }
  });

  useEffect(() => {
    if(activeProject !== null){
      mesh.current.material.uniforms.uTexture.value = textures[activeProject]
      animate(opacity, 1, {duration: 0.2, onUpdate: progress => mesh.current.material.uniforms.uAlpha.value = progress})
    } else {
      animate(opacity, 0, {duration: 0.2, onUpdate: progress => mesh.current.material.uniforms.uAlpha.value = progress})
    }
  }, [activeProject, textures])

  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    smoothMouse.x.set(linearAnimation(smoothX, x.get(), 0.1));
    smoothMouse.y.set(linearAnimation(smoothY, y.get(), 0.1));

    mesh.current.material.uniforms.uOffset.value = {
      x: x.get() - smoothX,
      y: -1 * (y.get() - smoothY)
    }
  });

  const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
  const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

  return (
    <motion.mesh scale={scale} ref={mesh} position-x={x} position-y={y}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
        transparent={true}
      />
    </motion.mesh>
  );

};

export const Scene = ({ activeProject }: ActiveProjectProps) => {
  return (
    <div className={styles.canvas}>
      <Canvas>
        <Model activeProject={activeProject} />
      </Canvas>
    </div>
  );
}
