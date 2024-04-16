import React from 'react'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <Layout>
       <main className="w-full flex flex-col gap-4 p-4">
          <header className="w-full font-bold">
            <h2 className="text-2xl font bold text-slate-800">Home Page</h2>
          </header>
        </main>
    </Layout>
  )
}

export default Home
