import { AxiosError } from 'axios'

export type GenericErrorResponse = AxiosError<{ message?: string }>
