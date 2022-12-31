export type User = {
  displayName: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  uid: string
}
export type AuthContextState = {
  currentUser: User | null | undefined
}
export type ReactNodeProps = {
  children?: React.ReactNode
}
export type LoginForm = {
  username: string
  email: string
  password: string
}
