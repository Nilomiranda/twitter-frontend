import { User } from '../../interfaces/user'

interface SearchResultProps {
  user: User
}

const SearchResult = ({ user }: SearchResultProps) => <h1>{user?.nickname}</h1>

export default SearchResult
