import '../styles/globals.css'
import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '../config/queryClient'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
