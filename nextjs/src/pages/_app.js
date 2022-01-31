import '../styles/reset.min.css'
import '../styles/globals.css'

import Layout from '../components/layout/Layout'

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useGlobal, setGlobal } from "reactn";
import axios from 'axios'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const state = {
    animeData: false
  }
  setGlobal(state)


  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Murecho:wght@600&family=Noto+Sans+JP&family=Outfit&display=swap" rel="stylesheet" />
      </Head>
      {router.pathname === "/" ?
        <Component {...pageProps} />
        :
        <Layout>
          <Component {...pageProps} />
        </Layout>
      }
    </>
  )
}
