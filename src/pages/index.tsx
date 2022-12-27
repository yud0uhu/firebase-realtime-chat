import { getApp } from 'firebase/app'

export default function Home() {
  console.log(getApp())
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </>
  )
}
