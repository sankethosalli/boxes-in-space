import React from "react";
import styles from "./UserList.module.scss";
const configLocal = require("./config");

export default function UserList({
  selected,
  setSelected,
  setLeftNavigation,
  boxes,
  setBoxes,
  setBoxDirect,
}) {
  const handleTransform = (box) => {
    const modifiedBoxes = boxes.map((value, indexInner) => {
      if (value.index === box.index) {
        value.active = true;
        setBoxDirect(() => value.ref);
        return value;
      } else {
        value.active = false;
        return value;
      }
    });

    setBoxes(() => modifiedBoxes);
    setLeftNavigation(() => configLocal.LEFT_NAVIGATION.TRANSFORM);
  };

  const handleDrop = (box) => {
    const newSelected = selected.filter((value) => value !== box);
    setSelected(() => newSelected);
  };

  const handleDropAll = () => {
    setSelected(() => []);
  };

  return (
    <div className={styles.UserList}>
      <div className={styles.Header}>
        <h1>User List </h1>
        <h6>(Selected Boxes)</h6>
        <h6>(Click on Box(s) to Select)</h6>
        <br />
        <div>
          <ul>
            {selected &&
              selected.map((value, index) => {
                return (
                  <li key={index} className={styles.li}>
                    <span>{value.index}</span>

                    <span style={{ float: "right" }}>
                      <button
                        onClick={() => handleTransform(value)}
                        className="btn btn-sm btn-info"
                      >
                        Transform
                      </button>
                      &nbsp;
                      <button
                        onClick={() => handleDrop(value)}
                        className="btn btn-sm btn-danger"
                      >
                        Drop
                      </button>
                    </span>
                  </li>
                );
              })}
          </ul>
          {selected && selected.length >= 2 ? (
            <button
              onClick={() => handleDropAll()}
              className="btn btn-sm btn-outline-danger"
            >
              Drop All
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
