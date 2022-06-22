// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ContextProvider } from '../contexts/ContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
