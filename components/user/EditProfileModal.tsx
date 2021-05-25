import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Avatar, IconButton, useToast } from '@chakra-ui/react'
import { useContext } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { UserContext } from '../../contexts/CurrentUser'
import { deleteProfilePicture } from '../../services/user'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { queryClient } from '../../config/queryClient'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const userContext = useContext(UserContext)
  const toast = useToast()

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

  const handleEditProfilePictureClick = () => {}

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <Avatar name={userContext?.user?.nickname} size="xl" src={userContext?.user?.profile_picture_url} />
            <Flex mt={4}>
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="green" onClick={onClose} mr={4}>
            Cancel
          </Button>
          <Button colorScheme="green">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal
