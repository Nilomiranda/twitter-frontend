import { Button, Flex } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'
import { useContext } from 'react'
import { User } from '../../interfaces/user'
import UserHeader from './UserHeader'
import { followUser, unfollowUser } from '../../services/follow'
import { queryClient } from '../../config/queryClient'
import { UserContext } from '../../contexts/CurrentUser'

interface UserFollowCardProps {
  user: User
}

const UserFollowCard = ({ user }: UserFollowCardProps) => {
  const userContext = useContext(UserContext)
  const { data: followingData, refetch } = useQuery<{ following: boolean }>(`following/${userContext?.user?.id}/following?id=${user?.id}`, { enabled: !!userContext?.user?.id && !!user?.id })

  const followMutation = useMutation(() => followUser(user?.id))
  const unfollowMutation = useMutation(() => unfollowUser(user?.id))

  const handleUnfollow = async () => unfollowMutation?.mutateAsync()

  const handleFollow = async () => followMutation?.mutateAsync()

  const handleToggleFollowClick = async () => {
    const { following } = followingData || { following: false }

    try {
      if (following) {
        await handleUnfollow()
      } else {
        await handleFollow()
      }
      refetch()
      queryClient?.refetchQueries('feed')
      queryClient?.refetchQueries('sessions')
    } catch (err) {
      console.error('ERROR:: Could not follow or unfollow user', err)
    }
  }

  return (
    <Flex direction="row" justifyContent="space-between" w="100%">
      <UserHeader user={user} />
      {userContext?.user?.id !== user?.id ? (
        <Button colorScheme={followingData?.following ? null : 'green'} onClick={handleToggleFollowClick}>
          {followingData?.following ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </Flex>
  )
}

export default UserFollowCard
