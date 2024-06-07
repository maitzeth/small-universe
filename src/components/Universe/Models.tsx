/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Cloud, Clouds, Environment, Float, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Cluster } from './Cluster';
import { Planet } from './Planet';

export const Models = () => {
  const planet = useRef(null);
  const camera = useRef(null);
  const cluster = useRef(null);

  // let angle = 0;

  useFrame(() => {
    // cluster.current.position.z = Math.random();
    // console.log(cluster.current);
    // @ts-ignore
    cluster.current.rotation.y += 0.0001;
    // @ts-ignore
    planet.current.rotation.y -= 0.0003;
    // camera.current.position.x =+ Math.PI;
    // camera.current.position.x += 0.001;
    // camera.current.position.z += 0.001;

    // Camera to rotate on the center
    // angle += 0.0001; // Ajusta la velocidad del movimiento circular
    // const radius = 0.8; // Ajusta el radio del círculo
    // if (camera.current) {
    //   camera.current.position.x = radius * Math.cos(angle);
    //   camera.current.position.z = radius * Math.sin(angle);
    //   camera.current.lookAt(0, 0, 0); // Asegúrate de que la cámara siempre mire al centro del grupo
    // }
  });

  // 
  return (
    <PerspectiveCamera ref={camera}>
      <Environment background files="/milky-way.jpg" />

      <OrbitControls
         enableZoom={false}
         enablePan={false}
      />

      <Stars radius={500} depth={0.5} />

      <Float>
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud seed={500} scale={10} volume={5} color="blue" fade={500} />
          <Cloud seed={500} scale={10} volume={1} color="purple" fade={500} />
        </Clouds>
      </Float>
      
      <group>
        <Planet ref={planet} position={[0.3, 0, 0]} />
        <Cluster ref={cluster} position={[0, 0, -0.5]} />
      </group>
    </PerspectiveCamera>
  )
}
