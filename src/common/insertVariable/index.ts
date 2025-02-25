import { Range, Position } from "vscode"
import { formatVar } from ".."

// 处理回调事件
export const handleCursorInsert = async ({ selection, textEditor }) => {
  const document = textEditor.document
  // 获取文本位置
  // 如果是光标停留（没有选中文本），使用getWordRangeAtPosition获取单词范围
  // 如果有选中文本，直接使用选中的范围
  const range = selection.isEmpty
    ? document.getWordRangeAtPosition(selection.anchor, /[a-zA-Z_$][a-zA-Z0-9_$.]*/) || new Range(selection.start, selection.end)
    : new Range(selection.start, selection.end)

  const lineNumber = range.start.line
  // 通过范围获取文本
  const logText = formatVar(document.getText(range), lineNumber + 2)

  // 获取当前行和下一行的缩进
  const currentLine = document.lineAt(lineNumber)
  const currentIndent = currentLine.text.substring(0, currentLine.firstNonWhitespaceCharacterIndex)

  let indent = currentIndent
  // 如果不是最后一行，比较下一行的缩进
  if (lineNumber < document.lineCount - 1) {
    const nextLine = document.lineAt(lineNumber + 1)
    const nextIndent = nextLine.text.substring(0, nextLine.firstNonWhitespaceCharacterIndex)
    // 使用较长的缩进
    indent = nextIndent.length > currentIndent.length ? nextIndent : currentIndent
  }

  await textEditor.edit((e) => {
    e.insert(new Position(lineNumber, document.lineAt(lineNumber).range.end.character), "\n".concat(indent, logText))
  })
}
