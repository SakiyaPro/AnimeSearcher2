import '../styles/reset.min.css'
import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Murecho:wght@600&family=Noto+Sans+JP&family=Outfit&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
