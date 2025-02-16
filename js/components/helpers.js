const getCssColorVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const getCssNumberVariable = (varName) => {
  return getComputedStyle(document.documentElement)
  .getPropertyValue(varName)
  .trim().replace(/[a-zA-Z]+/,"");
};

const colors = {
  background: getCssColorVariable("--background"),
  button: getCssColorVariable("--button"),
  outline: getCssColorVariable("--outline"),
  ledRed: getCssColorVariable("--ledRed"),
  ledGreen: getCssColorVariable("--ledGreen"),
  ledYellow: getCssColorVariable("--ledYellow"),
  cableRed: getCssColorVariable("--cableRed"),
  cableYellow: getCssColorVariable("--cableYellow"),
  cableGreen: getCssColorVariable("--cableGreen"),
  cableBlue: getCssColorVariable("--cableBlue"),
  pin: getCssColorVariable("--pin"),
  silver: getCssColorVariable("--silver"),
  ic: getCssColorVariable("--ic"),
  panel: getCssColorVariable("--panel"),
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
  menu: {
    width: 20,
    height: 20,
  },
};
