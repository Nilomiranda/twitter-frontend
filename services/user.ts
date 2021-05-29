import { AxiosResponse } from 'axios'
import { httpClient } from '../config/queryClient'
import { User } from '../interfaces/user'

export interface SignUpPayload {
  email: string
  nickname: string
  password: string
}

export interface UpdateProfilePayload {
  nickname?: string
  current_password?: string
  new_password?: string
  new_password_confirmation?: string
  profile_picture_url?: string
}

export const createUser = async (payload: SignUpPayload) => httpClient.post('users', payload)

export const deleteProfilePicture = async (userId: number) => httpClient?.patch(`users/${userId}`, { profile_picture_url: null })

export const updateUserProfile = async (userId: number, user: UpdateProfilePayload): Promise<AxiosResponse<{ user: User }>> => httpClient?.patch(`users/${userId}`, user)
