import http from '@/utils/http'

const USERS_API = {
  INFO: '/users/info'
}

export const getUserInfo = () => http.get(USERS_API.INFO)

export const getUsers = (params: any) =>
  http({
    url: '/users',
    method: 'get',
    params
  })

export const getUserByName = (username: string) =>
  http({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  http({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  http({
    url: `/users/${username}`,
    method: 'delete'
  })
