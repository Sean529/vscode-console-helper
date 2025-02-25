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
const calculateNewCursorPosition = (text: string, insertedLineNumber: number, cursorPosition: CursorPosition): Position | null => {
  if (cursorPosition === CURSOR_POSITIONS.none) return null

  switch (cursorPosition) {
    case CURSOR_POSITIONS.end: {
      const lastParenIndex = text.lastIndexOf(")")
      return lastParenIndex !== -1 ? new Position(insertedLineNumber, lastParenIndex + 1) : null
    }
    case CURSOR_POSITIONS.inside: {
      const lastParenIndex = text.lastIndexOf(")")
      if (lastParenIndex !== -1) {
        const lastCommaIndex = text.lastIndexOf(",")
        return new Position(insertedLineNumber, lastCommaIndex + 2) // +2 是为了跳过逗号和空格
      }
      return null
    }
    case CURSOR_POSITIONS.before_first_paren: {
      const firstParenIndex = text.indexOf("(", text.indexOf("console"))
      return firstParenIndex !== -1 ? new Position(insertedLineNumber, firstParenIndex) : null
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
  const cursorPosition = getSettingValue("Cursor Position") || CURSOR_POSITIONS.end
  const insertedLineNumber = lineNumber + 1
  const insertedLine = document.lineAt(insertedLineNumber)

  const newPosition = calculateNewCursorPosition(insertedLine.text, insertedLineNumber, cursorPosition)
  if (newPosition) {
    textEditor.selection = new vscodeSelection(newPosition, newPosition)
  }
}
