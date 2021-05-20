import { Flex, Skeleton } from '@chakra-ui/react'
import { Tweet } from '../../interfaces/tweet'

interface PublicationCardProps {
  loading: boolean
  publication: Tweet
}

const PublicationCard = ({ publication, loading }: PublicationCardProps) => (
  <Flex direction="column" borderWidth="1px" borderRadius="0.5rem" borderColor="gray.200" padding="0.5rem">
    <Flex direction="row" w="100%" alignItems="flex-start">
      <Flex direction="column">{loading ? <Skeleton height="1.25rem" w="10rem" mb={4} /> : <strong>{publication?.user?.nickname}</strong>}</Flex>
    </Flex>
    {loading ? <Skeleton height="1.25rem" /> : <p>{publication?.text}</p>}
  </Flex>
)

export default PublicationCard
