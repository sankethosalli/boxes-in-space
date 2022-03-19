import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, usePlane, useBox } from "use-cannon";
import { useSpring, animated, a } from "react-spring";
import "./styles.css";
const configLocal = require("./config");

const getActiveRange = () => {
  return (
    (Math.floor(Math.random() * configLocal.SCALE_RANGE[1] * 10) +
      configLocal.SCALE_RANGE[0] * 10) /
    10
  );
};

function Box({ position }) {
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

  // const [ref, api] = useBox(() => ({ mass: 0, position: position }));

  const handleClick = () => {
    setActive(() => !active);
  };

  // Rotation Animation
  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  useEffect(() => {
    meshRef.current.rotation.x += Math.floor(
      Math.random() * configLocal.ROTATE_MAX
    );
    meshRef.current.rotation.y += Math.floor(
      Math.random() * configLocal.ROTATE_MAX
    );
    meshRef.current.rotation.z += Math.floor(
      Math.random() * configLocal.ROTATE_MAX
    );
  });

  return (
    <mesh
      onClick={handleClick}
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      // scale={active ? [0.8, 0.8, 0.8] : [0.4, 0.4, 0.4]}
      scale={[getActiveRange(), getActiveRange(), getActiveRange()]}
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

export default function Task() {
  const [boxes, setBoxes] = useState(() => []);
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />

      <Physics>
        {/* <Plane /> */}
        {/* x,y,z */}
        <Box position={[0, 2, 0]} />
        <Box position={[-2, 2, 0]} />
        <Box position={[-4, 2, 0]} />
        <Box position={[2, 2, 0]} />
        <Box position={[4, 2, 0]} />

        <Box position={[0, 0, 0]} />
        <Box position={[-2, 0, 0]} />
        <Box position={[-4, 0, 0]} />
        <Box position={[2, 0, 0]} />
        <Box position={[4, 0, 0]} />

        <Box position={[0, -2, 0]} />
        <Box position={[-2, -2, 0]} />
        <Box position={[-4, -2, 0]} />
        <Box position={[2, -2, 0]} />
        <Box position={[4, -2, 0]} />
      </Physics>
    </Canvas>
  );
}
