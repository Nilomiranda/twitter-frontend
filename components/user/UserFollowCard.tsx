import { Button, Flex } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { User } from '../../interfaces/user'
import UserHeader from './UserHeader'

interface UserFollowCardProps {
  user: User
}

const UserFollowCard = ({ user }: UserFollowCardProps) => {
  const { data: userData } = useQuery<{ user: User }>('sessions')
  const { data: followingData } = useQuery<{ following: boolean }>(`following/${userData?.user?.id}/following?id=${user?.id}`, { enabled: !!userData?.user?.id && !!user?.id })

  const handleToggleFollowClick = () => {}

  return (
    <Flex direction="row" justifyContent="space-between" w="100%">
      <UserHeader user={user} />
      {userData?.user?.id !== user?.id ? (
        <Button colorScheme="green" onClick={handleToggleFollowClick}>
          {followingData?.following ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </Flex>
  )
}

export default UserFollowCard
