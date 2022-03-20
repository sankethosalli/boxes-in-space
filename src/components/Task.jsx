import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";

import { Physics } from "use-cannon";
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

const getTranslateRange = () => {
  return (
    (Math.floor(Math.random() * configLocal.TRANSLATE_RANGE[1] * 10) +
      configLocal.TRANSLATE_RANGE[0] * 10) /
    10
  );
};

const getBoxes = () => {
  const boxes = configLocal.BOX_MAX;
  const array = [];
  for (let i = 0; i < boxes; i++) {
    array.push({
      position: [getTranslateRange(), getTranslateRange(), getTranslateRange()],
      color:
        configLocal.COLORS[
          Math.floor(Math.random() * configLocal.COLORS.length)
        ],
      rotation: {
        x: Math.floor(Math.random() * configLocal.ROTATE_MAX),
        y: Math.floor(Math.random() * configLocal.ROTATE_MAX),
        z: Math.floor(Math.random() * configLocal.ROTATE_MAX),
      },
      scale: [getActiveRange(), getActiveRange(), getActiveRange()],
    });
  }
  return array;
};
const LOADED_BOXES = getBoxes();

function Box({ position, color, rotation, scale, setBox }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setBox(() => meshRef);
  };

  useEffect(() => {
    meshRef.current.rotation.x = rotation.x;
    meshRef.current.rotation.y = rotation.y;
    meshRef.current.rotation.z = rotation.z;
  });

  return (
    <mesh
      onClick={handleClick}
      ref={meshRef}
      position={position}
      scale={[scale[0], scale[1], scale[2]]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={hovered ? "grey" : color} />
    </mesh>
  );
}

export default function Task() {
  const [boxes, setBoxes] = useState(() => []);
  const [box, setBox] = useState(() => null);

  // console.log(LOADED_BOXES, "Task");
  return (
    <>
      <div className="row" style={{ padding: 0, margin: 0 }}>
        <div className="col-2">
          <Transform box={box} />
        </div>

        <div className={"col-10 " + styles.Canvas}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />

            <Physics>
              {LOADED_BOXES.map((value, index) => {
                const color = value.color;
                const position = value.position;
                const rotation = value.rotation;
                const scale = value.scale;
                return (
                  <Box
                    key={index}
                    position={[position[0], position[1], position[2]]}
                    color={color}
                    rotation={rotation}
                    scale={scale}
                    setBox={setBox}
                  />
                );
              })}
            </Physics>
          </Canvas>
        </div>
      </div>
    </>
  );
}
