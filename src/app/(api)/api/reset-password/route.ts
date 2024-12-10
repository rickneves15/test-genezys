import { resetPasswordSchema } from '~/schemas/reset-password-form'
import { serverJsonAPi } from '~/services/server-json-api'

export async function POST(request: Request) {
  const form = await request.json()
  const { success, data } = resetPasswordSchema.safeParse(form)

  if (!success) {
    return Response.json(
      {
        message: 'Invalid form data',
      },
      { status: 400 },
    )
  }

  const userExist = await serverJsonAPi.get(`/users`, {
    params: {
      email: data.email,
    },
  })

  if (userExist.data.length === 0) {
    return Response.json(
      {
        message: 'User not found',
      },
      { status: 400 },
    )
  }

  // simulate sending email with reset link
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return Response.json(
    {
      message: 'Password reset link sent to your email!',
    },
    { status: 200 },
  )
}
