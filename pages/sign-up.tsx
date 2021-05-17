import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'

const Login = () => (
  <>
    <Head>
      <title>Sign up</title>
    </Head>

    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h="100vh"
      w="100%"
    >
      <Heading as="h1" size="4xl" isTruncated mb={4}>
        Chist
      </Heading>

      <Heading as="h2" size="sm" fontWeight="normal" isTruncated mb={16}>
        Create an account
      </Heading>

      <FormControl maxW="24rem">
        <Box mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Your coolest email" />
        </Box>

        <Box mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Choose a super powerful password"
          />
        </Box>

        <Box mb={12}>
          <FormLabel>Confirm password</FormLabel>
          <Input type="password" placeholder="Confirm the super password" />
        </Box>

        <Button w="100%" colorScheme="green">
          Create account
        </Button>

        <Text mt={8}>
          Already have an account?{' '}
          <NextLink href="/login">Log in then</NextLink>
        </Text>
      </FormControl>
    </Box>
  </>
)

export default Login
