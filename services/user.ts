import { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'
import { User } from '../interfaces/user'

export interface SignUpPayload {
  email: string
  nickname: string
  password: string
}

export const createUser = async (payload: SignUpPayload) => httpClient.post('users', payload)

export const deleteProfilePicture = async (userId: number) => httpClient?.patch(`users/${userId}`, { profile_picture_url: null })

export const updateUserProfile = async (user: User): Promise<AxiosResponse<{ user: User }>> => httpClient?.patch(`users/${user?.id}`, user)
