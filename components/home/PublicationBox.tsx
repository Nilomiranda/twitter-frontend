import { Box, FormControl, Textarea, Button } from '@chakra-ui/react'

const PublicationBox = () => {
  const handlePublicationSubmit = (event) => {
    event?.preventDefault()
    console.log('creating new publication')
  }

  return (
    <FormControl id="publication">
      <Box as="form" w="100%" display="flex" flexDirection="column" alignItems="flex-end" onSubmit={handlePublicationSubmit}>
        <Textarea placeholder="What have you been thinking about?" />
        <Button type="submit" mt={8} colorScheme="green">
          Publish
        </Button>
      </Box>
    </FormControl>
  )
}

export default PublicationBox
