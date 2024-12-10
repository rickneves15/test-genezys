import { NextRequest } from 'next/server'

import jwt from 'jsonwebtoken'

import { setCookie } from '~/actions/cookies'
import { buildKeyStore } from '~/lib/utils'
import { SignInFormSchema } from '~/schemas/sign-in-form'
import { userWithoutPasswordSchema } from '~/schemas/user'
import { serverJsonAPi } from '~/services/server-json-api'

export async function POST(request: NextRequest) {
  const form = await request.json()
  const { success, data } = SignInFormSchema.safeParse(form)

  if (!success) {
    return Response.json(
      {
        message: 'Invalid form data',
      },
      { status: 400 },
    )
  }
  const userData = await serverJsonAPi.get(`/users`, {
    params: {
      email: data.email,
    },
  })

  if (userData.data.length === 0) {
    return Response.json(
      {
        message: 'User not found',
      },
      { status: 400 },
    )
  }

  const user = userData.data[0]
  if (user.password !== data.password) {
    return Response.json(
      {
        message: 'Invalid password',
      },
      { status: 400 },
    )
  }

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' })

  setCookie(buildKeyStore('token'), token)

  return Response.json(
    {
      user: userWithoutPasswordSchema.parse(user),
      token,
    },
    { status: 200 },
  )
}
