import React, { useState, useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
// import { Stars } from "drei";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Physics, usePlane, useBox } from "use-cannon";
import { useSpring, animated, a } from "react-spring";
import Transform from "./Transform";
import styles from "./Task.module.scss";
const configLocal = require("./config");

const getActiveRange = () => {
  return (
    (Math.floor(Math.random() * configLocal.SCALE_RANGE[1] * 10) +
      configLocal.SCALE_RANGE[0] * 10) /
    10
  );
};

function Box({ position, setBox }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [0.8, 0.8, 0.8] : [0.4, 0.4, 0.4],
    color: hovered
      ? configLocal.COLORS[
          Math.floor(Math.random() * configLocal.COLORS.length)
        ]
      : "grey",
  });

  const handleClick = () => {
    setActive(() => !active);
    setBox(() => meshRef);
  };

  // Rotation Animation
  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01;
  // });

  // useEffect(() => {
  //   meshRef.current.rotation.x += Math.floor(
  //     Math.random() * configLocal.ROTATE_MAX
  //   );
  //   meshRef.current.rotation.y += Math.floor(
  //     Math.random() * configLocal.ROTATE_MAX
  //   );
  //   meshRef.current.rotation.z += Math.floor(
  //     Math.random() * configLocal.ROTATE_MAX
  //   );
  // });

  return (
    <mesh
      onClick={handleClick}
      ref={meshRef}
      position={position}
      // onPointerOver={() => setHovered(true)}
      // onPointerOut={() => setHovered(false)}
      // scale={active ? [0.8, 0.8, 0.8] : [0.4, 0.4, 0.4]}
      // scale={[getActiveRange(), getActiveRange(), getActiveRange()]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial
        attach="material"
        color={
          hovered
            ? "grey"
            : configLocal.COLORS[
                Math.floor(Math.random() * configLocal.COLORS.length)
              ]
        }
      />
    </mesh>
  );
}

function Torus({ position }) {
  return (
    <mesh>
      <torusBufferGeometry attach="geometry" position={[10, 3, 16, 100]} />
      <meshBasicMaterial attach="material" color={"0xffff00"} />
    </mesh>
  );
}

export default function Task() {
  const [boxes, setBoxes] = useState(() => []);
  const [box, setBox] = useState(() => null);

  return (
    <>
      <div className="row" style={{ padding: 0, margin: 0 }}>
        <div className="col-2">
          <Transform box={box} />
        </div>

        <div className={"col-10 " + styles.Canvas}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            {/* <OrbitControls /> */}

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />

            <Physics>
              <Box position={[0, 2, 0]} setBox={setBox} />
              <Box position={[-2, 2, 0]} setBox={setBox} />
              <Box position={[-4, 2, 0]} setBox={setBox} />
              <Box position={[2, 2, 0]} setBox={setBox} />
              <Box position={[4, 2, 0]} setBox={setBox} />

              <Box position={[0, 0, 0]} setBox={setBox} />
              <Box position={[-2, 0, 0]} setBox={setBox} />
              <Box position={[-4, 0, 0]} setBox={setBox} />
              <Box position={[2, 0, 0]} setBox={setBox} />
              <Box position={[4, 0, 0]} setBox={setBox} />

              <Box position={[0, -2, 0]} setBox={setBox} />
              <Box position={[-2, -2, 0]} setBox={setBox} />
              <Box position={[-4, -2, 0]} setBox={setBox} />
              <Box position={[2, -2, 0]} setBox={setBox} />
              <Box position={[4, -2, 0]} setBox={setBox} />
            </Physics>
          </Canvas>
        </div>
      </div>
    </>
  );
}
