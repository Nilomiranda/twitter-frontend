import { httpClient } from '../config/queryClient'

export interface SignUpPayload {
  email: string
  nickname: string
  password: string
}

export const createUser = async (payload: SignUpPayload) => httpClient.post('users', payload)
