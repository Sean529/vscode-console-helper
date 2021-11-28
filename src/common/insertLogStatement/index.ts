import { window, commands } from 'vscode'
import {
  showErrorMessage,
  insertText,
  formatVar
} from '../index'

// log 插入
export const insertLogStatement = context => {
  const insert = commands.registerCommand(
    'consoleLog.insertLogStatement',
    () => {
      const editor = window.activeTextEditor
      if (!editor) {
        showErrorMessage()
        return
      }

      const { selection } = editor
      const selectVariable = editor.document.getText(selection) // 选择的字符
      if (selectVariable) {
        // 将选择的字符美化后打印
        commands.executeCommand('editor.action.insertLineAfter').then(() => {
          const lineNumber = selection.end.line + 2 // console 所在的行号
          const logText = formatVar(selectVariable, lineNumber)
          insertText(logText)
        })
      }
    }
  )
  context.subscriptions.push(insert)
}
