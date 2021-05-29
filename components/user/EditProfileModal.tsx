import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, useToast } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/CurrentUser'
import { UpdateProfilePayload, updateUserProfile } from '../../services/user'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'
import { uploadMedia } from '../../services/uploadMedia'
import EditUserForm, { EditUserInputs } from './EditUserForm'
import ProfilePicturePicker from './ProfilePicturePicker'
import { translateErrors } from '../../utils/translateErrors'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onlyPictureUpload?: boolean
  title?: string
  cancelButtonLabel?: string
}

const EditProfileModal = ({ isOpen, onClose, onlyPictureUpload, title, cancelButtonLabel }: EditProfileModalProps) => {
  const userContext = useContext(UserContext)
  const toast = useToast()
  const [newDesiredProfilePicture, setNewProfilePicture] = useState(null)
  const [updatingProfile, setUpdatingProfile] = useState(false)
  const [updatedUserInfo, setUpdatedUserInfo] = useState<EditUserInputs>({})

  const handleUserInfoChanged = (userInfo: EditUserInputs) => {
    setUpdatedUserInfo({ ...userInfo })
  }

  const handleSaveClick = async () => {
    const updatedUser: UpdateProfilePayload = {}
    if (newDesiredProfilePicture) {
      try {
        const profilePictureUrl = await uploadMedia(newDesiredProfilePicture)
        if (profilePictureUrl?.data?.path) {
          Object.assign(updatedUser, { profile_picture_url: profilePictureUrl?.data?.path })
        }
      } catch (err) {
        console.error('ERROR: Upload profile picture file', err)
      }
    }

    if (updatedUserInfo?.nickname) {
      Object.assign(updatedUser, { nickname: updatedUserInfo.nickname })
    }

    if (updatedUserInfo?.currentPassword) {
      Object.assign(updatedUser, { current_password: updatedUserInfo.currentPassword })
    }

    if (updatedUserInfo?.newPassword) {
      Object.assign(updatedUser, { new_password: updatedUserInfo.newPassword })
    }

    if (updatedUserInfo?.newPasswordConfirmation) {
      Object.assign(updatedUser, { new_password_confirmation: updatedUserInfo.newPasswordConfirmation })
    }

    try {
      setUpdatingProfile(true)
      await updateUserProfile(userContext?.user?.id, updatedUser)
      queryClient?.refetchQueries('sessions')
      toast({
        description: 'Profile updated',
        status: 'success',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
      setNewProfilePicture('')
    } catch (err) {
      console.error('ERROR: Updating user', err)
      toast({
        title: 'Profile not updated',
        description: translateErrors(err?.response?.data?.errors) || 'An unexpected error occurred. Please try again later',
        status: 'error',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } finally {
      setUpdatingProfile(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <ProfilePicturePicker onPictureChosen={(chosenPictureReference) => setNewProfilePicture(chosenPictureReference)} />
            {!onlyPictureUpload && <EditUserForm onUserInfoChange={handleUserInfoChanged} onSubmit={handleSaveClick} />}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="green" onClick={onClose} mr={4}>
            {cancelButtonLabel}
          </Button>
          <Button colorScheme="green" onClick={handleSaveClick} isLoading={updatingProfile} disabled={updatingProfile}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

EditProfileModal.defaultProps = {
  onlyPictureUpload: false,
  title: 'Edit profile',
  cancelButtonLabel: 'Cancel',
}

export default EditProfileModal
