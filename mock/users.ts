import Mock from 'mockjs'
import { MockData, ResponseData, ResponseSuccessData, ResponseErrorData } from './mock-data'
import { intercept } from './utils'

const API = {
  INFO: '/users/info'
}

export default [
  new MockData(API.INFO, 'get', (config: any) => {
    return intercept(config, () => {
      const user = {
        roles: ['admin'],
        name: Mock.mock('@cname'),
        avatar: Mock.mock('@image("100x100", @color, "avatar")'),
        introduction: '',
        email: Mock.mock('email')
      }
      return new ResponseSuccessData({
        user
      })
    })
  })
]
