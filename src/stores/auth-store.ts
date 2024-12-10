import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { deleteCookie } from '~/actions/cookies'
import { buildKeyStore } from '~/lib/utils'
import { UserWithoutPassword } from '~/schemas/user'

interface AuthState {
  user: UserWithoutPassword | null
  token: string | null
  signIn: (userData: UserWithoutPassword, token: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      signIn: (userData, token) => set({ user: userData, token }),
      signOut: () => {
        deleteCookie(buildKeyStore('token'))
        set({ user: null, token: null })
      },
    }),
    {
      name: buildKeyStore('auth'),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
)
