import { useQuery } from 'react-query'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Tweet } from '../../interfaces/tweet'
import PublicationCard from './PublicationCard'

const PublicationList = () => {
  const router = useRouter()
  const { userId } = router?.query
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const { data, error, isFetching } = useQuery<{ feed: Tweet[]; has_next_page: boolean }>(userId ? `feed?user_id=${userId}&page=${currentPage}` : `feed?page=${currentPage}`, { enabled: hasNextPage })
  const [publications, setPublications] = useState<Tweet[]>([])

  if (error) {
    return <h2>Error loading tweets</h2>
  }

  const handleScroll = (e) => {
    const percentageScrolled = Math.round(((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight) * 100) // 27%, 43%, etc.
    if (percentageScrolled > 85 && !isFetching) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (data) {
      setHasNextPage(data?.has_next_page)
      if (currentPage === 1) {
        return setPublications([...data?.feed])
      }

      if (currentPage > 1) {
        return setPublications([...publications, ...data?.feed])
      }
    }
  }, [data])

  return (
    <Box as="ul" height="100%" overflowX="hidden" onScroll={handleScroll} px={12}>
      {publications.map((publication) => (
        <Box mb={4} key={publication?.id}>
          <PublicationCard publication={publication} loading={isFetching} />
        </Box>
      ))}
    </Box>
  )
}

export default PublicationList
