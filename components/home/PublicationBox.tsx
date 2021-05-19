import { Box, FormControl, Textarea, Button } from '@chakra-ui/react'

const PublicationBox = () => {
  const handlePublicationSubmit = (event) => {
    event?.preventDefault()
    console.log('creating new publication')
  }

  return (
    <FormControl id="publication">
      <Box as="form" w="100%" display="flex" flexDirection="column" alignItems="flexEnd" onSubmit={handlePublicationSubmit}>
        <Textarea placeholder="Here is a sample placeholder" />
        <Button type="submit">Publish</Button>
      </Box>
    </FormControl>
  )
}

export default PublicationBox
