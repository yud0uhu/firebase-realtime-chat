import { FC } from 'react'
import { userFirebaseAuthContext } from '@/lib/firebase/utils/auth'

type HeaderProps = {
  title: string
}
const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  const auth = userFirebaseAuthContext()
  return (
    <header>
      <nav className='relative flex w-full items-center justify-between bg-sky-200 py-2 shadow-md'>
        <div className='mx-auto flex max-w-sm items-center space-x-4 p-6'>
          <div>
            <div className='text-xl font-medium text-white'>
              {title}@{auth.currentUser ? 'ログイン中' : 'ログインしてね'}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header
