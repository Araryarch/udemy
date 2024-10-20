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
import { CalendarIcon } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'

const accountTypeSchema = z
  .object({
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    acceptTerms: z
      .boolean({
        required_error: 'You must accept the terms and conditions'
      })
      .refine((checked) => checked, 'You must accept the terms and conditions')
  })
  .superRefine((data, ctx) => {
    if (data.accountType == 'company' && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyName'],
        message: 'Company name is required'
      })
    }
    if (
      data.accountType == 'company' &&
      (!data.numberOfEmployees || data.numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['numberOfEmployees'],
        message: 'number of employees is required'
      })
    }
  })

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .refine((password) => {
        // mengandung 1 spesial char dan 1 uppercase
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password)
      }, 'Password must contain at least 1 spesial characters and 1 uppercase character'),
    passwordConfirm: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirm'],
        message: 'Password do not match'
      })
    }
  })

const baseSchema = z.object({
  email: z.string().email(),
  dob: z.date().refine((date) => {
    const today = new Date()
    const eighteedYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
    return date <= eighteedYearsAgo
  }, 'You must be at least 18 years old')
})

const formSchema = baseSchema.and(passwordSchema).and(accountTypeSchema)

const SignupPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: ''
    }
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('login validation passed', data)
    router.push('/dashboard')
  }

  const accountType = form.watch('accountType')
  const dobFromDate = new Date()
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120)

  return (
    <Layout>
      <Card
        className={`w-full max-w-sm ${
          accountType == 'company' ? 'mt-96' : 'mt-48'
        } relative`}
      >
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up for a new Anidash account</CardDescription>
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
                    <FormLabel>
                      Email<span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='johndoe@gmail.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='accountType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Account type<span className='text-destructive'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='select an account type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='personal'>Personal</SelectItem>
                        <SelectItem value='company'>Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {accountType == 'company' && (
                <>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company name
                          <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Company Name'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='numberOfEmployees'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Employees<span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Employees'
                            type='number'
                            min={0}
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>
                      Date of Birth<span className='text-destructive'>*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className='normal-case flex justify-between'
                          >
                            <span>Pick a Date</span>
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        align='start'
                        className='w-auto p-0'
                      >
                        <Calendar
                          mode='single'
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          captionLayout='dropdown-buttons'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password<span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='*******'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password
                      <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='*******'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='acceptTerms'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex gap-2 justify-start'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I accept the terms and the conditions
                      </FormLabel>
                    </div>
                    <FormDescription>
                      By signing up you are agree to our{' '}
                      <Link
                        className='text-primary hover:underline'
                        href='/terms'
                      >
                        terms and conditions
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='uppercase font-bold'
              >
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='justify-between'>
          <small className='font-semibold'>Already have an account?</small>
          <Button
            asChild
            variant={'outline'}
          >
            <Link href={'/login'}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  )
}

export default SignupPage
