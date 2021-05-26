import axios from 'axios'
import { QueryClient } from 'react-query'
import Router from 'next/router'

export const httpClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

const defaultQueryFunction = async ({ queryKey }) => {
  try {
    const { data } = await httpClient.get(typeof queryKey === 'object' ? queryKey[0] : queryKey)
    return data
  } catch (err) {
    if (err?.response?.status === 401 && !Router.pathname.includes('login') && !Router.pathname.includes('sign-up')) {
      await Router.push('/login')
    }
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
    },
  },
})
