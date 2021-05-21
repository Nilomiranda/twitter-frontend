import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'
import { signOut } from '../services/session'
import Feed from '../components/home/Feed'
import SearchBox from '../components/search/SearchBox'

export default function Home() {
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

  return (
    <Flex direction="column" alignItems="center" as="main" w="100%" h="100%">
      <button onClick={handleSignOutClick} type="button">
        Sign out
      </button>
      <hr />
      <br />
      <br />
      <br />

      <Flex w="100%" height="100%" justifyContent="center" alignItems="flex-start">
        <Box w="25%" />
        <Flex w="35%" maxWidth="80rem" borderRight="1px" borderLeft="1px" borderColor="gray.200" px={12}>
          <Feed />
        </Flex>
        <Box w="25%" ml={12}>
          <SearchBox />
        </Box>
      </Flex>
    </Flex>
  )
}
