import { SETTINGS_LIST } from '../Enum/Enum'
import { workspace } from 'vscode'
export const getSettingValue = name => {
  const value = workspace.getConfiguration().get(`consoleLog.${name}`)
  const len = SETTINGS_LIST.length
  for (let i = 0; i < len; i++) {
    const item = SETTINGS_LIST[i]
    if (item.name === name) {
      return value || item.default
    }
  }
  return ''
}
