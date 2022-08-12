import { SETTINGS_LIST } from '../index'
import { workspace } from 'vscode'

interface Settings {
  name: string
  default: boolean | string
  description: string
}

export const getSettingValue = (name: string) => {
  const value: string =
    workspace.getConfiguration().get(`consoleLog.${name}`) || ''

  const len = SETTINGS_LIST.length

  for (let i = 0; i < len; i++) {
    const item: Settings = SETTINGS_LIST[i]
    if (item.name === name) {
      return value || item.default
    }
  }
  return ''
}
