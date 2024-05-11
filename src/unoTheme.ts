import { colors as themeColors } from './colors'

const colors = { ...themeColors }

export const unoTheme = {
  colors,
  fontFamily: {
    archivo: 'Archivo Narrow',
    roboto: 'Roboto',
  },
  boxShadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 3px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
}
