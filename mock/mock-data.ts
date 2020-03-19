// mock的数据格式
export class MockData {
  url: string
  type: string
  data: Function

  constructor(url: string, type: string = 'get', data: Function) {
    this.url = url
    this.type = type
    this.data = data
  }
}

// mock返回格式
export class ResponseData {
  code: number
  msg: string
  success: boolean
  data?: object
  constructor(code: number, msg: string, success: boolean, data?: object) {
    this.code = code
    this.msg = msg
    this.success = success
    this.data = data
  }
}

// mock成功返回缺省数据
export class ResponseSuccessData extends ResponseData {
  constructor(data?: object) {
    super(200, 'success', true, data)
  }
}

// mock失败返回缺省数据
export class ResponseErrorData extends ResponseData {
  constructor(data?: object) {
    super(500, 'error', false, data)
  }
}
