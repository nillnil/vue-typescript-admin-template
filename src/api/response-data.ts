
export class ResponseData {
  code: number
  msg: string
  data: object
  constructor(code: number, msg: string, data: object) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}

export class ResponseSuccessData extends ResponseData {
  constructor(data: object) {
    super(200, 'success', data)
  }
}

export class ResponseErrorData extends ResponseData {
  constructor(data: object) {
    super(500, 'error', data)
  }
}
