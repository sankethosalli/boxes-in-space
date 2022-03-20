import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";

import { OrbitControls } from "drei";
import { Physics } from "use-cannon";
import Transform from "./Transform";
import styles from "./Task.module.scss";
const configLocal = require("./config");
const utilsLocal = require("./utils");

const getBoxes = utilsLocal.getBoxes;
const LOADED_BOXES = getBoxes(configLocal);

function Box({
  index,
  position,
  color,
  rotation,
  scale,
  active,
  refValue,
  boxes,
  setBoxes,
  setBoxDirect,
}) {
  const meshRef = useRef();

  const handleClick = () => {
    const modifiedBoxes = boxes.map((value, indexInner) => {
      if (value.index === index) {
        value.active = !value.active;
        value.ref = meshRef;
        setBoxDirect(() => meshRef);
        return value;
      } else {
        value.active = false;
        return value;
      }
    });

    setBoxes(() => modifiedBoxes);
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
      <meshLambertMaterial attach="material" color={active ? "black" : color} />
    </mesh>
  );
}

export default function Task() {
  const [boxes, setBoxes] = useState(() => LOADED_BOXES);
  const [box, setBox] = useState(() => {});
  const [boxDirect, setBoxDirect] = useState(() => {});

  useEffect(() => {
    const boxInner = boxes.filter((value) => value.active === true);

    if (boxInner.length) {
      setBox(() => boxInner[0]);
    } else {
      setBox(() => {});
      setBoxDirect(() => {});
    }
  }, [boxes]);

  useEffect(() => {
    // console.log(box, "Task");
    if (box) {
      const modifiedBoxes = boxes.map((value, indexInner) => {
        if (value.index === box.index) {
          value.ref = box.ref;
          return value;
        } else {
          return value;
        }
      });

      setBoxes(() => modifiedBoxes);
    }
  }, [box]);

  // console.log(box, "Task");
  return (
    <>
      <div className="row" style={{ padding: 0, margin: 0 }}>
        <div className="col-2">
          <Transform index={box ? box.index : null} box={boxDirect} />
        </div>

        <div className={"col-10 " + styles.Canvas} style={{ outline: "none" }}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />

            <Physics>
              {boxes.map((value, index) => {
                const color = value.color;
                const position = value.position;
                const rotation = value.rotation;
                const scale = value.scale;
                const active = value.active;
                const ref = value.ref;

                return (
                  <Box
                    key={value.index}
                    index={value.index}
                    position={[position[0], position[1], position[2]]}
                    color={color}
                    active={active}
                    refValue={ref}
                    rotation={rotation}
                    scale={scale}
                    boxes={boxes}
                    setBoxes={setBoxes}
                    setBoxDirect={setBoxDirect}
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
