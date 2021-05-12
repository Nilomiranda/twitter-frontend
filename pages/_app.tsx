import '../styles/globals.css'
import {QueryClientProvider} from "react-query";
import {queryClient} from "../config/queryClient";
import { ChakraProvider } from "@chakra-ui/react";

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
