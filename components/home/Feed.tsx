import { Box, Flex } from '@chakra-ui/react'
import PublicationBox from './PublicationBox'
import PublicationList from './PublicationList'

const Feed = () => (
  <Flex direction="column" alignItems="stretch" w="100%">
    <Box mb={8}>
      <PublicationBox />
    </Box>
    <PublicationList />
  </Flex>
)

export default Feed
