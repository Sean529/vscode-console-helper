import { window, Range } from 'vscode'

// 执行 log 写入
export const insertText = val => {
  const editor = window.activeTextEditor
  const { selection } = editor

  const range = new Range(selection.start, selection.end)
  editor.edit(editBuilder => {
    editBuilder.replace(range, val)
  })
}
