import { prefetchSession } from '../services/session'

export const authGuard = async (req, redirectToLogin = true) => {
  try {
    await prefetchSession(req)

    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  } catch (err) {
    if (redirectToLogin) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    return { props: {} }
  }
}
