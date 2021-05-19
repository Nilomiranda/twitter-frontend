import { useMutation, useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { Tweet } from '../interfaces/tweet'
import { signOut } from '../services/session'
import Feed from '../components/home/Feed'

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
    <Flex direction="column" alignItems="center" as="main" w="100%" h="100%">
      <button onClick={handleSignOutClick} type="button">
        Sign out
      </button>
      <hr />
      <br />
      <br />
      <br />

      <Flex w="100%" height="100%" justifyContent="center" alignItems="center">
        <Box w="30%">Sidebar</Box>
        <Flex w="30%" maxWidth="80rem" borderRight="1px" borderLeft="1px" borderColor="gray.200">
          <Feed />
        </Flex>
        <Box w="30%">Sidebar</Box>
      </Flex>
    </Flex>
  )
}
