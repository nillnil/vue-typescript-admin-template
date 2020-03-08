import http from '@/utils/http'

export const getRoles = (params: any) =>
  http({
    url: '/roles',
    method: 'get',
    params
  })

export const createRole = (data: any) =>
  http({
    url: '/roles',
    method: 'post',
    data
  })

export const updateRole = (id: number, data: any) =>
  http({
    url: `/roles/${id}`,
    method: 'put',
    data
  })

export const deleteRole = (id: number) =>
  http({
    url: `/roles/${id}`,
    method: 'delete'
  })

export const getRoutes = (params: any) =>
  http({
    url: '/routes',
    method: 'get',
    params
  })
