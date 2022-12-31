import Link from 'next/link'
import { FC } from 'react'
import { NextPage } from 'next'
import Seo from '@/lib/seo'

const Home: FC<NextPage> = () => {
  return (
    <>
      <Seo
        description={
          'Firebase Realtime Databaseでリアルタイムチャットをするサンプルです | あざらしちゃっと'
        }
        imageUrl={`https://${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/api/og?title=${'あざらしちゃっと'}`}
        title={'あざらしちゃっと'}
        url={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`}
      />
      <div className='mt-32 flex justify-center gap-2 pt-32'>
        <button
          className='rounded bg-sky-200 py-2 px-4 font-bold text-white hover:bg-sky-300 md:col-span-1'
          type={'submit'}
        >
          <Link href='/chat'>ちゃっとぺーじへ</Link>
        </button>
      </div>
    </>
  )
}
export default Home
