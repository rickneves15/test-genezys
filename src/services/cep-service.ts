import axios from 'axios'

import { CEP_API_URL } from '~/lib/constants'
import { AddressData } from '~/schemas/cep'

export const cepService = {
  validateAndFillAddress: async (cep: string): Promise<AddressData> => {
    try {
      const cleanedCep = cep.replace(/\D/g, '')
      const response = await axios.get(`${CEP_API_URL}/${cleanedCep}/json/`)

      if (response.data.erro) {
        throw new Error('Invalid CEP')
      }

      return {
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
      }
    } catch {
      throw new Error('Error fetching address data')
    }
  },
}
