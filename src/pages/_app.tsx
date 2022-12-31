import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getFirebaseApp } from '../lib/firebase/utils/init'
import SignUp from './signup'
import { FirebaseAuthProvider, userFirebaseAuthContext } from '@/lib/firebase/utils/auth'
import Header from '@/components/common/header'
import { signIn } from '@/lib/firebase/hooks'

getFirebaseApp()

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    signIn()
  }, [])
  return (
    <FirebaseAuthProvider>
      <Header title={'あざらしちゃっと'} />
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  )
}
export default App
