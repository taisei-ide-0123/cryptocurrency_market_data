import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from '../styles/Home.module.css';

export type CryptoCurrencyType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  price_change_percentage_7d_in_currency: number;
};

export default function Home(props: { data: object[] }) {
  const data: object[] = props.data;

  const formatPercent = (number: number) => `${new Number(number).toFixed(2)}%`;

  return (
    <div className={styles.container}>
      <Head>
        <title>CryproCurrency Market Data</title>
        <link rel="icon" href="/cryptocurrency-log.jpeg" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>時価総額トップ100のコイン</div>
        <div className={styles.grid}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table_header}>
                <th className={styles.table_header_normal}>Rank</th>
                <th className={styles.table_header_currency}>通貨</th>
                <th className={styles.table_header_normal}>価格</th>
                <th className={styles.table_header_normal}>24H</th>
                <th className={styles.table_header_normal}>7D</th>
                <th className={styles.table_header_normal}>時価総額</th>
              </tr>
            </thead>
            <tbody>
              {data.map((coin: CryptoCurrencyType) => (
                <tr key={coin.id} className={styles.table_body}>
                  <td className={styles.rank}>{coin.market_cap_rank}</td>
                  <td className={styles.currency}>
                    <img src={coin.image} />
                    <Link href={`/chart/${coin.id}`}>
                      <p className={styles.coin_name}>{coin.name}</p>
                    </Link>
                    <p className={styles.symbol}>{coin.symbol.toUpperCase()}</p>
                  </td>
                  <td className={styles.table_body_normal}>
                    ¥{coin.current_price.toLocaleString()}
                  </td>
                  <td className={styles.table_body_normal}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </td>
                  <td className={styles.table_body_normal}>
                    {formatPercent(coin.price_change_percentage_7d_in_currency)}
                  </td>
                  <td className={styles.table_body_normal}>
                    ¥{coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

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

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d'
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
