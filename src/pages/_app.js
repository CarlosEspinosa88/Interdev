import { globalStyles, theme } from '../styles'
import { ThemeProvider } from '@emotion/react'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
