import { useQuery } from 'react-query'
import { Box } from '@chakra-ui/react'
import { Tweet } from '../../interfaces/tweet'
import PublicationCard from './PublicationCard'

const PublicationList = () => {
  const { data, error, isFetching } = useQuery<{ feed: Tweet[] }>('feed')

  if (error) {
    return <h2>Error loaading tweets</h2>
  }

  return (
    <ul>
      {data?.feed?.map((publication) => (
        <Box mb={4}>
          <PublicationCard publication={publication} loading={isFetching} />
        </Box>
      ))}
    </ul>
  )
}

export default PublicationList
