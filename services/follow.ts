import { httpClient } from '../config/queryClient'

export const followUser = async (userId: number) => httpClient.post(`following/${userId}/follow`)

export const unfollowUser = async (userId: number) => httpClient.delete(`following/${userId}/unfollow`)
