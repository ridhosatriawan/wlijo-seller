import '../styles/globals.css';
import Head from 'next/head';
import MainLayout from '../layout/MainLayout';

const EmtyLay = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? EmtyLay : MainLayout;
  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}



export default MyApp
