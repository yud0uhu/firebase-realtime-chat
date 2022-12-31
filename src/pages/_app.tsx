import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getFirebaseApp } from '../lib/firebase/utils/init'
import SignUp from './signup'
import { FirebaseAuthProvider, userFirebaseAuthContext } from '@/lib/firebase/utils/auth'
import Header from '@/components/common/header'

getFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  const auth = userFirebaseAuthContext()
  return auth ? (
    <FirebaseAuthProvider>
      <Header title={'あざらしちゃっと'} />
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  ) : (
    <>
      <FirebaseAuthProvider>
        <Header title={'あざらしちゃっと'} />
        <SignUp {...pageProps} />
      </FirebaseAuthProvider>
    </>
  )
}
