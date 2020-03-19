import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
import { UserModule } from '../src/store/modules/user'

import system from './system'
import users from './users'

const mocks = [
  ...system,
  ...users
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    if (this.custom) {
      this.setRequestHeader('X-Access-Token', UserModule.token || '')
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond, obj) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
          headers: {
            'X-Access-Token': UserModule.token || ''
          }
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const mockData of mocks) {
    Mock.mock(new RegExp(process.env.VUE_APP_BASE_API + mockData.url), mockData.type || 'get', XHR2ExpressReqWrap(mockData.data))
  }
}

export default mocks
