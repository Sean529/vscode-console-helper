import { window, commands } from 'vscode'
import { showErrorMessage } from '../index'
import { handleCursorInsert } from '../insertVariable'

// log 插入
export const insertLogStatement = context => {
  const insert = commands.registerTextEditorCommand(
    'consoleLog.insertLogStatement',
    handle
  )
  // 订阅命令
  context.subscriptions.push(insert)
}

export const insertVariable = context => {
  const insert = commands.registerTextEditorCommand(
    'consoleLog.insertVariable',
    handle
  )
  // 订阅命令
  context.subscriptions.push(insert)
}

const handle = async () => {
  const textEditor = window.activeTextEditor
  if (!textEditor) {
    showErrorMessage()
    return
  }

  for (let index = 0; index < textEditor.selections.length; index++) {
    const selection = textEditor.selections[index]
    await handleCursorInsert({ selection, textEditor })
  }
}
