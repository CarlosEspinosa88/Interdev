import { Global, css } from '@emotion/react'
import { fontFaces } from './fontFaces'
import { fontFamilies } from './fontFamilies'

export const globalStyles = (
  <Global
    styles={css`
      ${fontFaces}
      html,
      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        background: white;
        min-height: 100vh;
        font-family: ${fontFamilies.regular};
      }
    `}
  />
)