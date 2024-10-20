import React from 'react'
import Layout from './Layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <Layout>
      <h1 className='text-7xl'>Anidash</h1>
      <p>dashboard to manage user watch</p>
      <div className='button-wrapper flex gap-2 items-center'>
        <Link href={'/login'}>
          <Button>Log in</Button>
        </Link>
        <p className='text-xs'>or</p>
        <Button variant={'outline'}>Sign up</Button>
      </div>
    </Layout>
  )
}

export default LandingPage
