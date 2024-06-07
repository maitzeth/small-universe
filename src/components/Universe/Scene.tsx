import { Canvas } from '@react-three/fiber';
import { Models } from './Models';

export const Scene = () => {
  return (
    <Canvas>
      <Models />
    </Canvas>
  );
};
