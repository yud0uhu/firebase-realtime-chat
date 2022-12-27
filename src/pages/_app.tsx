import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getFirebaseApp } from '../lib/firebase/firebase'

getFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
