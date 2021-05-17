import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Tweet } from '../interfaces/tweet'
import { signOut } from '../services/session'

export default function Home() {
  const { data, error, isFetching } = useQuery<{ feed: Tweet[] }>('feed')
  const router = useRouter()
  const mutation = useMutation(() => signOut())

  const handleSignOutClick = async () => {
    try {
      await mutation.mutateAsync()
      await router.replace('/login')
    } catch (err) {
      console.error('Error signing out')
      alert('Error signing you out!')
    }
  }

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Error loaading tweets</h2>
  }

  return (
    <>
      <button onClick={handleSignOutClick} type="button">
        Sign out
      </button>
      <hr />
      <br />
      <br />
      <br />
      <ul>
        {data.feed.map((tweet) => (
          <li>{tweet.text}</li>
        ))}
      </ul>
    </>
  )
}
