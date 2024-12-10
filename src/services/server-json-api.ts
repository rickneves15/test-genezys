import axios from 'axios'

import { SERVER_JSON_API_URL } from '~/lib/constants'

export const serverJsonAPi = axios.create({
  baseURL: SERVER_JSON_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
