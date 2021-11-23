import { fontFamilies } from './fontFamilies';

export const theme = {
  color: {
    primary: '#28E288',
    secondary: '#005A5A',
    disabled: '#B4B4B4',
    white: '#FFFFFF',
    red: '#d93025',
    gray: {
      light: '#B4B4B4',
      dark: '#373A36',
    },
    primaryGreenOpacity70: 'rgb(40 226 136 / 70%)',
    secondaryGreenOpacity90: 'rgb(0 90 90 / 90%)',
    disabledGrayOpacity20: 'rgb(0 0 0 / 20%)',
  },
  font: {
    family: {
      bold: fontFamilies.bold,
      regular: fontFamilies.regular,
    },
    // size: {
    //   small: fontSizes.small,
    //   medium: fontSizes.medium,
    //   large: fontSizes.large,
    // },
  },
  // shadow: {
  //   lightGrayOpacity10: boxShadows.lightGray,
  // },
};