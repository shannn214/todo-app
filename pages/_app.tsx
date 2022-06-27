import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { TodoContextProvider } from '../contexts/TodoContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoContextProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </TodoContextProvider>
  )
}

export default MyApp
