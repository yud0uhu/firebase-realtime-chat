import { FormEvent, useState } from 'react'
// Import Admin SDK
import { getDatabase, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { NextPage } from 'next'

const ChatPage: NextPage = () => {
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Get a database reference to our blog
      const db = getDatabase()
      // 取得したdatabaseを紐付けるref(db, 'path')
      // 今回はchatというパスにデータを書き込む
      const dbRef = ref(db, 'chat')
      // pushはデータを書き込む際にユニークキーを自動で生成する
      // 今回はpush() で生成されたユニークキーを取得する
      // messageというキーに値(message)を保存する
      await push(dbRef, {
        message,
      })
      // 成功した際はformの値をリセットする
      setMessage('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <h1>チャット</h1>
      <form onSubmit={handleSendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type={'submit'}>送信</button>
      </form>
    </>
  )
}
export default ChatPage
