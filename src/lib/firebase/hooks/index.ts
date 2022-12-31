import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from 'next/router'

export const signIn = () => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      router.push('/signin')
    } else {
      router.push('/signup')
    }
  })
}
