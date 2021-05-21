import { Stack, Text } from '@chakra-ui/react'
import SearchResult from './SearchResult'
import { User } from '../../interfaces/user'

interface SearchResultsListProps {
  users: User[]
  searched: boolean
}

const SearchResultsList = ({ users, searched }: SearchResultsListProps) => (
  <Stack>
    {users?.length > 0 ? users?.map((user) => <SearchResult user={user} key={user?.id} />) : null}

    {!users?.length && !searched ? <Text fontSize="sm">Search for user to see some results</Text> : null}

    {!users?.length && searched ? <Text>User not found</Text> : null}
  </Stack>
)

export default SearchResultsList
