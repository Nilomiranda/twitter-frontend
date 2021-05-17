import { prefetchSession } from '../services/session'

export const authGuard = async (req) => {
  try {
    await prefetchSession(req)

    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
