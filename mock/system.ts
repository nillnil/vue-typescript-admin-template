import { MockData, ResponseData, ResponseSuccessData, ResponseErrorData } from './mock-data'
import { verifyToken, getToken, intercept } from './utils'

const API = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  UPDATE_PWD: '/updatePwd'
}

const DEFAULT_USERS = {
  'superAdmin': 'a95d4788f99e984137909643c554da38',
  'admin': 'c30807e6587ade285ba7ade9f881b3d7'
}

export default [
  new MockData(API.LOGIN, 'post', (config: any) => {
    const body = config.body
    const userName = body.userName
    const password = body.password
    let responseData = new ResponseData(500, '用户名或密码错误', false, null)
    Object.keys(DEFAULT_USERS).forEach((key) => {
      if (userName === key && password === DEFAULT_USERS[key]) {
        responseData = new ResponseSuccessData({
          token: getToken(userName)
        })
        return false
      }
    })
    return responseData
  }),
  new MockData(API.LOGOUT, 'get', (config: any) => {
    if (verifyToken(config)) {
      return new ResponseSuccessData()
    }
    // 退出登录的，验证不通过也返回正确响应码
    return new ResponseSuccessData()
  }),
  new MockData(API.UPDATE_PWD, 'post', (config: any) => {
    return intercept(config, (config: any) => {
      const oldPwd = (config.body || {}).oldPwd || ''
      let msg = '修改密码失败'
      let code = 500
      let success = false
      if (oldPwd !== 'e10adc3949ba59abbe56e057f20f883e') {
        msg = '原密码错误'
        code = 501
      } else {
        msg = '修改密码成功'
        code = 200
        success = true
      }
      return new ResponseData(code, msg, success, null)
    })
  })
]
