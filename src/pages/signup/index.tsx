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
      <div className='flex'>
        <div className='mx-auto flex w-full flex-col items-center md:w-3/5 lg:w-2/3'>
          <h1 className='my-10 text-2xl font-bold text-white'> Login </h1>
          <form className='mt-2 flex w-8/12 flex-col lg:w-1/2' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='mb-1 block'>ユーザー名</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
                name={'username'}
                placeholder='User Name'
                type='text'
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='mb-1 block'>メールアドレス</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
                name={'email'}
                placeholder='your@email.com'
                type={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='mb-1 block'>パスワード</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
                name={'password'}
                placeholder='Password'
                type={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-6'>
              {isFormSubmitted ? (
                <div>
                  <p className=' bg-sky-200 text-lg'>ログイン完了</p>
                </div>
              ) : (
                <button
                  className='mt-4 mb-20 w-full rounded bg-sky-200 py-4 text-center font-sans text-xl font-bold leading-tight text-white md:px-12 md:py-4 md:text-base'
                  type='submit'
                >
                  サインアップする
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default SignUp
