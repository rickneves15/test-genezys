import { RegistrationForm } from '~/schemas/sign-up-form'

import { api } from './api'

export const authService = {
  register: async (data: RegistrationForm) => {
    const response = await api.post('/sign-up', data)
    return response.data
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/sign-in', data)
    return response.data
  },
}
