import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";

import { OrbitControls } from "drei";
import { Physics } from "use-cannon";
import UserList from "./UserList";
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
  selected,
  setSelected,
}) {
  const meshRef = useRef();

  const handleClick = () => {
    const modifiedBoxes = boxes.map((value, indexInner) => {
      if (value.index === index) {
        value.active = !value.active;
        value.ref = meshRef;
        setBoxDirect(() => meshRef);

        setSelected(() => [...new Set([...selected, value])]);

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

function SaveButton({
  position = [0, 0, 0],
  scale = [0.6, 0.2, 0.1],
  active = false,
  color = "rgb(128,128,255)",
}) {
  const meshRef = useRef();

  const handleClick = () => {};

  return (
    <mesh
      onClick={handleClick}
      ref={meshRef}
      position={position}
      scale={[scale[0], scale[1], scale[2]]}
      className={styles.SaveButton}
      text={"Save"}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={active ? "black" : color} />
    </mesh>
  );
}

export default function Task() {
  const [leftNavigation, setLeftNavigation] = useState(
    () => configLocal.LEFT_NAVIGATION.LIST
  );
  const [boxes, setBoxes] = useState(() => LOADED_BOXES);
  const [box, setBox] = useState(() => {});
  const [boxDirect, setBoxDirect] = useState(() => {});
  const [selected, setSelected] = useState(() => []);

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
        <div className="col-2" style={{ padding: "10px" }}>
          <div>
            <button
              onClick={() =>
                setLeftNavigation(configLocal.LEFT_NAVIGATION.LIST)
              }
              className="btn btn-outline-dark"
            >
              List
            </button>
            &nbsp;
            <button
              onClick={() =>
                setLeftNavigation(configLocal.LEFT_NAVIGATION.TRANSFORM)
              }
              className="btn btn-outline-dark"
            >
              Transform
            </button>
            <a
              target={"_blank"}
              href={"https://github.com/sankethosalli/boxes-in-space.git"}
              style={{ float: "right" }}
            >
              Source Code
            </a>
          </div>
          <div>
            {leftNavigation ? (
              <>
                {leftNavigation === configLocal.LEFT_NAVIGATION.LIST ? (
                  <UserList
                    selected={selected}
                    setSelected={setSelected}
                    setLeftNavigation={setLeftNavigation}
                    boxes={boxes}
                    setBoxes={setBoxes}
                    setBoxDirect={setBoxDirect}
                  />
                ) : null}
                {leftNavigation === configLocal.LEFT_NAVIGATION.TRANSFORM ? (
                  <Transform
                    index={box ? box.index : null}
                    box={boxDirect}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ) : null}
              </>
            ) : null}
          </div>
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
                    selected={selected}
                    setSelected={setSelected}
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
