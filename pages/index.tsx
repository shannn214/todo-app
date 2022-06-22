import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Container from '../components/container/Container'
import Header from '../components/header/Header'
import Input from '../components/input/Input'
import ListWrap from '../components/list/ListWrap'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="Simple TODO App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <Input />
        <ListWrap />
      </Container>
    </div>
  )
}

export default Home
