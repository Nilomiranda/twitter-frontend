import { Button, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { User } from '../../interfaces/user'
import UserHeader from './UserHeader'
import { UserContext } from '../../contexts/CurrentUser'
import useFollow from '../../hooks/useFollow'

interface UserFollowCardProps {
  user: User
}

const UserFollowCard = ({ user }: UserFollowCardProps) => {
  const userContext = useContext(UserContext)
  const [isFollowing, followUnfollow] = useFollow(user?.id)

  return (
    <Flex direction="row" justifyContent="space-between" w="100%">
      <UserHeader user={user} />
      {userContext?.user?.id !== user?.id ? (
        <Button colorScheme={isFollowing ? null : 'green'} onClick={followUnfollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </Flex>
  )
}

export default UserFollowCard
