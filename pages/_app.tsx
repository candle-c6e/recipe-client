import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";
import { AuthProvider } from "../context/auth-context";
import { GlobalStyle } from "../styled";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/recipe/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
