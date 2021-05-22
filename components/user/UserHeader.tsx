import { Avatar, Flex, Text } from '@chakra-ui/react'
import { User } from '../../interfaces/user'

interface UserHeaderProps {
  user: User
}

const UserHeader = ({ user }: UserHeaderProps) => {
  if (!user) return null

  return (
    <Flex direction="row" alignItems="center">
      <Avatar name={user.nickname} src={user.profile_picture_url} />
      <Text ml={2} fontSize="sm">
        {user.nickname}
      </Text>
    </Flex>
  )
}

export default UserHeader
