/**
 * Holt sich die CSS-Farb-Variable mit dem angegebenen Namen.
 * @param {*} varName Die CSS-Farb-Variable die geholt werden soll, im Format mit -- (z.B. --panel)
 * @returns Die Farbe wie sie genutzt werden kann.
 */
const getCssColorVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

/**
 * Holt sich die CSS-Zahl-Variable mit dem angegebenen Namen. Schneidet dabei mit RegEx zusätze wie px, mm und co. weg.
 * @param {*} varName Die CSS-Zahl-Variable die geholt werden soll, im Format mit -- (z.B. --height)
 * @returns Die Zahl wie sie genutzt werden kann.
 */
const getCssNumberVariable = (varName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
    .replace(/[a-zA-Z]+/, "");
};

// Die Daten der Verschiedenen ICs.
// TODO Sinnvolle Daten hinterlegen
const icInfos = {
  12: {
    name: "IC 12",
    schaltung: "0 & 2 → 1",
    pins: 4,
    gates: [
      {
        type: "AND",
        connectors: [0, 2, 1],
      },
    ],
  },
  13: {
    name: "IC 13",
    schaltung: "0 | 2 → 1",
    pins: 4,
    gates: [
      {
        type: "OR",
        connectors: [0, 2, 1],
      },
    ],
  },
  14: {
    name: "IC 14",
    schaltung: "0 ^ 2 → 1",
    pins: 4,
    gates: [
      {
        type: "XOR",
        connectors: [0, 2, 1],
      },
    ],
  },
  15: {
    name: "IC 15",
    schaltung: "!0 → 1; !2 → 3",
    pins: 4,
    gates: [
      {
        type: "NOT",
        connectors: [0, 0, 1],
      },
      {
        type: "NOT",
        connectors: [2, 2, 3],
      },
    ],
  },
  1234: {
    name: "IC 1234",
    schaltung: "0 & 2 → i0; 4 & 6 → i1; i0 ^ i1 → 1; !i0 → 3; !i1 → 5",
    pins: 8,
    gates: [
      {
        type: "AND",
        connectors: [0, 2, "i0"],
      },
      {
        type: "AND",
        connectors: [4, 6, "i1"],
      },
      {
        type: "XOR",
        connectors: ["i0", "i1", 1],
      },
      {
        type: "NOT",
        connectors: ["i0", "i0", 3],
      },
      {
        type: "NOT",
        connectors: ["i1", "i1", 5],
      },
    ],
  },
  4444: {
    name: "IC 4444",
    schaltung: "0 & 2 → 1; 4 & 6 → 3",
    pins: 6,
    gates: [
      {
        type: "AND",
        connectors: [0, 2, 1],
      },
      {
        type: "AND",
        connectors: [4, 6, 3],
      },
    ],
  },
};

// Die Vordefinierten Farben und dazugehörige Werte wie Helligkeit und Transperenz gespeichert in hsla
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
  activeSignal: getCssColorVariable("--activeSignal"),
  deactiveSignal: getCssColorVariable("--deactiveSignal"),
  ledOn: 60,
  ledOff: 20,
  cableTrans: 0.3,
};

// TextSizes die im Projekt zu Nutzen sind.
const textSizes = {
  small: 6,
  medium: 12,
  large: 24,
};

// StrokeWeights die im Projekt zu Nutzen sind.
const strokeWeights = {
  small: 0.5,
  medium: 1,
  large: 2,
};

// Die Verschienden Größen aus denen alle Objekte zusammengesetzt werden.
const sizes = {
  pin: {
    circle: 4,
    rect: 8,
    rect_versatz: 1,
    plug_rundung: 1,
    plug_breite: 3,
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
    link_rect: 3,
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
