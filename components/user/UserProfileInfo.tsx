import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { EditIcon } from '@chakra-ui/icons'
import UserHeader from './UserHeader'
import { signOut } from '../../services/session'
import EditProfileModal from './EditProfileModal'
import { User } from '../../interfaces/user'
import useFollow from '../../hooks/useFollow'

interface UserProfileInfoProps {
  user: User
  withSignOutButton?: boolean
  withOtherUserToolbar?: boolean
  withEditProfileButton?: boolean
}

const UserProfileInfo = ({ user, withSignOutButton, withOtherUserToolbar, withEditProfileButton }: UserProfileInfoProps) => {
  const router = useRouter()
  const mutation = useMutation(() => signOut())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFollowing, followUnfollow] = useFollow(user?.id)

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
    <>
      <Flex direction="column">
        <Flex direction="column" mb={4}>
          <Flex>
            <UserHeader user={user} />
            {withSignOutButton && (
              <Button variant="link" colorScheme="green" ml={4} fontSize="sm" onClick={handleSignOutClick}>
                Sign out
              </Button>
            )}
          </Flex>
          {/* eslint-disable-next-line eqeqeq */}
          {withEditProfileButton ? (
            <Button aria-label="Edit profile" mt={4} alignSelf="flex-start" variant="outline" onClick={onOpen}>
              <EditIcon mr={2} />
              Edit profile
            </Button>
          ) : null}
        </Flex>
        <Flex direction="row" mt={2} borderBottomWidth="1px" borderColor="gray.100" pb={4}>
          <Flex direction="column" mr={4}>
            <Text fontSize="sm">Followers</Text>
            <Text fontWeight="bold" fontSize="2xl">
              {user?.followers_count}
            </Text>
          </Flex>
          <Flex direction="column" mr={4}>
            <Text fontSize="sm">Following</Text>
            <Text fontWeight="bold" fontSize="2xl">
              {user?.following_count}
            </Text>
          </Flex>
        </Flex>

        {withOtherUserToolbar && (
          <Flex justifyContent="flex-end" mt={4}>
            <Button colorScheme={isFollowing ? null : 'green'} onClick={followUnfollow}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </Flex>
        )}
      </Flex>
      <EditProfileModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

UserProfileInfo.defaultProps = {
  withSignOutButton: false,
  withOtherUserToolbar: false,
  withEditProfileButton: false,
}

export default UserProfileInfo
