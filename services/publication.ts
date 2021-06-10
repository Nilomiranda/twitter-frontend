import { httpClient } from '../config/queryClient'

export const createPublication = async (text: string) => httpClient?.post('tweets', { text })

export const deletePublication = async (publicationId: number) => httpClient?.delete(`tweets/${publicationId}`)

export const likePublication = async (publicationId: number) => httpClient?.post(`tweets/${publicationId}/like`)

export const unlikePublication = async (publicationId: number) => httpClient?.delete(`tweets/${publicationId}/like`)
