const buttonColors = {
  primary: 'rgba(53, 52, 60, 1)',
  secondary: 'rgba(0, 123, 255, 1)',
  warning: 'rgba(255, 149, 0, 1)',
  success: 'rgba(52, 199, 89, 1)',
  error: 'rgba(255, 59, 48, 1)',
  info: 'rgba(48, 176, 199, 1)',
} as const

const buttonHoverColors = {
  primaryHover: 'rgba(117, 117, 117, 1)',
  secondaryHover: 'rgba(50, 173, 230, 1)',
  warningHover: 'rgba(184, 107, 0, 1)',
  successHover: 'rgba(38, 146, 65, 1)',
  purpleHover: 'rgba(114, 66, 193, 1)',
  errorHover: 'rgba(224, 11, 0, 1)',
  infoHover: 'rgba(0, 199, 190, 1)',
  greyHover: 'rgba(139, 140, 149, 1)',
} as const

const mainColors = {
  beach: '#FFFAF3',
  beachDark: '#E2CFBF',
  canyon: '#D9B59B',
  canyonLight: '#F9E9E1',
  canyonDark: '#AD754E',
  forest: '#042E30',
  forestLight: '#125E5C',
  forestDark: '#011111',
  mintLight: '#E8F3F2',
  newForest: '#158481',
  valley: '#66D210',
  valleyLight: '#A1FF3E',
  valleyDark: '#309600',
} as const

const accentColors = {
  blue: '#2582E2',
  blueLight: '#80CFFF',
  blueMedium: '#0441A3',
  blueDark: '#00246B',
  orange: '#FFA614',
  orangeLight: '#FFECB6',
  orangeMedium: '#D86C00',
  orangeDark: '#9E4000',
  purple: '#9E67EC',
  purpleLight: '#D2BBFF',
  purpleMedium: '#581EC6',
  purpleDark: '#31007F',
  teal: '#6FD5E4',
  tealLight: '#B3FDFF',
  tealMedium: '#058EAD',
  tealDark: '#00536D',
  red: '#FF4C35',
  redLight: '#FFA1A1',
  redMedium: '#D11915',
  redDark: '#7C0000',
} as const

const allGreys = {
  grey100: '#F7F7FC',
  grey200: '#EFF0F6',
  grey300: '#E4E5EE',
  grey400: '#DADCE2',
  grey500: '#C7C7CC',
  grey600: '#B0B1B7',
  grey700: '#8B8C95',
  grey800: '#636366',
  grey900: '#35343C',
} as const

const greys = {
  100: '#F7F7FC',
  200: '#EFF0F6',
  300: '#E4E5EE',
  400: '#DADCE2',
  500: '#C7C7CC',
  600: '#B0B1B7',
  700: '#8B8C95',
  800: '#636366',
  900: '#35343C',
} as const

const colors = {
  ...buttonColors,
  ...buttonHoverColors,
  ...accentColors,
  ...mainColors,
  ...allGreys,
  grey: { ...greys },
  body: 'rgba(70, 70, 72, 1)',
  white: '#FFFFFF',
  light: 'rgba(240, 240, 240, 1)',
  textDisabled: 'rgba(139, 140, 149, 1)',
  disabled: 'rgba(0, 0, 0, 0.12)',
  warmGrey: '#FCF9F6',
  black: '#000000',
} as const

export { buttonColors, buttonHoverColors, colors }
