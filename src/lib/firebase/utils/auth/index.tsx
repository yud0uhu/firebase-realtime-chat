import { getAuth, getRedirectResult } from 'firebase/auth'
import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { AuthContextState, User, ReactNodeProps } from '../../../../features/common/types'
import { getFirebaseApp } from '../init'

const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
})

const FirebaseAuthProvider = ({ children }: ReactNodeProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  const firebaseApp = getFirebaseApp()
  const auth = getAuth(firebaseApp)

  // authはnullの可能性があるので、useEffectの第二引数にauthを指定しておく
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
      getRedirectResult(getAuth(firebaseApp))
    })
    return () => {
      // authオブジェクトのログイン情報の初期化はonAuthStateChanged 発火時に行われる
      // onAuthStateChangedが発火する前(authオブジェクトの初期化が完了する前)にcurrentUserを参照してしまうと、ログインしていてもnullになってしまう
      // NOTE: https://firebase.google.com/docs/auth/web/manage-users
      // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
      unsubscribed()
    }
  }, [auth])
  return (
    <FirebaseAuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const userFirebaseAuthContext = () => useContext(FirebaseAuthContext)
