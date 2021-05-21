import { httpClient } from '../config/queryClient'

export const createPublication = async (text: string) => httpClient?.post('tweets', { text })

export const deletePublication = async (publicationId: number) => httpClient?.delete(`tweets/${publicationId}`)
