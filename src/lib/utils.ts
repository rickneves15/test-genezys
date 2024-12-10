import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BASE_KEY_STORAGE } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isDev = process.env.NODE_ENV === 'development'

export const buildKeyStore = (key: string) => `${BASE_KEY_STORAGE}${key}`
