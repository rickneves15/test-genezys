import { PropsWithChildren } from 'react'

import { Toaster } from '~/components/ui/sonner'

import { ReactQueryProvider } from './react-query-provider'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster richColors />
    </ReactQueryProvider>
  )
}
