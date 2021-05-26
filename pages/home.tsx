import { useContext } from 'react'
import Feed from '../components/home/Feed'
import MainLayout from '../components/layouts/MainLayout'
import { UserContext } from '../contexts/CurrentUser'
import EditProfileModal from '../components/user/EditProfileModal'

export default function Home() {
  const userContext = useContext(UserContext)

  const handleModalCloseClick = () => {
    userContext.setIsNewAccount(false)
  }

  return (
    <MainLayout>
      <Feed />

      <EditProfileModal onClose={handleModalCloseClick} isOpen={userContext.newAccount} onlyPictureUpload title="How about a cool looking profile picture?" cancelButtonLabel="Nah, I'll do it later" />
    </MainLayout>
  )
}
