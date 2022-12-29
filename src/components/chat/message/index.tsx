import Image from 'next/image'
import { FC } from 'react'
import LogoImage from '../../../assets/logo.jpg'
type MessageProps = {
  message: string
  createdAt: string
}
const Message: FC<MessageProps> = ({ message, createdAt }: MessageProps) => {
  return (
    <div className='grid auto-cols-max grid-flow-col'>
      <div>
        <Image alt='LogoImage' className='h-12 w-12' src={LogoImage} />
      </div>
      <p className='m-4 rounded bg-sky-200 p-2 text-white'>{message}</p>
      <p className='my-4 pt-4 text-sm'>{createdAt}</p>
    </div>
  )
}

export default Message
