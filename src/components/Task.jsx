import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, usePlane, useBox } from "use-cannon";
import { useSpring, animated, a } from "react-spring";
import "./styles.css";

const COLORS = [
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
];

function Box({ position }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [0.8, 0.8, 0.8] : [0.4, 0.4, 0.4],
    color: hovered ? COLORS[Math.floor(Math.random() * COLORS.length)] : "grey",
  });

  const [ref, api] = useBox(() => ({ mass: 0, position: position }));

  const handleClick = () => {
    setActive(() => !active);
  };

  return (
    <mesh
      onClick={handleClick}
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={active ? [0.8, 0.8, 0.8] : [0.4, 0.4, 0.4]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial
        attach="material"
        color={
          hovered ? COLORS[Math.floor(Math.random() * COLORS.length)] : "grey"
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
        <Box position={[0, 0, 0]} />
        <Box position={[0, 2, 0]} />
        <Box position={[2, 0, 0]} />
        <Box position={[2, 2, 0]} />
        <Box position={[2, 4, 0]} />
      </Physics>
    </Canvas>
  );
}
