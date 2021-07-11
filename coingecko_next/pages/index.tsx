import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
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
  )
}
