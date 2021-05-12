import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from 'next/link'

const Login = () => {
  return (
     <>
       <Head>
         <title>Login</title>
       </Head>

       <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" h="100vh" w="100%">
         <Heading as="h1" size="4xl" isTruncated mb={4}>
           Chist
         </Heading>
         <Heading as="h2" size="sm" fontWeight="normal" isTruncated mb={16}>
           Log in to your account
         </Heading>

         <FormControl maxW="24rem">

           <Box mb={4}>
             <FormLabel>Email address</FormLabel>
             <Input type="email" placeholder="name@email.com" />
           </Box>

           <Box mb={12}>
             <FormLabel>Password</FormLabel>
             <Input type="password" placeholder="A super secure password I hope" />
           </Box>

           <Button w="100%" colorScheme="green">Log in</Button>

           <Text mt={8}>Don't have an account? <NextLink href="/sign-up"><Link style={{ color: "green" }}>Create one</Link></NextLink></Text>
         </FormControl>
       </Box>
     </>
  )
}

export default Login
