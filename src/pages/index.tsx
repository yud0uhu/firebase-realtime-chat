import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta content='Generated by create next app' name='description' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              rel='noopener noreferrer'
              target='_blank'
            >
              By{' '}
              <Image
                alt='Vercel Logo'
                className={styles.vercelLogo}
                height={24}
                src='/vercel.svg'
                width={100}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            alt='Next.js Logo'
            className={styles.logo}
            height={37}
            src='/next.svg'
            width={180}
            priority
          />
          <div className={styles.thirteen}>
            <Image alt='13' height={31} src='/thirteen.svg' width={40} priority />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            className={styles.card}
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            rel='noopener noreferrer'
            target='_blank'
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            className={styles.card}
            href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            rel='noopener noreferrer'
            target='_blank'
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            className={styles.card}
            href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            rel='noopener noreferrer'
            target='_blank'
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            className={styles.card}
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            rel='noopener noreferrer'
            target='_blank'
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
