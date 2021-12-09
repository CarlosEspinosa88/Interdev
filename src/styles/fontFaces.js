import { css } from '@emotion/react'

export const fontFaces = css`
  @font-face {
    font-family: 'DM Sans Regular';
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: url('/fonts/regular/dm-sans.woff2') format('woff2'),
      url('/fonts/regular/dm-sans.woff') format('woff');
    }

  @font-face {
    font-family: 'DM Sans Bold';
    font-style: bold;
    font-weight: 700;
    font-display: optional;
    src: url('/fonts/bold/dm-sans.woff2') format('woff2'),
      url('/fonts/bold/dm-sans.woff') format('woff');
  }
`
