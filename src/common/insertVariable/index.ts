import { Range, Position, Selection as vscodeSelection } from "vscode"
import { formatVar, getSettingValue } from ".."
import { CURSOR_POSITIONS, CursorPosition } from "../Enum"

// 获取要插入日志的文本范围
const getTextRange = (selection: vscodeSelection, document: any): { range: Range; lineNumber: number } => {
  const range = selection.isEmpty
    ? document.getWordRangeAtPosition(selection.anchor, /[a-zA-Z_$][a-zA-Z0-9_$.]*/) || new Range(selection.start, selection.end)
    : new Range(selection.start, selection.end)

  return { range, lineNumber: range.start.line }
}

// 获取缩进空格
const getIndentation = (document: any, lineNumber: number): string => {
  const currentLine = document.lineAt(lineNumber)
  const currentIndent = currentLine.text.substring(0, currentLine.firstNonWhitespaceCharacterIndex)

  // 如果是最后一行，直接返回当前缩进
  if (lineNumber >= document.lineCount - 1) {
    return currentIndent
  }

  // 比较下一行的缩进，使用较长的缩进
  const nextLine = document.lineAt(lineNumber + 1)
  const nextIndent = nextLine.text.substring(0, nextLine.firstNonWhitespaceCharacterIndex)
  return nextIndent.length > currentIndent.length ? nextIndent : currentIndent
}

// 计算新的光标位置
const calculateNewCursorPosition = (
  document: any,
  text: string,
  insertedLineNumber: number,
  cursorPosition: CursorPosition,
  range: Range
): Position | null => {
  if (cursorPosition === CURSOR_POSITIONS.none) return null

  switch (cursorPosition) {
    case CURSOR_POSITIONS.first_param: {
      // 第一个参数的位置
      const varName = document.getText(range)
      const customLogFunction = getSettingValue("Custom Log Function") || "console.log"
      const varIndex = text.indexOf(varName, text.indexOf(customLogFunction))
      if (varIndex !== -1) {
        return new Position(insertedLineNumber, varIndex)
      }
      return null
    }
    case CURSOR_POSITIONS.last_param: {
      // 最后一个参数的位置
      const varName = document.getText(range)
      const lastIndex = text.lastIndexOf(varName)
      if (lastIndex !== -1) {
        return new Position(insertedLineNumber, lastIndex)
      }
      return null
    }
    case CURSOR_POSITIONS.start: {
      // 整行最前面
      const line = document.lineAt(insertedLineNumber)
      return new Position(insertedLineNumber, line.firstNonWhitespaceCharacterIndex)
    }
    case CURSOR_POSITIONS.end: {
      // 整行的最后
      return new Position(insertedLineNumber, text.length)
    }
    default:
      return null
  }
}

// 处理回调事件
export const handleCursorInsert = async ({ selection, textEditor }) => {
  const document = textEditor.document

  // 1. 获取文本范围
  const { range, lineNumber } = getTextRange(selection, document)
  const logText = formatVar(document.getText(range), lineNumber + 2)

  // 2. 获取缩进
  const indent = getIndentation(document, lineNumber)

  // 3. 插入日志文本
  await textEditor.edit((e) => {
    e.insert(new Position(lineNumber, document.lineAt(lineNumber).range.end.character), "\n".concat(indent, logText))
  })

  // 4. 处理光标位置
  const cursorPosition = getSettingValue("Cursor Position") || CURSOR_POSITIONS.none
  const insertedLineNumber = lineNumber + 1
  const insertedLine = document.lineAt(insertedLineNumber)

  const newPosition = calculateNewCursorPosition(document, insertedLine.text, insertedLineNumber, cursorPosition, range)
  if (newPosition) {
    textEditor.selection = new vscodeSelection(newPosition, newPosition)
  }
}
