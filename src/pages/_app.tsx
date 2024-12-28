import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import {ApolloProvider} from "@apollo/client";
import { client } from "@/lib/apolo";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Elias Gomes</title>
      </Head>      
      <ApolloProvider client={client}>
        <main className={`${poppins.variable} font-sans`}>        
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
      
    </>
  )
}
