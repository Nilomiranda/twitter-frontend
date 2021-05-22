import { createContext } from 'react'
import { useQuery } from 'react-query'
import { User } from '../interfaces/user'

export const UserContext = createContext<{ user: User }>({
  user: null,
})

const UserProvider = ({ children }) => {
  const { data: userData } = useQuery<{ user: User }>('sessions')

  return <UserContext.Provider value={{ user: userData?.user }}>{children}</UserContext.Provider>
}

export default UserProvider
