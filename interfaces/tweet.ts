import { Base } from './base'
import { User } from './user'

export interface Tweet extends Base {
  text: string
  user: User
}
