import axios from "axios";
import {QueryClient} from "react-query";
import Router from "next/router";

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/',
})

const defaultQueryFunction = async ({ queryKey }) => {
  try {
    const { data } = await httpClient.get(queryKey)
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
