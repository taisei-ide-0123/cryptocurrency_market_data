import Head from 'next/head';
import { GetStaticProps } from 'next';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  console.log(props.data);
  return (
    <div className={styles.container}>
      <Head>
        <title>CryproCurrency Market Data</title>
        <link rel="icon" href="/cryptocurrency-log.jpeg" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <a href="https://twitter.com/taisei_ide">
          <p>
            Powered by <span>Taisei Ide</span>
          </p>
          <img src="/twitter-icon.png" />
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  const data: {} = await res.json();

  try {
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
