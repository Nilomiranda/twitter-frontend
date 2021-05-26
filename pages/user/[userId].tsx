import { Box, Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useQuery } from 'react-query'
import MainLayout from '../../components/layouts/MainLayout'
import Feed from '../../components/home/Feed'
import { User } from '../../interfaces/user'
import UserProfileInfo from '../../components/user/UserProfileInfo'

const UserPage = () => {
  const router = useRouter()
  const { data: userData } = useQuery<{ user: User }>(`users/${router?.query?.userId}`)

  const handleBackClick = () => {
    router?.back()
  }

  return (
    <MainLayout>
      <Head>
        <title>Chist | {userData?.user?.nickname}</title>
      </Head>

      <Flex direction="column" alignItems="stretch">
        <IconButton variant="link" size="lg" alignSelf="flex-start" aria-label="Search database" icon={<ArrowBackIcon />} onClick={handleBackClick} mb={8} />
        <Box mb={16}>
          <UserProfileInfo user={userData?.user} withOtherUserToolbar />
        </Box>
        <Feed />
      </Flex>
    </MainLayout>
  )
}

export default UserPage
