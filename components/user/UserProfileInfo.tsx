import { Button, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import UserHeader from './UserHeader'
import { UserContext } from '../../contexts/CurrentUser'
import { signOut } from '../../services/session'

const UserProfileInfo = () => {
  const userContext = useContext(UserContext)
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
    <Flex direction="column">
      <Flex mb={4}>
        <UserHeader user={userContext?.user} />
        <Button variant="link" colorScheme="green" ml={4} fontSize="sm" onClick={handleSignOutClick}>
          Sign out
        </Button>
      </Flex>
      <Flex direction="row" mt={2} borderBottomWidth="1px" borderColor="gray.100" w="80%" pb={4}>
        <Flex direction="column" mr={4}>
          <Text fontSize="sm">Followers</Text>
          <Text fontWeight="bold" fontSize="2xl">
            {userContext?.user?.followers_count}
          </Text>
        </Flex>
        <Flex direction="column" mr={4}>
          <Text fontSize="sm">Following</Text>
          <Text fontWeight="bold" fontSize="2xl">
            {userContext?.user?.following_count}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserProfileInfo
