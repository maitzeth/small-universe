import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { ForwardedRef, forwardRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['StarCluster3_03_-__0']: THREE.Mesh
    ['StarCluster2_02_-__0']: THREE.Mesh
    ['StarCluster1_01_-__0']: THREE.Mesh
  }
  materials: {
    ['03_-']: THREE.MeshStandardMaterial
    ['02_-']: THREE.MeshStandardMaterial
    ['01_-']: THREE.MeshStandardMaterial
  }
}

export const Cluster = forwardRef((props: JSX.IntrinsicElements['group'], ref: ForwardedRef<null>) => {
  const { nodes, materials } = useGLTF(
    '/cluster.glb'
  ) as GLTFResult;

  const { viewport } = useThree();

  return (
    <group {...props} scale={viewport.width / 3} ref={ref} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
          <group name="c0d234900f694cb2b1f4f457c9f91791fbx" rotation={[-Math.PI, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="StarCluster3" scale={100}>
                  <group name="Object_5" position={[-0.703, 0, 0]}>
                    <mesh
                      name="StarCluster3_03_-__0"
                      castShadow
                      receiveShadow
                      geometry={nodes['StarCluster3_03_-__0'].geometry}
                      material={materials['03_-']}
                    />
                  </group>
                </group>
                <group name="StarCluster2" scale={49.606}>
                  <group name="Object_8" position={[-1.549, 0, 0]}>
                    <mesh
                      name="StarCluster2_02_-__0"
                      castShadow
                      receiveShadow
                      geometry={nodes['StarCluster2_02_-__0'].geometry}
                      material={materials['02_-']}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/star_cluster_-_15k_stars_model.glb')