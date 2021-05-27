import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import PublicationBox from './PublicationBox'
import PublicationList from './PublicationList'

const Feed = () => {
  const router = useRouter()

  return (
    <Flex direction="column" alignItems="stretch" w="100%" height="100%" overflowX="hidden">
      {router?.pathname?.includes('home') && (
        <Box mb={8} px={12}>
          <PublicationBox />
        </Box>
      )}
      <PublicationList />
    </Flex>
  )
}

export default Feed
