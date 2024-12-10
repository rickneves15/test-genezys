'use server'

import { cookies } from 'next/headers'

export async function setCookie(key: string, data: string): Promise<void> {
  cookies().set(key, data)
}

export async function getCookie(key: string): Promise<string | null> {
  return cookies().get(key)?.value ?? null
}

export async function deleteCookie(key: string): Promise<void> {
  cookies().delete(key)
}
