import { FC } from 'react'

type MessageProps = {
  message: string
}

const Message: FC<MessageProps> = ({ message }: MessageProps) => {
  return (
    <ul>
      <li>
        <text>{message}</text>
      </li>
    </ul>
  )
}

export default Message
