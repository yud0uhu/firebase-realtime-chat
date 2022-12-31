import { getAuth, signOut } from '@firebase/auth'
import router from 'next/router'

export const signIn = () => {
  const auth = getAuth()
  const unsubscribed = auth.onAuthStateChanged(async (user) => {
    if (user === null) {
      await router.push('/signin')
    }
    unsubscribed()
  })
}

export const logOut = async () => {
  const auth = getAuth()
  await signOut(auth)
    .then(() => {
      router.push('/signin')
    })
    .catch((e) => {
      alert('ログアウトに失敗しました')
      console.log(e)
    })
}
