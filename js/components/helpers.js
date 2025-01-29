const getCssVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

// TODO schauen ob man die Trans-Colors auch errechnen kann.
const colors = {
  background: getCssVariable("--background"),
  button: getCssVariable("--button"),
  outline: getCssVariable("--outline"),
  ledRedOn: getCssVariable("--ledRedOn"),
  ledRedOff: getCssVariable("--ledRedOff"),
  ledGreenOn: getCssVariable("--ledGreenOn"),
  ledGreenOff: getCssVariable("--ledGreenOff"),
  ledYellowOn: getCssVariable("--ledYellowOn"),
  ledYellowOff: getCssVariable("--ledYellowOff"),
  cableRed: getCssVariable("--cableRed"),
  cableRedTrans: getCssVariable("--cableRedTrans"),
  cableYellow: getCssVariable("--cableYellow"),
  cableYellowTrans: getCssVariable("--cableYellowTrans"),
  cableGreen: getCssVariable("--cableGreen"),
  cableGreenTrans: getCssVariable("--cableGreenTrans"),
  cableBlue: getCssVariable("--cableBlue"),
  cableBlueTrans: getCssVariable("--cableBlueTrans"),
  pin: getCssVariable("--pin"),
  silver: getCssVariable("--silver"),
  ic: getCssVariable("--ic"),
  panel: getCssVariable("--panel"),
};

const textSizes = {
  small: 6,
  medium: 12,
  large: 24,
};

const strokeWeights = {
  small: 0.5,
  medium: 1,
  large: 2,
};

const sizes = {
  pin: {
    circle: 4,
    rect: 8,
    rect_versatz: 1,
  },
  led: {
    btn: 4,
    ledArray: 8,
  },
  ledArray: {
    ledVersatz: 20,
    yVersatz: 15,
  },
  btnArray: {
    size: 20,
  },
  socket: {
    xVersatz: 15,
    yVersatz: 10,
    border: 3,
    hebelLange: 12,
    hebelBreite: 1,
  },
  cable: {
    minAbstand: 15,
  },
};
