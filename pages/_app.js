import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../layout/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial0scale-1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
