import {prefetchSession} from "../services/session";

export async function getServerSideProps({ req }) {
  try {
    await prefetchSession(req)

    return {
      redirect: {
        destination: '/home',
        permanent: false,
      }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}

export default function Index() {
  return null
}
