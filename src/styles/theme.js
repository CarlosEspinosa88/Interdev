import { fontFamilies } from './fontFamilies';

export const theme = {
  color: {
    primary: '#28E288',
    secondary: '#005A5A',
    disabled: '#B4B4B4',
    white: '#FFFFFF',
    red: '#d93025',
    gray: {
      clear: '#f0f0f0',
      light: '#B4B4B4',
      dark: '#373A36',
    },
    primaryGreenOpacity70: 'rgb(40 226 136 / 70%)',
    secondaryGreenOpacity90: 'rgb(0 90 90 / 90%)',
    disabledGrayOpacity20: 'rgb(0 0 0 / 20%)',
    grayLightOpacity70: 'rgb(191 191 191 / 70%)'
  },
  font: {
    family: {
      bold: fontFamilies.bold,
      regular: fontFamilies.regular,
    },
  },
}