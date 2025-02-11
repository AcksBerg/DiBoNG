const getCssVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const colors = {
  background: getCssVariable("--background"),
  button: getCssVariable("--button"),
  outline: getCssVariable("--outline"),
  ledRed: getCssVariable("--ledRed"),
  ledGreen: getCssVariable("--ledGreen"),
  ledYellow: getCssVariable("--ledYellow"),
  cableRed: getCssVariable("--cableRed"),
  cableYellow: getCssVariable("--cableYellow"),
  cableGreen: getCssVariable("--cableGreen"),
  cableBlue: getCssVariable("--cableBlue"),
  pin: getCssVariable("--pin"),
  silver: getCssVariable("--silver"),
  ic: getCssVariable("--ic"),
  panel: getCssVariable("--panel"),
  ledOn: 60,
  ledOff: 20,
  cableTrans: 0.3,
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
  powerButton: {
    mainsDisplacement: 2,
    width: 20,
    height: 40,
    border: 2,
    circle: 5,
  },
  menu:{
    width: 20,
    height: 20,
  }
};
