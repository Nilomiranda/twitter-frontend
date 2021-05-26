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

  const handleScroll = (e) => {
    const percentageScrolled = Math.round(((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight) * 100) // 27%, 43%, etc.
    console.log('percentageScrolled', percentageScrolled)
    if (percentageScrolled > 85) {
      console.log('WILL LOAD NEXT PAGE')
    }
  }

  return (
    <Box as="ul" height="100%" overflowX="hidden" onScroll={handleScroll} px={12}>
      {data?.feed?.map((publication) => (
        <Box mb={4} key={publication?.id}>
          <PublicationCard publication={publication} loading={isFetching} />
        </Box>
      ))}
    </Box>
  )
}

export default PublicationList
