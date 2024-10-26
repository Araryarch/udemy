'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Layout from '../Layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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
  FormMessage,
} from '@/components/ui/form'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useRouter } from 'next/navigation'

const fromSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const LoginPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data: z.infer<typeof fromSchema>) => {
    console.log('login validation passed')
    router.push('/dashboard')
  }

  return (
    <>
      <Layout classname="border-[1px] backdrop-blur-lg">
        <Card className="w-full max-w-sm border-transparent bg-transparent shadow-transparent">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your Anidash account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@gmail.com"
                          type="email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="font-bold uppercase">
                  login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-between">
            <small className="font-semibold">Don&apos;t have an account?</small>
            <Button asChild variant={'outline'}>
              <Link href={'/sign-up'}>Sign up</Link>
            </Button>
          </CardFooter>
        </Card>
      </Layout>
      <Breadcrumb className="fixed left-0 top-0 p-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/login">Login</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

export default LoginPage
