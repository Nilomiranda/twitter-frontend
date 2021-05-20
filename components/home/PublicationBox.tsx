import { Box, FormControl, Textarea, Button, Text, useToast } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { createPublication } from '../../services/publication'
import { queryClient } from '../../config/queryClient'
import { translateErrors } from '../../utils/translateErrors'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'

const PUBlICATION_CONTEXT_MAX_LENGTH = 300

const PublicationBox = () => {
  const toast = useToast()

  const [publicationContent, setPublicationContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handlePublicationError = (err) => {
    toast({
      title: 'Error in publication',
      description: translateErrors(err?.response?.data?.errors) || 'An unexpected error occurred. Please try again later',
      status: 'error',
      duration: TOAST_DEFAULT_DURATION,
      isClosable: true,
    })
  }

  const handlePublicationSuccess = () => {
    setPublicationContent('')
    toast({
      title: 'Publication',
      description: 'Publication sent! 🥳',
      status: 'success',
      duration: TOAST_DEFAULT_DURATION,
      isClosable: true,
    })
    queryClient?.refetchQueries('feed')
  }

  const handlePublicationSubmit = async (event) => {
    event?.preventDefault()
    if (!publicationContent) return
    setSubmitting(true)
    try {
      await createPublication(publicationContent)
      handlePublicationSuccess()
    } catch (err) {
      console.error('ERROR: Error when creating new publication', err)
      handlePublicationError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const charactersLeft = useMemo(() => PUBlICATION_CONTEXT_MAX_LENGTH - publicationContent?.length || 0, [publicationContent])

  return (
    <FormControl id="publication">
      <Box as="form" w="100%" display="flex" flexDirection="column" alignItems="flex-end" onSubmit={handlePublicationSubmit}>
        <Text mb={2} fontSize="sm" color={charactersLeft < 0 ? 'tomato' : 'gray.500'}>
          {charactersLeft} characters left
        </Text>
        <Textarea placeholder="What have you been thinking about?" value={publicationContent} onChange={(event) => setPublicationContent(event?.target?.value)} height="150px" />
        <Button type="submit" mt={8} colorScheme="green" disabled={charactersLeft < 0 || submitting} isLoading={submitting}>
          Publish
        </Button>
      </Box>
    </FormControl>
  )
}

export default PublicationBox
