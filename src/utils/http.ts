import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200 && !res.success) {
      if (res.code === 408) {
        // 登录超时
        MessageBox.alert('登录已失效，请重新登录', '提示', {
          callback: () => {
            Vue.prototype.$router.push('/login')
          }
        })
      } else if (res.code === 401 || res.code === 403) {
        // 没有权限
        Message.error({
          message: res.msg || '没有权限',
          duration: 5 * 1000
        })
      } else {
        Message.error({
          message: res.msg || '',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  }, (error: any) => {
    Message.error({
      message: error.msg || error || '',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
