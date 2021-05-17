import axios, { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'
import { User } from '../interfaces/user'

export const prefetchSession = async (
  req
): Promise<AxiosResponse<{ user: User }>> =>
  axios.get<{ user: User }>('http://localhost:3000/sessions', {
    headers: req?.headers,
  })

export const signIn = async ({
  email,
  password,
  nickname,
}: {
  email: string
  password: string
  nickname: string
}) => httpClient.post('sessions', { email, password, nickname })

export const signOut = async () => httpClient.delete('sessions')
