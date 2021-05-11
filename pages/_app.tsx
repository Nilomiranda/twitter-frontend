import '../styles/globals.css'
import {QueryClientProvider} from "react-query";
import {queryClient} from "../config/queryClient";

function MyApp({ Component, pageProps }) {
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
  )
}

export default MyApp
