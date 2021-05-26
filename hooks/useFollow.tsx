import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { UserContext } from '../contexts/CurrentUser'
import { followUser, unfollowUser } from '../services/follow'
import { queryClient } from '../config/queryClient'

const useFollow = (userId: number): [boolean, () => Promise<void>] => {
  const userContext = useContext(UserContext)
  const { data: followingData } = useQuery<{ following: boolean }>(`following/${userContext?.user?.id}/following?id=${userId}`, { enabled: !!userContext?.user?.id && !!userId })

  const [isFollowingUser, setIsFollowingUser] = useState(false)

  useEffect(() => {
    setIsFollowingUser(followingData?.following)
  }, [followingData])

  const followMutation = useMutation(() => followUser(userId))
  const unfollowMutation = useMutation(() => unfollowUser(userId))

  const handleUnfollow = async () => unfollowMutation?.mutateAsync()

  const handleFollow = async () => followMutation?.mutateAsync()

  const handleToggleFollow = async () => {
    try {
      if (isFollowingUser) {
        await handleUnfollow()
      } else {
        await handleFollow()
      }
      queryClient?.refetchQueries(`following/${userContext?.user?.id}/following?id=${userId}`)
      queryClient?.refetchQueries('feed')
      queryClient?.refetchQueries('sessions')
    } catch (err) {
      console.error('ERROR:: Could not follow or unfollow user', err)
    }
  }

  return [isFollowingUser, handleToggleFollow]
}

export default useFollow
