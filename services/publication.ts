import { httpClient } from '../config/queryClient'

export const createPublication = async (text: string) => httpClient?.post('tweets', { text })
