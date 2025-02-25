import { SETTINGS_LIST } from "../index"
import { workspace } from "vscode"
import { CursorPosition } from "../Enum"

type BooleanSettings = "Show Semi" | "Show LineNumber" | "Random Color" | "Random Color In Terminal"

type SettingValue<T extends string> = T extends "Cursor Position"
  ? CursorPosition
  : T extends BooleanSettings
  ? boolean
  : string

interface Settings {
  name: string
  default: boolean | string
  description: string
}

export const getSettingValue = <T extends string>(name: T): SettingValue<T> => {
  const value = workspace.getConfiguration().get(`consoleLog.${name}`) || ""

  const len = SETTINGS_LIST.length

  for (let i = 0; i < len; i++) {
    const item: Settings = SETTINGS_LIST[i]
    if (item.name === name) {
      return (value || item.default) as SettingValue<T>
    }
  }
  return "" as SettingValue<T>
}
