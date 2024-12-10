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
import {
  type ResetPasswordForm,
  resetPasswordSchema,
} from '~/schemas/reset-password-form'
import { authService } from '~/services/auth-service'

export function ResetPasswordForm() {
  const router = useRouter()

  // Form initialization
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  // Password reset mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordForm) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset link sent to your email!', {
        id: 'reset-password-form',
      })
      router.push('/login')
    },
    onError: () => {
      toast.error('Failed to send password reset link. Please try again.', {
        id: 'reset-password-form',
      })
    },
  })

  // Form submission handler
  const onSubmit = (data: ResetPasswordForm) => {
    toast.loading('Sending password reset link...', {
      id: 'reset-password-form',
    })
    resetPasswordMutation.mutate(data)
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Reset Password</h2>

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

          <Button
            type="submit"
            className="w-full"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        <Link href="sign-in" className="underline">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
