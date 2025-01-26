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

// TODO für die ganzen Maße eine constante erstellen um einen Ort zum anpassen zu haben
const sizes = {
  pin: {
    circle: 4,
    rect: 8,
    rect_versatz: 1,
  },
  led: {
    circle: 8,
  },
  ledArray: {
    ledCircle: 8,
    ledVersatz: 20,
    yVersatz: 15
  },
};
