import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJs Events</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
