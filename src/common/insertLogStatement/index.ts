import { window, commands, TextEditor } from 'vscode'
import { showErrorMessage, insertText, formatVar } from '../index'
import { handleCursorInsert } from '../insertVariable'

// log 插入
const { activeTextEditor, onDidChangeActiveTextEditor } = window
let currentEditor: TextEditor
export const insertLogStatement = context => {
  currentEditor = activeTextEditor
  // 当触发文本时重新赋值
  onDidChangeActiveTextEditor(editor => (currentEditor = editor))
  const insert = commands.registerTextEditorCommand(
    'consoleLog.insertLogStatement',
    () => handle(context)
  )
  // 订阅命令
  context.subscriptions.push(insert)
}

const handle = context => {
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
  } else {
    handleCursorInsert()
  }
}
