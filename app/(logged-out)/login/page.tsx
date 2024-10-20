'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Layout from '../Layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PersonStandingIcon } from 'lucide-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const fromSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = () => {
    console.log('login validation passed')
  }

  return (
    <Layout>
      <PersonStandingIcon size={50} />
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your Anidash account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='johndoe@gmail.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your email address you signed up to Anidash with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='********'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='uppercase font-bold'
              >
                login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-between'>
          <small className='font-semibold'>Don&apos;t have an account?</small>
          <Button
            asChild
            variant={'outline'}
          >
            <Link href={'/sign-up'}>Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
      <Breadcrumb className='absolute top-10 left-10 xl:top-12'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/login'>Login</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Layout>
  )
}

export default LoginPage
