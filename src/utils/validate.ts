/**
 * 是否有效的用户名
 * @param str 用户名
 */
export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

/**
 * 是否http链接，邮箱链接，电话链接
 * @param path 链接
 */
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

/**
 * 是否数组
 * @param arg 数组
 */
export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 合法url
 * @param url url
 */
export function validateURL(url: string) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(url)
}

/**
 * 是否小写字母
 * @param str 字符串
 */
export function validateLowerCase(str: string) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 是否大写字母
 * @param str 字符串
 */
export function validateUpperCase(str: string) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 是否大小写字母
 * @param str 字符串
 */
export function validateAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 是否有效邮箱
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
