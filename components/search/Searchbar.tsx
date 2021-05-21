import { Flex, Input, IconButton } from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface SearchbarProps {
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onSearch: (searchParams?: string) => void
}

const Searchbar = ({ placeholder, onSearch }: SearchbarProps) => {
  const [searchParams, setSearchParams] = useState('')

  const handleSearchSubmit = (event) => {
    event?.preventDefault()
    onSearch(searchParams)
  }

  return (
    <Flex as="form" direction="row" alignItems="center" onSubmit={handleSearchSubmit}>
      <Input placeholder={placeholder} onChange={(event) => setSearchParams(event?.target?.value)} />
      <IconButton aria-label="Search database" icon={<SearchIcon />} ml={2} type="submit" />
    </Flex>
  )
}

Searchbar.defaultProps = {
  placeholder: 'Search',
}

export default Searchbar
