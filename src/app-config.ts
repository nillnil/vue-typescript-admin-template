/**
 * app的一些配置
 */
export class AppConfig {
  // 通知配置
  notify: NotifyConfig

  constructor(notify: NotifyConfig) {
    this.notify = notify
  }
}

/**
 * 通知的一些配置
 */
export class NotifyConfig {
  // 标题
  title: string = '提示'
  // 显示时间, 毫秒。设为 0 则不会自动关闭
  duration: number = 4500
  // 提示默认信息
  info: any = {
    message: '消息'
  }
  // 成功的默认信息
  success: any = {
    message: '成功'
  }
  // 错误的默认信息
  error: any = {
    message: '失败',
    showClose: false
  }
  // 警告的默认信息
  warning: any = {
    message: '警告'
  }
}

const appConfig = new AppConfig(new NotifyConfig())

export default appConfig
