import React from 'react'
import Layout from '../components/Layout'
import { useQuery } from 'react-query'

const RQSuperHeroes = () => {

  useQuery("super-heroes")
  return (
    <Layout>
      <main></main>
    </Layout>
  )
}

export default RQSuperHeroes
