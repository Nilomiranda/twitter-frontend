import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, useToast } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/CurrentUser'
import { updateUserProfile } from '../../services/user'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'
import { uploadMedia } from '../../services/uploadMedia'
import { User } from '../../interfaces/user'
import EditUserForm from './EditUserForm'
import ProfilePicturePicker from './ProfilePicturePicker'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const userContext = useContext(UserContext)
  const toast = useToast()
  const [newDesiredProfilePicture, setNewProfilePicture] = useState(null)
  const [updatingProfile, setUpdatingProfile] = useState(false)

  const handleSaveClick = async () => {
    const updatedUser: User = { ...userContext?.user }
    if (newDesiredProfilePicture) {
      try {
        const profilePictureUrl = await uploadMedia(newDesiredProfilePicture)
        if (profilePictureUrl?.data?.path) {
          updatedUser.profile_picture_url = profilePictureUrl?.data?.path
        }
      } catch (err) {
        console.error('ERROR: Upload profile picture file', err)
      }
    }

    try {
      setUpdatingProfile(true)
      await updateUserProfile(updatedUser)
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
    } finally {
      setUpdatingProfile(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <ProfilePicturePicker onPictureChosen={(chosenPictureReference) => setNewProfilePicture(chosenPictureReference)} />
            <EditUserForm />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="green" onClick={onClose} mr={4}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSaveClick} isLoading={updatingProfile} disabled={updatingProfile}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal
