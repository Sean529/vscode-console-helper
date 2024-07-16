import {
  Range,
  Position
} from 'vscode'
import { formatVar } from '..'

// 处理回调事件
export const handleCursorInsert = async ({selection, textEditor}) => {
  const document = textEditor.document
  // 获取文本位置
  const range = document.getWordRangeAtPosition(selection.anchor) || new Range(selection.start, selection.end)
  const lineNumber = range.start.line
  // 通过范围获取文本
  const logText = formatVar(document.getText(range), lineNumber + 2)

  await textEditor.edit(e => {
    e.insert(
      new Position(lineNumber, document.lineAt(lineNumber).range.end.character),
      '\n'.concat(logText)
    )
  })
}
