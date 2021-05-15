import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form";
import {useEffect} from "react";
import {useMutation} from "react-query";
import {httpClient} from "../config/queryClient";
import {Session} from "../interfaces/session";
import {useRouter} from "next/router";

type LoginInputs = {
  email: string,
  password: string,
}

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<LoginInputs>();
  const mutation = useMutation<{ data: Session }, unknown, { email: string; password: string }>(({ email, password }) => httpClient.post('sessions', { email, password }))
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    trigger()

    handleSubmit((event) => {
      mutation.mutate(
          { email: event?.email, password: event?.password },
          {
            onSuccess() {
              router.push("/home")
            }
          }
      )
    }, () => {
      console.log("invalid")
    })()
  }

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

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

           <FormControl maxW="24rem" isInvalid={errors && Object.keys(errors)?.length > 0}>
             <form onSubmit={onSubmit}>
               <Box mb={4}>
                 <FormLabel>Email address</FormLabel>
                 <Input type="email" placeholder="name@email.com" { ...register('email', { required: true }) } id="email" />
                 {errors.email && <FormErrorMessage>This field is required</FormErrorMessage>}
               </Box>

               <Box mb={12}>
                 <FormLabel>Password</FormLabel>
                 <Input type="password" placeholder="A super secure password I hope" { ...register('password', { required: true }) } id="password" />
                 {errors.password && <FormErrorMessage>This field is required</FormErrorMessage>}
               </Box>

               <Button w="100%" colorScheme="green" type="submit" isLoading={mutation.isLoading}>Log in</Button>

               <Text mt={8}>Don't have an account? <NextLink href="/sign-up"><Link style={{ color: "green" }}>Create one</Link></NextLink></Text>
             </form>
           </FormControl>
       </Box>
     </>
  )
}

export default Login
