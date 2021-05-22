import { Box, Flex } from '@chakra-ui/react'
import Feed from '../components/home/Feed'
import SearchBox from '../components/search/SearchBox'
import UserProfileInfo from '../components/user/UserProfileInfo'

export default function Home() {
  return (
    <Flex direction="column" alignItems="center" as="main" w="100%" h="100%" pt="2rem">
      <Flex w="100%" height="100%" justifyContent="center" alignItems="flex-start">
        <Box w="25%">
          <UserProfileInfo />
        </Box>
        <Flex w="35%" maxWidth="80rem" borderRight="1px" borderLeft="1px" borderColor="gray.200" px={12}>
          <Feed />
        </Flex>
        <Box w="25%" ml={12}>
          <SearchBox />
        </Box>
      </Flex>
    </Flex>
  )
}
