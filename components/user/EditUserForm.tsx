import { Box, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import Input from '../form/Input'
import { UserContext } from '../../contexts/CurrentUser'

type EditUserInputs = {
  nickname?: string
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

const EditUserForm = () => {
  const userContext = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch,
    setValue,
  } = useForm<EditUserInputs>()

  useEffect(() => {
    setValue('nickname', userContext?.user?.nickname)
  }, [])

  // todo remove this when component is fully implemented
  if (true) return null

  return (
    <FormControl>
      <form>
        <Box mb={4}>
          <Input placeholder="A cool nickname" {...register('nickname', { required: true })} />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="Current password" {...register('currentPassword', { required: true })} />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="New password" {...register('currentPassword', { required: true })} />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="New password confirmation" {...register('currentPassword', { required: true })} />
        </Box>
      </form>
    </FormControl>
  )
}

export default EditUserForm
