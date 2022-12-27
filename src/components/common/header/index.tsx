import { FC } from 'react'
type HeaderProps = {
  title: string
}
const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <header>
      <nav className='bg-sky-200 navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between'>
        <div className='p-6 max-w-sm mx-auto flex items-center space-x-4'>
          <div>
            <div className='text-xl text-white font-medium'>{title}</div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header
