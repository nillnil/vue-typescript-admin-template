import http from '@/utils/http'

export const getTransactions = (params: any) =>
  http({
    url: '/transactions',
    method: 'get',
    params
  })
