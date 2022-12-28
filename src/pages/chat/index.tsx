import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
// Import Admin SDK
import { getDatabase, onChildAdded, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { NextPage } from 'next'
import Message from '@/components/chat/message'
import Header from '@/components/common/header'

const ChatPage: NextPage = () => {
  const [message, setMessage] = useState<string>('')
  const [chatLogs, setChatLogs] = useState<{ message: string }[]>([])
  const scrollBottomRef = useRef<HTMLDivElement>(null)

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
      scrollBottomRef?.current?.scrollIntoView!({
        behavior: 'smooth',
        block: 'end',
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    try {
      // Get a database reference to our posts
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      /** onChildAddedでデータの取得、監視を行う
       * onChildAddedはqueryとcallbackを引数に取り、Unsubscribeを返して、変更状態をsubscribeする関数
       * export declare function onChildAdded(query: Query, callback: (snapshot: DataSnapshot, previousChildName?: string | null) => unknown, cancelCallback?: (error: Error) => unknown): Unsubscribe;
       **/
      return onChildAdded(dbRef, (snapshot) => {
        // Attach an asynchronous callback to read the data at our posts reference
        // Firebaseデータベースからのデータはsnapshotで取得する
        // snapshot.val()でany型の値が返ってくる
        const message = String(snapshot.val()['message'] ?? '')
        setChatLogs((prev) => [...prev, { message }])
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      // unsubscribeする
      return
    }
  }, [message])

  return (
    <div className='h-screen overflow-hidden'>
      <Header title={'あざらしちゃっと'} />
      <div className='container mx-auto bg-white dark:bg-slate-800'>
        <div className='relative h-screen rounded-xl m-2 items-center'>
          <div className='absolute inset-x-0 top-4 bottom-32 px-4 flex flex-col space-y-2 px-16'>
            <div className='overflow-y-auto display-none'>
              {chatLogs.map((chat, index) => (
                <Message key={`ChatMessage_${index}`} message={chat.message} />
              ))}
              <div ref={scrollBottomRef} />
            </div>
            <div className='position-fixed'>
              <form onSubmit={handleSendMessage}>
                <div className='grid grid-flow-row-dense grid-cols-5 gap-4'>
                  <input
                    className='text-ellipsis overflow-hidden col-span-4 block w-full rounded md:rounded-lg border pl-7 pr-12 py-2 px-4 focus:bg-border-sky-500 focus:ring-sky-500 sm:text-sm'
                    placeholder='メッセージを入力してください'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className='col-span-1 bg-sky-200 hover:bg-sky-300 text-white font-bold py-2 px-4 rounded'
                    type={'submit'}
                  >
                    送信
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatPage
