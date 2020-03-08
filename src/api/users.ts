import http from '@/utils/http'

const USERS_API = {
  LOGIN: '/users/login',
  LOGOUT: '/users/logout',
  INFO: '/users/info'
}

export const login = (data: any) => http.post(USERS_API.LOGIN, data)

export const logout = () => http.post(USERS_API.LOGOUT)

export const getUserInfo = (data: any) => http.post(USERS_API.INFO, data)

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
