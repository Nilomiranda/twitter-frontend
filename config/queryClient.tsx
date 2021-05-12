import axios from "axios";
import {QueryClient} from "react-query";
import Router from "next/router";

const defaultQueryFunction = async ({ queryKey }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/${queryKey}`)
    return data
  } catch (err) {
    if (err?.response?.status === 401) {
      await Router.push('/login')
    }
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
    }
  }
})
