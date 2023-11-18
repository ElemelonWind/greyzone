import Image from 'next/image'
import Head from 'next/head'

export default function Home() {
  return (
    <div id="parent">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv='cache-control' content='no-cache' />
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
      </Head>

      <header id="landing-header">
        <Image src="/Logo_V2-transparent.png" width={300} height={300} />
      </header>

      <h1 className="landing-heading">landing-heading 1</h1>
      <h2 className="landing-heading">landing-heading 2</h2>

      <button className="button">Button</button>
      <button className="button2">Button 2</button>
    </div>
  )
}