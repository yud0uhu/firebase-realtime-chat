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
  const auth = userFirebaseAuthContext()

  useEffect(() => {
    signIn()
  }, [])
  return auth ? (
    <FirebaseAuthProvider>
      <Header title={'あざらしちゃっと'} />
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  ) : (
    <>
      <Header title={'あざらしちゃっと'} />
      <div className='flex justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    </>
  )
}
export default App
