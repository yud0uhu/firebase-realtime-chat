import Image from 'next/image'
import { FC } from 'react'
import LogoImage from '../../../assets/logo.jpg'
type MessageProps = {
  message: string
  createdAt: string
}
const Message: FC<MessageProps> = ({ message, createdAt }: MessageProps) => {
  return (
    <div className='grid grid-flow-col auto-cols-max'>
      <div>
        <Image alt='LogoImage' className='h-12 w-12' src={LogoImage} />
      </div>
      <div className='my-4 mx-4 text-white rounded bg-sky-200 py-2 px-2'>{message}</div>
      <div className='text-sm my-4 pt-4'>{createdAt}</div>
    </div>
  )
}

export default Message
