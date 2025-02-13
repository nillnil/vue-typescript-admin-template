import Vue from 'vue'
import Clipboard from 'clipboard'

export const clipboardSuccess = () =>
  Vue.prototype.$message({
    message: '拷贝成功',
    type: 'success',
    duration: 1500
  })

export const clipboardError = () =>
  Vue.prototype.$message({
    message: '拷贝失败',
    type: 'error'
  })

export const handleClipboard = (text: string, event: MouseEvent) => {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  });
  (clipboard as any).onClick(event)
}
