import { User } from '../../interfaces/user'
import UserFollowCard from '../user/UserFollowCard'

interface SearchResultProps {
  user: User
}

const SearchResult = ({ user }: SearchResultProps) => <UserFollowCard user={user} />

export default SearchResult
