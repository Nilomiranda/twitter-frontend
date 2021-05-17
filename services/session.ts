import axios, { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'
import { User } from '../interfaces/user'

export const prefetchSession = async (
  req
): Promise<AxiosResponse<{ user: User }>> => axios.get<{ user: User }>('http://localhost:3000/sessions', {
    headers: req?.headers,
  })

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => httpClient.post('sessions', { email, password })

export const signOut = async () => httpClient.delete('sessions')
