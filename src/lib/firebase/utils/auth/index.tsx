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

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      }
      getRedirectResult(getAuth(firebaseApp))
    })
    return () => {
      unsubscribed()
    }
  }, [auth])
  return (
    <FirebaseAuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider, getAuth }

export const userFirebaseAuthContext = () => useContext(FirebaseAuthContext)
