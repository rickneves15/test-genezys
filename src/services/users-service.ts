import { User } from '~/schemas/user'

import { serverJsonAPi } from './server-json-api'

type GetUsersProps = {
  currentPage?: number
  pageSize?: number
}

type UsersPagination = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: User[]
}

export const usersService = {
  listUsers: async ({
    currentPage = 1,
    pageSize = 10,
  }: GetUsersProps): Promise<UsersPagination | undefined> => {
    try {
      const response = await serverJsonAPi.get(
        `/users?_page=${currentPage}&_per_page=${pageSize}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
