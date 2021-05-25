import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Avatar, IconButton, useToast, Box } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { UserContext } from '../../contexts/CurrentUser'
import { deleteProfilePicture, updateUserProfile } from '../../services/user'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'
import { uploadMedia } from '../../services/uploadMedia'
import { User } from '../../interfaces/user'
import { convertBlobTo64 } from '../../utils/blobTo64'
import EditUserForm from './EditUserForm'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const userContext = useContext(UserContext)
  const toast = useToast()
  const profilePictureFilePickerRef = useRef(null)
  const [newDesiredProfilePicture, setNewProfilePicture] = useState(null)
  const [updatingProfile, setUpdatingProfile] = useState(false)

  const handleDeleteProfilePictureClick = async () => {
    try {
      await deleteProfilePicture(userContext?.user?.id)
      queryClient.refetchQueries('sessions')
      toast({
        description: 'Profile picture deleted',
        status: 'success',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    } catch (err) {
      toast({
        description: 'Error deleting profile picture. Please refresh page and try again',
        status: 'error',
        duration: TOAST_DEFAULT_DURATION,
        isClosable: true,
      })
    }
  }

  const handleEditProfilePictureClick = () => {
    if (profilePictureFilePickerRef?.current) {
      profilePictureFilePickerRef?.current?.click()
    }
  }

  const handleFileChosen = async () => {
    setNewProfilePicture(await convertBlobTo64(profilePictureFilePickerRef?.current?.files[0]))
  }

  const handleSaveClick = async () => {
    const profilePictureFile = profilePictureFilePickerRef?.current?.files[0]

    const updatedUser: User = { ...userContext?.user }
    if (profilePictureFile) {
      try {
        const profilePictureUrl = await uploadMedia(profilePictureFile)
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
            <Box display="none">
              <input type="file" ref={profilePictureFilePickerRef} onChange={handleFileChosen} />
            </Box>
            <Avatar name={userContext?.user?.nickname} size="xl" src={newDesiredProfilePicture || userContext?.user?.profile_picture_url} />
            <Flex my={4}>
              <IconButton
                onClick={handleDeleteProfilePictureClick}
                aria-label="Delete profile picture"
                title="Delete profile picture"
                variant="ghost"
                alignSelf="flex-end"
                colorScheme="red"
                icon={<DeleteIcon />}
              />
              <IconButton
                onClick={handleEditProfilePictureClick}
                aria-label="Edit profile picture"
                title="Edit profile picture"
                variant="ghost"
                alignSelf="flex-end"
                colorScheme="green"
                icon={<EditIcon />}
              />
            </Flex>
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
