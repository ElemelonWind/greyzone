import '@/styles/globals.css'
import { Dosis } from 'next/font/google'

const dosis = Dosis({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return <Component className={dosis.className} {...pageProps} />
}
