import { Base } from './base'

export interface User extends Base {
  email: string
  nickname: string
  profile_picture_url: string
}
