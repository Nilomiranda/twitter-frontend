import { Avatar, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { User } from '../../interfaces/user'

interface UserHeaderProps {
  user: User
}

const UserHeader = ({ user }: UserHeaderProps) => {
  if (!user) return null

  return (
    <Link href={`/user/${user?.id}`}>
      <Flex alignItems="center" cursor="pointer">
        <Avatar name={user.nickname} src={user.profile_picture_url} />
        <Text ml={2} fontSize="sm">
          {user.nickname}
        </Text>
      </Flex>
    </Link>
  )
}

export default UserHeader
