import React from "react";
import styles from "./Transform.module.scss";

const ACTIONS = {
  ROTATE: {
    LEFT: "LEFT",
    RIGHT: "RIGHT",

    UP: "UP",
    DOWN: "DOWN",
  },
  SCALE: {
    SHRINK: "SHRINK",
    ENLARGE: "ENLARGE",
  },
  TRANSLATE: {
    LEFT: "LEFT",
    RIGHT: "RIGHT",

    UP: "UP",
    DOWN: "DOWN",
  },
};

export default function Transform({ box }) {
  function rotate(action) {
    switch (action) {
      case ACTIONS.ROTATE.LEFT:
        box.current.rotation.y -= 0.1;
        return null;
      case ACTIONS.ROTATE.RIGHT:
        box.current.rotation.y += 0.1;
        return null;
      case ACTIONS.ROTATE.UP:
        box.current.rotation.x -= 0.1;
        return null;
      case ACTIONS.ROTATE.DOWN:
        box.current.rotation.x += 0.1;
        return null;
      default:
        return null;
    }
  }

  function scale(action) {
    switch (action) {
      case ACTIONS.SCALE.SHRINK:
        box.current.scale.x -= 0.1;
        box.current.scale.y -= 0.1;
        box.current.scale.z -= 0.1;
        return null;
      case ACTIONS.SCALE.ENLARGE:
        box.current.scale.x += 0.1;
        box.current.scale.y += 0.1;
        box.current.scale.z += 0.1;
        return null;
      default:
        return null;
    }
  }

  function translate(action) {
    switch (action) {
      case ACTIONS.TRANSLATE.LEFT:
        box.current.position.x -= 0.1;
        return null;
      case ACTIONS.TRANSLATE.RIGHT:
        box.current.position.x += 0.1;
        return null;
      case ACTIONS.TRANSLATE.UP:
        box.current.position.y += 0.1;
        return null;
      case ACTIONS.TRANSLATE.DOWN:
        box.current.position.y -= 0.1;
        return null;
      default:
        return null;
    }
  }

  return (
    <div className={styles.Transform}>
      <div className={styles.Header}>
        {box ? (
          <h1>Transform</h1>
        ) : (
          <>
            <h1>Transform</h1>
            <h6>(Click On any Box)</h6>
          </>
        )}
      </div>

      {box ? (
        <div className={styles.Controls}>
          <div className={styles.Section}>
            <h2>Rotate</h2>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => rotate(ACTIONS.ROTATE.LEFT)}
              >
                Left
              </button>
              &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => rotate(ACTIONS.ROTATE.RIGHT)}
              >
                Right
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => rotate(ACTIONS.ROTATE.UP)}
              >
                Up
              </button>
              &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => rotate(ACTIONS.ROTATE.DOWN)}
              >
                Down
              </button>
            </div>
          </div>

          <div className={styles.Section}>
            <h2>Scale</h2>
            <button
              className="btn btn-primary"
              onClick={() => scale(ACTIONS.SCALE.SHRINK)}
            >
              Shrink
            </button>
            &nbsp;
            <button
              className="btn btn-primary"
              onClick={() => scale(ACTIONS.SCALE.ENLARGE)}
            >
              Enlarge
            </button>
          </div>

          <div className={styles.Section}>
            <h2>Translate</h2>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => translate(ACTIONS.TRANSLATE.LEFT)}
              >
                Left
              </button>
              &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => translate(ACTIONS.TRANSLATE.RIGHT)}
              >
                Right
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => translate(ACTIONS.TRANSLATE.UP)}
              >
                Up
              </button>
              &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => translate(ACTIONS.TRANSLATE.DOWN)}
              >
                Down
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
