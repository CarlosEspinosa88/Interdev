import { Global, css } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        background: white;
        min-height: 100vh;
      }
    `}
  />
);