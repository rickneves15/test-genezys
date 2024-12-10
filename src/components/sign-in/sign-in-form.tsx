'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { type SignInForm, SignInFormSchema } from '~/schemas/sign-in-form'
import { authService } from '~/services/auth-service'
import { useAuthStore } from '~/stores/auth-store'
import { GenericErrorResponse } from '~/types/generic-error-response'

export function SignInForm() {
  const router = useRouter()
  const signIn = useAuthStore((state) => state.signIn)

  // Form initialization with Zod resolver
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: SignInForm) => authService.login(data),
    onSuccess: (response) => {
      // Store user data and token in global auth store
      signIn(response.user, response.token)

      toast.success('Login Successful', { id: 'sign-in-form' })

      router.push('/')
    },
    onError: (error: GenericErrorResponse) => {
      toast.error(error.response?.data?.message || 'An error occurred', {
        id: 'sign-in-form',
      })
    },
  })

  // Handle form submission
  const onSubmit = (data: SignInForm) => {
    toast.loading('Logging in...', { id: 'sign-in-form' })
    loginMutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Password
                    <Link
                      href="reset-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
