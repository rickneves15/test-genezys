/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent } from 'react'
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
import { RegistrationForm, registrationSchema } from '~/schemas/sign-up-form'
import { authService } from '~/services/auth-service'
import { cepService } from '~/services/cep-service'
import { GenericErrorResponse } from '~/types/generic-error-response'

export function SignUpForm() {
  const router = useRouter()
  // Form initialization with Zod resolver
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        cep: '',
      },
    },
  })

  // CEP validation mutation
  const cepMutation = useMutation({
    mutationFn: (cep: string) => cepService.validateAndFillAddress(cep),
    onSuccess: (addressData) => {
      form.setValue('address.street', addressData.street)
      form.setValue('address.neighborhood', addressData.neighborhood)
      form.setValue('address.city', addressData.city)
      form.setValue('address.state', addressData.state)
    },
    onError: () => {
      toast.error('Invalid CEP', { id: 'cep-validation' })
    },
  })

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: (data: RegistrationForm) => authService.register(data),
    onSuccess: () => {
      toast.success('Registration Successful', { id: 'registration-form' })
      router.push('/login')
    },
    onError: (error: GenericErrorResponse) => {
      toast.error(error?.response?.data?.message ?? 'An error occurred', {
        id: 'registration-form',
      })
    },
  })

  // Handle form submission
  const onSubmit = (data: RegistrationForm) => {
    toast.loading('Registering...', { id: 'registration-form' })
    registrationMutation.mutate(data)
  }

  // Handle CEP validation
  const onCepValidation = (cep: string) => {
    // Remove non-numeric characters
    const cleanedCep = cep.replace(/\D/g, '')

    // Format CEP if needed
    if (cleanedCep.length === 8) {
      const formattedCep = `${cleanedCep.slice(0, 5)}-${cleanedCep.slice(5)}`
      form.setValue('address.cep', formattedCep)

      // Trigger CEP validation
      cepMutation.mutate(formattedCep)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          User Registration
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e)
                        onCepValidation(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neighborhood</FormLabel>
                    <FormControl>
                      <Input placeholder="Neighborhood" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={registrationMutation.isPending}
            >
              {registrationMutation.isPending ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>{' '}
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
