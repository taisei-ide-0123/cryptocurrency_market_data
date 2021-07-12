import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Line } from 'react-chartjs-2';

type Color = string;

export type Props = {
  data: Market;
  crypto: string;
};

export type Market = {
  prices: [];
  market_caps: [];
  total_volumes: [];
};

export type Chart = {
  labels: string[];
  datasets: [
    {
      label: string;
      fill: boolean;
      lineTension: number;
      backgroundColor: Color;
      borderColor: Color;
      borderCapStyle: string;
      borderDash: [];
      borderDashOffset: number;
      borderJoinStyle: string;
      pointBorderColor: Color;
      pointBackgroundColor: Color;
      pointBorderWidth: number;
      pointHoverRadius: number;
      pointHoverBackgroundColor: Color;
      pointHoverBorderColor: Color;
      pointHoverBorderWidth: number;
      pointRadius: number;
      pointHitRadius: number;
      data: [];
    }
  ];
};

export default function Chart(props: Props) {
  const market_data: Market = props.data;
  const crypto_name: string = props.crypto;
  const seven_days: string[] = [];
  const crypto_price: [] = [];

  for (let i = 0; i < 8; i++) {
    const date: Date = new Date(market_data.prices[i][0]);
    const simple_date: string =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDay() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();
    seven_days[i] = simple_date;

    const price = market_data.prices[i][1];
    crypto_price[i] = price;
  }

  const chart_data: Chart = {
    labels: seven_days,
    datasets: [
      {
        label: crypto_name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: crypto_price,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Markets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-muted">{crypto_name}</h1>
      <Line data={chart_data} type="line" />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${query.id}/market_chart?vs_currency=jpy&days=7&interval=daily`
  );
  const data: {} = await res.json();
  const crypto: string = query.id;
  // console.log(crypto)

  try {
    return {
      props: {
        data,
        crypto,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
