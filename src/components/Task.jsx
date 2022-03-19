import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, usePlane, useBox } from "use-cannon";
import "./styles.css";

function Box() {
  //   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      //   onClick={() => {
      //     api.velocity.set(0, 6, 4);
      //   }}
      //   ref={ref}
      position={[0, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  // const [ref] = usePlane(() => ({
  //   rotation: [-Math.PI / 2, 0, 0],
  // }));
  // ref={ref} rotation={[-Math.PI / 2, 0, 0]}
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

export default function Graphic() {
  return (
    <Canvas>
      {/* <OrbitControls /> */}
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      {/* <Physics> */}
      <Box />
      <Plane />
      {/* </Physics>  */}
    </Canvas>
  );
}
