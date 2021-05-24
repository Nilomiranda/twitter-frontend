import { Box, Flex } from '@chakra-ui/react'
import UserProfileInfo from '../user/UserProfileInfo'
import SearchBox from '../search/SearchBox'

const MainLayout = ({ children }) => (
  <Flex direction="column" alignItems="center" as="main" w="100%" h="100%" pt="2rem">
    <Flex w="100%" height="100%" justifyContent="center" alignItems="flex-start">
      <Box w="25%">
        <UserProfileInfo />
      </Box>
      <Flex w="35%" maxWidth="80rem" borderRight="1px" borderLeft="1px" borderColor="gray.200" px={12}>
        {children}
      </Flex>
      <Box w="25%" ml={12}>
        <SearchBox />
      </Box>
    </Flex>
  </Flex>
)

export default MainLayout
