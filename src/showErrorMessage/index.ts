import { window } from 'vscode'
// 文件无权限提示
export const showErrorMessage = () => {
  window.showErrorMessage('无法插入 log，文件没有编辑权限')
}
