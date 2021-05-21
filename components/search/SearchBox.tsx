import { Box, Flex } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import SearchResultsList from './SearchResultsList'
import Searchbar from './Searchbar'
import { User } from '../../interfaces/user'

const SearchBox = () => {
  const [userSearchParams, setUserSearchParams] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const { refetch } = useQuery<{ users: User[] }>(`users?query=${userSearchParams}`, { enabled: false })

  const handleSearch = async (searchParams: string) => {
    if (!searchParams) return

    setUserSearchParams(searchParams)
  }

  const searchForUser = async () => {
    try {
      if (!userSearchParams) return

      refetch().then(({ data }) => {
        setUsers(data?.users || [])
      })
    } catch (err) {
      console.error("ERROR: Couldn't search for users")
    }
  }

  useEffect(() => {
    searchForUser()
  }, [userSearchParams])

  return (
    <Flex direction="column">
      <Box mb={4}>
        <Searchbar placeholder="Search for a user" onSearch={handleSearch} />
      </Box>
      <SearchResultsList users={users} searched={!!userSearchParams} />
    </Flex>
  )
}

export default SearchBox
