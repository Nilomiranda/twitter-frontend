import { Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useQuery } from 'react-query'
import MainLayout from '../../components/layouts/MainLayout'
import Feed from '../../components/home/Feed'
import { User } from '../../interfaces/user'

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
        <IconButton variant="link" size="lg" alignSelf="flex-start" aria-label="Search database" icon={<ArrowBackIcon />} onClick={handleBackClick} />
        <Feed />
      </Flex>
    </MainLayout>
  )
}

export default UserPage
