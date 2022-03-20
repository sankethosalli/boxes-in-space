export const getActiveRange = (configLocal) => {
  return (
    (Math.floor(Math.random() * configLocal.SCALE_RANGE[1] * 10) +
      configLocal.SCALE_RANGE[0] * 10) /
    10
  );
};

export const getTranslateRange = (configLocal) => {
  return (
    (Math.floor(Math.random() * configLocal.TRANSLATE_RANGE[1] * 10) +
      configLocal.TRANSLATE_RANGE[0] * 10) /
    10
  );
};

export const getBoxes = (configLocal) => {
  const boxes = configLocal.BOX_MAX;
  const array = [];
  for (let i = 0; i < boxes; i++) {
    array.push({
      index: i,
      position: [
        getTranslateRange(configLocal),
        getTranslateRange(configLocal),
        getTranslateRange(configLocal),
      ],
      color:
        configLocal.COLORS[
          Math.floor(Math.random() * configLocal.COLORS.length)
        ],
      rotation: {
        x: Math.floor(Math.random() * configLocal.ROTATE_MAX),
        y: Math.floor(Math.random() * configLocal.ROTATE_MAX),
        z: Math.floor(Math.random() * configLocal.ROTATE_MAX),
      },
      scale: [
        getActiveRange(configLocal),
        getActiveRange(configLocal),
        getActiveRange(configLocal),
      ],
      active: false,
      ref: null,
    });
  }
  return array;
};
