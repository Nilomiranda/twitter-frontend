import { useQuery } from 'react-query'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Tweet } from '../../interfaces/tweet'
import PublicationCard from './PublicationCard'

const PublicationList = () => {
  const router = useRouter()
  const { userId } = router?.query
  const { data, error, isFetching } = useQuery<{ feed: Tweet[] }>(userId ? `feed?user_id=${userId}` : 'feed')

  if (error) {
    return <h2>Error loaading tweets</h2>
  }

  return (
    <ul>
      {data?.feed?.map((publication) => (
        <Box mb={4} key={publication?.id}>
          <PublicationCard publication={publication} loading={isFetching} />
        </Box>
      ))}
    </ul>
  )
}

export default PublicationList
