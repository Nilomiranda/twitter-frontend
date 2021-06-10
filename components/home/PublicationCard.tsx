import { Flex, Skeleton, IconButton, useToast, Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useContext, useState } from 'react'
import { Tweet } from '../../interfaces/tweet'
import { deletePublication, likePublication, unlikePublication } from '../../services/publication'
import { translateErrors } from '../../utils/translateErrors'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'
import UserHeader from '../user/UserHeader'
import { UserContext } from '../../contexts/CurrentUser'
import HeartIcon from '../../icons/HeartIcon'

interface PublicationCardProps {
  loading: boolean
  publication: Tweet
}

const PublicationCard = ({ publication, loading }: PublicationCardProps) => {
  const toast = useToast()
  const userContext = useContext(UserContext)

  const [innerPublication, setInnerPublication] = useState<Tweet>(publication)

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
    if (!innerPublication?.id) return

    try {
      await deletePublication(innerPublication?.id)
      handleDeletionSuccess()
    } catch (err) {
      console.error('ERROR: Could not delete publication', err)
      handleDeletionError(err)
    }
  }

  const handleUnlikePublication = async () => {
    try {
      setInnerPublication((previousPublicationState) => ({ ...previousPublicationState, liked: false }))
      unlikePublication(innerPublication?.id)
    } catch (err) {
      console.error('Error unliking', err)
      setInnerPublication((previousPublicationState) => ({ ...previousPublicationState, liked: true }))
    }
  }

  const handleLikePublication = async () => {
    try {
      setInnerPublication((previousPublicationState) => ({ ...previousPublicationState, liked: true }))
      likePublication(innerPublication?.id)
    } catch (err) {
      setInnerPublication((previousPublicationState) => ({ ...previousPublicationState, liked: false }))
    }
  }

  const handleLikeClick = () => {
    if (innerPublication?.liked) {
      handleUnlikePublication()
    } else {
      handleLikePublication()
    }
  }

  return (
    <Flex direction="column" borderWidth="1px" borderRadius="0.5rem" borderColor="gray.200" padding="0.5rem">
      <Flex direction="row" w="100%" alignItems="flex-start">
        <Flex direction="column">
          {loading ? (
            <Skeleton height="1.25rem" w="10rem" mb={4} />
          ) : (
            <Box mb={4}>
              <UserHeader user={innerPublication?.user} />
            </Box>
          )}
        </Flex>
      </Flex>
      {loading ? <Skeleton height="1.25rem" /> : <p>{innerPublication?.text}</p>}

      <Flex alignItems="center">
        <IconButton onClick={handleLikeClick} variant="ghost" aria-label="Search database" icon={<HeartIcon liked={innerPublication?.liked} />} />

        {userContext?.user?.id === innerPublication?.user?.id ? (
          <IconButton onClick={handleDeleteClick} aria-label="Delete publication" title="Delete publication" variant="ghost" ml="auto" colorScheme="red" icon={<DeleteIcon />} />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default PublicationCard
