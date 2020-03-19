import { ResponseData } from './mock-data'

const TOKENS = {
  'superAdmin': 'MTk1ZDQ3ODhmOTllOTg0MTM3OTA5NjQzYzU1NGQxMmM=',
  'admin': 'YmUwZGRlN2FkNjIyMGZjODFiYTQwYTY4YWE2ZjRiNTE='
}

export const $TokenHeader = 'X-Access-Token'

export function verifyToken(config: any) {
  const headers = config.headers || {}
  for (var i in TOKENS) {
    if (headers[$TokenHeader] === TOKENS[i]) {
      return true
    }
  }
  return false
}

export function getToken(userName: string) {
  return TOKENS[userName]
}

export const TokenHeader = $TokenHeader

export function intercept(config: any, callback: Function) {
  if (verifyToken(config)) {
    if (callback != null) {
      return callback(config)
    }
  }
  return new ResponseData(408, '登录已超时，请重新登录', null)
}
