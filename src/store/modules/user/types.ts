export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  uid?: string
  nickName?: string
  avatar?: string
  gender?: number
  birthday?: string
  signature?: string
  email?: string
  mobile?: string
  createTime?: string
  role: RoleType
}
