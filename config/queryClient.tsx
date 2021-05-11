import axios from "axios";
import {QueryClient} from "react-query";

const defaultQueryFunction = async ({ queryKey }) => {
  const { data } = await axios.get(`http://localhost:3000/${queryKey}`)
  return data
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
    }
  }
})
