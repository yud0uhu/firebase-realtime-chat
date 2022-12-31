import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { NextPage } from 'next'
import { FC, FormEvent, useState } from 'react'
import { FirebaseError } from 'firebase/app'

export const SignUp: FC<NextPage> = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUserName] = useState<string>('')

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(userCredential.user, {
        displayName: username,
      })
      await sendEmailVerification(userCredential.user)
      setEmail('')
      setPassword('')
      setUserName('')
      setIsFormSubmitted(true)
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }
  return (
    <>
      <form className='p-8' onSubmit={handleSubmit}>
        <h2>ユーザー名を入力してください</h2>
        <div>
          <input
            className='overflow-hidden text-ellipsis rounded border py-2 px-4 pl-2 focus:ring-sky-500 sm:text-sm  md:rounded-lg'
            name={'username'}
            type='text'
            value={username}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
        </div>
        <h2>メールアドレスを入力してください</h2>
        <div>
          <input
            className='overflow-hidden text-ellipsis rounded border py-2 px-4 pl-2 focus:ring-sky-500 sm:text-sm md:rounded-lg'
            name={'email'}
            type={'email'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <h2>パスワードを入力してください</h2>
        <div>
          <input
            className='overflow-hidden text-ellipsis rounded border py-2 px-4 pl-2 focus:ring-sky-500 sm:text-sm  md:rounded-lg'
            name={'password'}
            type={'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className='flex justify-center'>
          {isFormSubmitted ? (
            <div>
              <p className=' bg-sky-200 text-lg'>ログイン完了</p>
            </div>
          ) : (
            <button
              className='col-span-2 rounded bg-sky-200 py-2 px-4 font-bold text-white hover:bg-sky-300 md:col-span-1'
              type='submit'
            >
              サインインする
            </button>
          )}
        </div>
      </form>
    </>
  )
}
export default SignUp
