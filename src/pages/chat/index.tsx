import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
// Import Admin SDK
import { getDatabase, onChildAdded, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { NextPage } from 'next'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Message from '@/components/chat/message'
import Header from '@/components/common/header'

const ChatPage: NextPage = () => {
  const [message, setMessage] = useState<string>('')
  const [chatLogs, setChatLogs] = useState<{ message: string; createdAt: string }[]>([])
  const scrollBottomRef = useRef<HTMLDivElement>(null)
  const createdAt = format(new Date(), 'HH:mm', {
    locale: ja,
  })
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // databaseを参照して取得する
      const db = getDatabase()
      // 取得したdatabaseを紐付けるref(db, 'path')
      const dbRef = ref(db, 'chat')
      // pushはデータを書き込む際にユニークキーを自動で生成する
      // 今回はpush() で生成されたユニークキーを取得する
      // messageというキーに値(message)を保存する
      await push(dbRef, {
        message,
        createdAt,
      })
      // 書き込みが成功した際はformの値をリセットする
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
      // onChildAddedでデータの取得、監視を行う
      // onChildAddedはqueryとcallbackを引数に取り、Unsubscribeを返して、変更状態をsubscribeする関数
      // export declare function onChildAdded(query: Query, callback: (snapshot: DataSnapshot, previousChildName?: string | null) => unknown, cancelCallback?: (error: Error) => unknown): Unsubscribe;
      return onChildAdded(dbRef, (snapshot) => {
        // Firebaseデータベースからのデータはsnapshotで取得する
        // snapshot.val()はany型の値を返す
        const message = String(snapshot.val()['message'] ?? '')
        const createdAt = String(snapshot.val()['createdAt'] ?? '')
        setChatLogs((prev) => [...prev, { message, createdAt }])
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      // unsubscribeする
      return
    }
  }, [])

  return (
    <div className='h-screen overflow-hidden'>
      <Header title={'あざらしちゃっと'} />
      <div className='container mx-auto bg-white dark:bg-slate-800'>
        <div className='relative m-2 h-screen items-center rounded-xl'>
          <div className='absolute inset-x-0 top-4 bottom-32 flex flex-col space-y-2 px-16'>
            <div className='overflow-y-auto'>
              {chatLogs.map((chat, index) => (
                <Message
                  createdAt={chat.createdAt}
                  key={`ChatMessage_${index}`}
                  message={chat.message}
                />
              ))}
              <div ref={scrollBottomRef} />
            </div>
            <div className='position-fixed'>
              <form onSubmit={handleSendMessage}>
                <div className='grid grid-flow-row-dense grid-cols-5 gap-4'>
                  <input
                    className='col-span-3 block w-full overflow-hidden text-ellipsis rounded border py-2 px-4 pl-2 focus:ring-sky-500 sm:text-sm md:col-span-4 md:rounded-lg'
                    placeholder='メッセージを入力してください'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className='col-span-2 rounded bg-sky-200 py-2 px-4 font-bold text-white hover:bg-sky-300 md:col-span-1'
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
