import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">Anidash.</h1>
      <p className="pb-1">dashboard to manage user watch</p>
      <div className="button-wrapper flex items-center gap-2">
        <Link href={'/login'}>
          <Button>Log in</Button>
        </Link>
        <p className="text-xs">or</p>
        <Link href={'/sign-up'}>
          <Button variant={'outline'}>Sign up</Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
