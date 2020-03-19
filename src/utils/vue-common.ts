import { AppConfig, NotifyConfig } from '@/app-config'

/**
 * 一些通用的vue内部方法
 */
const Common = {
  install: (Vue: any, appConfig: AppConfig) => {
    // VUE_APP_BASE_API
    Vue.prototype.$baseApi = process.env.VUE_APP_BASE_API

    // 通知 start
    const notifyConfig = appConfig.notify

    // 通用消息通知
    Vue.prototype.$notify.info = function(message: string | object) {
      const params = Object.assign({
        message: '',
        title: notifyConfig.title || '',
        duration: notifyConfig.duration || 4500,
        type: 'info'
      }, notifyConfig.info)
      if (typeof message === 'string' || typeof message === 'undefined') {
        params.message = message || params.message || ''
      } else if (typeof message === 'object') {
        Object.assign(params, message, {
          type: 'info'
        })
      }
      this(params)
    }
    // 通用成功通知
    Vue.prototype.$notify.success = function(message: string | object) {
      const params = Object.assign({
        message: '',
        title: notifyConfig.title || '',
        duration: notifyConfig.duration || 4500,
        type: 'success'
      }, notifyConfig.success)
      if (typeof message === 'string' || typeof message === 'undefined') {
        params.message = message || params.message || ''
      } else if (typeof message === 'object') {
        Object.assign(params, message, {
          type: 'success'
        })
      }
      this(params)
    }
    // 通用失败通知
    Vue.prototype.$notify.error = function(message: string | object) {
      const params = Object.assign({
        message: '',
        title: notifyConfig.title || '',
        duration: notifyConfig.duration || 4500,
        type: 'error'
      }, notifyConfig.error)
      if (typeof message === 'string' || typeof message === 'undefined') {
        params.message = message || params.message || ''
      } else if (typeof message === 'object') {
        Object.assign(params, message, {
          type: 'error'
        })
      }
      this(params)
    }
    // 通用警告通知
    Vue.prototype.$notify.warning = function(message: string | object) {
      const params = Object.assign({
        message: '',
        title: notifyConfig.title || '',
        duration: notifyConfig.duration || 4500,
        type: 'warning'
      }, notifyConfig.warning)
      if (typeof message === 'string' || typeof message === 'undefined') {
        params.message = message || params.message || ''
      } else if (typeof message === 'object') {
        Object.assign(params, message, {
          type: 'warning'
        })
      }
      this(params)
    }
    // 通知 end

    // 回到顶部
    Vue.prototype.$backToTop = function(backPosition: number = 0, speed: number = 16.7) {
      if (Vue.prototype.$backToTopIsMoving) {
        return
      }
      const start = window.pageYOffset
      let i = 0
      Vue.prototype.$backToTopIsMoving = true
      this.$backToTopInterval = setInterval(() => {
        const next = Math.floor(_easeInOutQuad(10 * i, start, -start, 500))
        if (next <= backPosition) {
          window.scrollTo(0, backPosition)
          clearInterval(this.$backToTopInterval)
          Vue.prototype.$backToTopIsMoving = false
          delete Vue.prototype.$backToTopIsMoving
          delete this.$backToTopInterval
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, speed)
    }
  }
}

function _easeInOutQuad(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b
  return -c / 2 * (--t * (t - 2) - 1) + b
}

export default Common
