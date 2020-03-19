import http from '@/utils/http'

const API = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  UPDATE_PWD: '/updatePwd'
}

/**
 * 登录
 * @param data { userName: '', password: ''}
 */
export const login = (data: any) => http.post(API.LOGIN, data)

/**
 * 退出登录
 */
export const logout = () => http.get(API.LOGOUT)

/**
 * 修改密码
 * @param oldPwd 原密码，已md5加密过
 * @param newPwd 新密码，已md5加密过
 */
export const updatePwd = (oldPwd: String, newPwd: String) => http.post(API.UPDATE_PWD, {
  oldPwd,
  newPwd
})
