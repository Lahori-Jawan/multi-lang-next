import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

const inter = Inter({ subsets: ['latin'] })

// export function getStaticProps({locale}) {
//   return {
//     props: {
//       locale
//     }
//   }
// }

export default function Home() {
  const {locale, locales = [], push} = useRouter()
  const langName = locale === 'en' ? 'English' : 'العربية'
  // const switchLanguage = (l: string) => push('/', undefined, {locale: l})
  const goToAbout = () => push('/about', undefined, {locale})
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          <FormattedMessage id='language' values={{name: langName}} />
        </h1>
        {/* {locales.map((l: string) => (
          <button key={l} onClick={() => switchLanguage(l)}>{l}</button>
        ))} */}
        <button onClick={() => goToAbout()}>About Page</button>
      </main>
    </>
  )
}