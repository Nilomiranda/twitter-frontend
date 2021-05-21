import { Flex, Skeleton, IconButton, useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useQuery } from 'react-query'
import { Tweet } from '../../interfaces/tweet'
import { User } from '../../interfaces/user'
import { deletePublication } from '../../services/publication'
import { translateErrors } from '../../utils/translateErrors'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'

interface PublicationCardProps {
  loading: boolean
  publication: Tweet
}

const PublicationCard = ({ publication, loading }: PublicationCardProps) => {
  const toast = useToast()
  const { data } = useQuery<{ user: User }>('sessions')

  const handleDeletionSuccess = () => {
    toast({
      description: 'Publication deleted 🙂',
      status: 'success',
      duration: TOAST_DEFAULT_DURATION,
      isClosable: true,
    })
    queryClient?.refetchQueries('feed')
  }

  const handleDeletionError = (err) => {
    toast({
      title: 'Error in publication',
      description: translateErrors(err?.response?.data?.errors) || 'An unexpected error occurred. Please try again later',
      status: 'error',
      duration: TOAST_DEFAULT_DURATION,
      isClosable: true,
    })
  }

  const handleDeleteClick = async () => {
    if (!publication?.id) return

    try {
      await deletePublication(publication?.id)
      handleDeletionSuccess()
    } catch (err) {
      console.error('ERROR: Could not delete publication', err)
      handleDeletionError(err)
    }
  }

  return (
    <Flex direction="column" borderWidth="1px" borderRadius="0.5rem" borderColor="gray.200" padding="0.5rem">
      <Flex direction="row" w="100%" alignItems="flex-start">
        <Flex direction="column">{loading ? <Skeleton height="1.25rem" w="10rem" mb={4} /> : <strong>{publication?.user?.nickname}</strong>}</Flex>
      </Flex>
      {loading ? <Skeleton height="1.25rem" /> : <p>{publication?.text}</p>}

      {data?.user?.id === publication?.user?.id ? (
        <IconButton onClick={handleDeleteClick} aria-label="Delete publication" title="Delete publication" variant="ghost" alignSelf="flex-end" colorScheme="red" icon={<DeleteIcon />} />
      ) : null}
    </Flex>
  )
}

export default PublicationCard
