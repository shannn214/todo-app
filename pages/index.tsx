import type { NextPage } from 'next'
import Head from 'next/head'

import Container from '../components/container/Container'
import Header from '../components/header/Header'
import TodoInput from '../components/input/TodoInput'
import TodoList from '../components/list/TodoList'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="Simple TODO App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header />
        <TodoInput />
        <TodoList />
      </Container>
    </div>
  )
}

export default Home
