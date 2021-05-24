import { Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import MainLayout from '../../components/layouts/MainLayout'
import Feed from '../../components/home/Feed'

const UserPage = () => {
  const router = useRouter()

  const handleBackClick = () => {
    router?.back()
  }

  return (
    <MainLayout>
      <Flex direction="column" alignItems="stretch">
        <IconButton variant="link" size="lg" alignSelf="flex-start" aria-label="Search database" icon={<ArrowBackIcon />} onClick={handleBackClick} />
        <Feed />
      </Flex>
    </MainLayout>
  )
}

export default UserPage
