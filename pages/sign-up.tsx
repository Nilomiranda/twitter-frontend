import { Box, Button, Flex, FormControl, Heading, Image, Text, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { authGuard } from '../guards/auth'
import { createUser, SignUpPayload } from '../services/user'
import { User } from '../interfaces/user'
import { TOAST_DEFAULT_DURATION } from '../config/constants'
import { translateErrors } from '../utils/translateErrors'
import { Session } from '../interfaces/session'
import { signIn } from '../services/session'
import { queryClient } from '../config/queryClient'
import Input from '../components/form/Input'
import { UserContext } from '../contexts/CurrentUser'

type SignUpInputs = {
  email: string
  nickname: string
  password: string
  confirmPassword
}

export async function getServerSideProps({ req }) {
  return authGuard(req, false)
}

const SignUp = () => {
  const userContext = useContext(UserContext)

  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignUpInputs>()
  const router = useRouter()

  const mutation = useMutation<{ data: { user: User } }, unknown, SignUpPayload>((payload) => createUser(payload))
  const sessionMutation = useMutation<{ data: Session }, unknown, { email: string; password: string; nickname: string }>(({ email, password, nickname }) => signIn({ email, password, nickname }))

  const handleAccountCreated = async ({ email, nickname, password }) => {
    try {
      const loginResponse = await sessionMutation.mutateAsync({
        email,
        password,
        nickname,
      })
      if (loginResponse) {
        await queryClient.refetchQueries('sessions')
        userContext.setIsNewAccount(true)
        router.push('/home')
      }
    } catch (err) {
      console.error('ERROR:: Error when creating session after account creation', err)
      router.push('/login')
    }
  }

  const onSubmit = (event) => {
    console.log('handling submit')
    event.preventDefault()
    trigger()

    handleSubmit(
      async (submitEvent) => {
        try {
          const createdAccount = await mutation?.mutateAsync(submitEvent)
          if (createdAccount) {
            handleAccountCreated(submitEvent)
          }
        } catch (err) {
          toast({
            title: "Couldn't create account",
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

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" h="100vh" w="100%">
        <Flex direction="column" alignItems="center">
          <Image src="https://i.imgur.com/FeuUYsF.png" alt="Chist Logo" />
          <Heading as="h1" size="4xl" isTruncated mb={4}>
            Chist
          </Heading>
        </Flex>

        <Heading as="h2" size="sm" fontWeight="normal" isTruncated mb={16}>
          Create an account
        </Heading>

        <FormControl maxW="24rem" isInvalid={errors && Object.keys(errors)?.length > 0}>
          <form onSubmit={onSubmit}>
            <Box mb={4}>
              <Input type="email" placeholder="Your coolest email" register={register} name="email" label="Email address" errors={errors?.email && 'This field is required'} />
            </Box>

            <Box mb={4}>
              <Input label="Nickname" type="text" placeholder="A creative nickname" register={register} name="nickname" errors={errors?.nickname && 'This field is required'} />
            </Box>

            <Box mb={4}>
              <Input label="Password" type="password" placeholder="Choose a super powerful password" register={register} name="password" errors={errors?.password && 'This field is required'} />
            </Box>

            {false && (
              <Box mb={12}>
                <Input label="Confirm password" type="password" placeholder="Confirm the super password" register={register} name="confirmPassword" errors={errors?.confirmPassword?.message} />
              </Box>
            )}

            <Button w="100%" colorScheme="green" type="submit" disabled={mutation?.isLoading} isLoading={mutation.isLoading}>
              Create account
            </Button>

            <Text mt={8}>
              Already have an account? <NextLink href="/login">Log in then</NextLink>
            </Text>
          </form>
        </FormControl>
      </Box>
    </>
  )
}

export default SignUp
