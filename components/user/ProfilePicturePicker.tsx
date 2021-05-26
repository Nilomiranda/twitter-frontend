import { Avatar, Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useContext, useRef, useState } from 'react'
import { deleteProfilePicture } from '../../services/user'
import { queryClient } from '../../config/queryClient'
import { TOAST_DEFAULT_DURATION } from '../../config/constants'
import { convertBlobTo64 } from '../../utils/blobTo64'
import { UserContext } from '../../contexts/CurrentUser'

interface ProfilePicturePickerProps {
  // eslint-disable-next-line no-unused-vars
  onPictureChosen: (pictureReference: string | ArrayBuffer) => void
}

const ProfilePicturePicker = ({ onPictureChosen }: ProfilePicturePickerProps) => {
  const toast = useToast()
  const userContext = useContext(UserContext)
  const profilePictureFilePickerRef = useRef(null)
  const [newDesiredProfilePicture, setNewProfilePicture] = useState(null)

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
    const base64ImageReference = await convertBlobTo64(profilePictureFilePickerRef?.current?.files[0])
    setNewProfilePicture(base64ImageReference)
    onPictureChosen(base64ImageReference)
  }

  return (
    <Flex direction="column">
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
    </Flex>
  )
}

export default ProfilePicturePicker
