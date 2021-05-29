import { Box, Button, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import Input from '../form/Input'
import { UserContext } from '../../contexts/CurrentUser'

export type EditUserInputs = {
  nickname?: string
  currentPassword?: string
  newPassword?: string
  newPasswordConfirmation?: string
}

interface EditUserFormProps {
  // eslint-disable-next-line no-unused-vars
  onUserInfoChange: (userInfo: EditUserInputs) => void
  onSubmit: () => void
}

const EditUserForm = ({ onUserInfoChange, onSubmit }: EditUserFormProps) => {
  const userContext = useContext(UserContext)

  const { register, getValues, watch, setValue } = useForm<EditUserInputs>()

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  useEffect(() => {
    setValue('nickname', userContext?.user?.nickname)
  }, [])

  useEffect(() => {
    onUserInfoChange({
      nickname: getValues('nickname'),
      currentPassword: getValues('currentPassword'),
      newPassword: getValues('newPassword'),
      newPasswordConfirmation: getValues('newPasswordConfirmation'),
    })
  }, [watch('nickname'), watch('currentPassword'), watch('newPassword'), watch('newPasswordConfirmation')])

  return (
    <FormControl>
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <Input placeholder="A cool nickname" register={register} name="nickname" validationRules={{ required: true }} />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="Current password" register={register} name="currentPassword" />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="New password" register={register} name="newPassword" />
        </Box>

        <Box mb={4}>
          <Input type="password" placeholder="New password confirmation" register={register} name="newPasswordConfirmation" />
        </Box>

        <Button type="submit" display="none" />
      </form>
    </FormControl>
  )
}

export default EditUserForm
