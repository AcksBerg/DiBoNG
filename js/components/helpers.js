const getCssVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};
const colors = {
  background: getCssVariable("--background"),
  btnInactive: getCssVariable("--buttonInactive"),
  btnActive: getCssVariable("--buttonActive"),
  outline: getCssVariable("--outline"),
  ledRedOn: getCssVariable("--ledRedOn"),
  ledRedOff: getCssVariable("--ledRedOff"),
  ledGreenOn: getCssVariable("--ledGreenOn"),
  ledGreenOff: getCssVariable("--ledGreenOff"),
  ledYellowOn: getCssVariable("--ledYellowOn"),
  ledYellowOff: getCssVariable("--ledYellowOff"),
  connectorPin: getCssVariable("--connectorPin"),
  silver: getCssVariable("--silver"),
};

const textSizes = {
  small: 6,
  medium: 12,
  large: 24,
};

const strokeWeights = {
  small:0.5,
  medium: 1,
  large: 2
}

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
    yVersatz: 15
  },
  btnArray:{
    size: 20,
  },
  socket:{
    xVersatz: 15,
    yVersatz: 10,
    border: 3
  }
};
