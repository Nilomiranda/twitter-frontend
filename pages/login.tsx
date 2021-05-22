import { Box, Button, FormControl, FormLabel, Heading, Input, Text, FormErrorMessage, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { Session } from '../interfaces/session'
import { authGuard } from '../guards/auth'
import { signIn } from '../services/session'

import { TOAST_DEFAULT_DURATION } from '../config/constants'
import { translateErrors } from '../utils/translateErrors'
import { queryClient } from '../config/queryClient'

type LoginInputs = {
  email: string
  password: string
  nickname: string
}

export async function getServerSideProps({ req }) {
  return authGuard(req, false)
}

const Login = () => {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch,
  } = useForm<LoginInputs>()
  const mutation = useMutation<{ data: Session }, unknown, { email: string; password: string; nickname: string }>(({ email, password, nickname }) => signIn({ email, password, nickname }))
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    trigger()

    handleSubmit(
      async (submitEvent) => {
        const { email, password, nickname } = submitEvent || {
          email: '',
          password: '',
          nickname: '',
        }

        try {
          const loginResponse = await mutation.mutateAsync({
            email,
            password,
            nickname,
          })
          if (loginResponse) {
            await queryClient.refetchQueries('sessions')
            router.push('/home')
          }
        } catch (err) {
          toast({
            title: "Couldn't sign in",
            description: translateErrors(err?.response?.data?.errors) || 'An unexpected error occurred. Please try again later',
            status: 'error',
            duration: TOAST_DEFAULT_DURATION,
            isClosable: true,
          })
          console.error('DEBUG::ERROR:: Login error', err)
        }
      },
      () => {
        console.log('invalid')
      }
    )()
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
              <Input
                type="email"
                placeholder="name@email.com"
                {...register('email', {
                  validate: (email) => {
                    const nickname = getValues('nickname')
                    if (nickname || email) {
                      return true
                    }
                    if (!nickname && !email) {
                      return false
                    }
                  },
                })}
                disabled={!!watch('nickname')}
                id="email"
              />
              {errors.email && <FormErrorMessage>This field is required</FormErrorMessage>}
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" w="100%" mb={4} mt={8}>
              <Box flex={1} border="1px" borderColor="gray.200" />
              <Text fontSize="sm" textAlign="center" px="1rem">
                Or
              </Text>
              <Box flex={1} border="1px" borderColor="gray.200" />
            </Box>

            <Box mb={4}>
              <FormLabel>Nickname</FormLabel>
              <Input
                type="text"
                placeholder="Your funny nickname"
                {...register('nickname', {
                  validate: (nickname) => {
                    const email = getValues('email')
                    if (!email && !nickname) {
                      return false
                    }
                    if (nickname || email) {
                      return true
                    }
                  },
                })}
                disabled={!!watch('email')}
                id="nickname"
              />
              {errors.nickname && <FormErrorMessage>This field is required</FormErrorMessage>}
            </Box>

            <Box mb={12}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="A super secure password I hope" {...register('password', { required: true })} id="password" />
              {errors.password && <FormErrorMessage>This field is required</FormErrorMessage>}
            </Box>

            <Button w="100%" colorScheme="green" type="submit" isLoading={mutation.isLoading}>
              Log in
            </Button>

            <Text mt={8}>
              Don't have an account? <NextLink href="/sign-up">Create one</NextLink>
            </Text>
          </form>
        </FormControl>
      </Box>
    </>
  )
}

export default Login
