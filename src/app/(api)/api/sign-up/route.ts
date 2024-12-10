import { registrationSchema } from '~/schemas/sign-up-form'
import { serverJsonAPi } from '~/services/server-json-api'

export async function POST(request: Request) {
  const form = await request.json()
  const { success, data } = registrationSchema.safeParse(form)

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

  if (userExist.data.length > 0) {
    return Response.json(
      {
        message: 'User already exists',
      },
      { status: 400 },
    )
  }

  const userCreated = await serverJsonAPi.post('/users', data)

  if (!userCreated) {
    return Response.json(
      {
        message: 'Failed to create user',
      },
      { status: 500 },
    )
  }

  return Response.json(userCreated)
}
