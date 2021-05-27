import { Box, Button, FormControl, Heading, Text, useToast, Image, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Input from '../components/form/Input'
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
    watch,
  } = useForm<LoginInputs>()
  const mutation = useMutation<{ data: Session }, unknown, { email: string; password: string; nickname: string }>(({ email, password, nickname }) => signIn({ email, password, nickname }))
  const router = useRouter()

  console.log(watch('nickname'))

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
        <Flex direction="column" alignItems="center">
          <Image src="https://i.imgur.com/FeuUYsF.png" alt="Chist Logo" />
          <Heading as="h1" size="4xl" isTruncated mb={4}>
            Chist
          </Heading>
        </Flex>
        <Heading as="h2" size="sm" fontWeight="normal" isTruncated mb={16}>
          Log in to your account
        </Heading>

        <FormControl maxW="24rem" isInvalid={errors && Object.keys(errors)?.length > 0}>
          <form onSubmit={onSubmit}>
            <Box mb={4}>
              <Input
                label="Your email"
                type="email"
                placeholder="A nice email"
                disabled={!!watch('nickname')}
                id="email"
                errors={errors.email && 'This field is required'}
                name="email"
                register={register}
              />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" w="100%" mb={4} mt={8}>
              <Box flex={1} border="1px" borderColor="gray.200" />
              <Text fontSize="sm" textAlign="center" px="1rem">
                Or
              </Text>
              <Box flex={1} border="1px" borderColor="gray.200" />
            </Box>

            <Box mb={4}>
              <Input
                label="Nickname"
                name="nickname"
                placeholder="Your funny nickname"
                disabled={!!watch('email')}
                type="text"
                id="nickname"
                errors={errors?.nickname && 'This field is required'}
                register={register}
              />
            </Box>

            <Box mb={12}>
              <Input
                label="Password"
                placeholder="A super secure password I hope"
                type="password"
                id="password"
                errors={errors?.password && 'This field is required'}
                register={register}
                name="password"
              />
            </Box>

            <Button w="100%" colorScheme="green" type="submit" disabled={mutation?.isLoading} isLoading={mutation.isLoading}>
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
