import { onAuthStateChanged } from 'firebase/auth'
import { getAuth } from '@/lib/firebase/utils/auth'
import router from 'next/router'

export const signIn = () => {
  const auth = getAuth()
  const user = auth.currentUser
  onAuthStateChanged(auth, () => {
    ;async () => {
      console.log(user)
      if (user) {
        await router.push('/signin')
      } else {
        await router.push('/signup')
      }
    }
  })
}
