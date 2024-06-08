import { Canvas } from '@react-three/fiber';
import { Models } from './Models';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';

export const Scene = () => {

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Models />
        </Suspense>
      </Canvas>
      <Loader
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
        initialState={() => true}
      />
    </>
  );
};
