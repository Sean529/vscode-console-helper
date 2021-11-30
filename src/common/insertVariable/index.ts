import {
  window,
  commands,
  TextEditor,
  Range,
  TextDocument,
  TextLine,
  Position
} from 'vscode'
import { formatVar } from '..'

const { activeTextEditor, onDidChangeActiveTextEditor } = window
let currentEditor: TextEditor
export const insertVariable = context => {
  currentEditor = activeTextEditor
  // 当触发文本时重新赋值
  onDidChangeActiveTextEditor(editor => (currentEditor = editor))
  // 订阅命令
  context.subscriptions.push(
    commands.registerTextEditorCommand('consoleLog.insertVariable', () =>
      handleCursorInsert()
    )
  )
}

interface WrapData {
  txt: string
  item: string
  sel: Selection
  doc: TextDocument
  ran: Range
  ind: string
  idx: number
  line: number
  isLastLine: boolean
}

// 处理回调事件
export const handleCursorInsert = () => {
  new Promise((resolve, reject) => {
    const doc = currentEditor.document
    // 选中的文本对象
    const sel = currentEditor.selection
    // 获取文本位置
    const ran = doc.getWordRangeAtPosition(sel.anchor) || new Range(sel.start, sel.end)
    const lineNumber = ran.start.line
    // 通过范围获取文本
    const item = doc.getText(ran)
    // doc.lineAt(lineNumber) 光标所在(整)行内容对象
    // 第一个非空白字符索引
    const idx = doc.lineAt(lineNumber).firstNonWhitespaceCharacterIndex
    // 截取非空字符长度
    // doc.lineAt(lineNumber).text 光标所在(整)行内容文本
    // 光标所在行，第一个非空字符前的空字符串
    const ind = doc.lineAt(lineNumber).text.substring(0, idx)
    // TODO: 后期可以在这里对选择项为空时特殊处理
    const logText = formatVar(item, lineNumber + 2)
    const wrapData: any = {
      txt: logText,
      item: item,
      doc: doc,
      ran: ran,
      ind: ind,
      line: lineNumber,
      sel: sel,
      isLastLine: doc.lineCount - 1 === lineNumber
    }
    resolve(wrapData)
  }).then((wrap: WrapData) => {
    let nxtLine: TextLine
    let nxtLineIndex: string
    // 如果不是最后一行
    if (!wrap.isLastLine) {
      nxtLine = wrap.doc.lineAt(wrap.line + 1) // 获取下一行文本对象
      // 截取下一行文本的第一个非空字符前的所有字符
      nxtLineIndex = nxtLine.text.substring(
        0,
        nxtLine.firstNonWhitespaceCharacterIndex
      )
    }
    currentEditor.edit(e => {
      e.insert(
        new Position(wrap.line, wrap.doc.lineAt(wrap.line).range.end.character),
        // 比较下一行与光标所在行，第一个非空字符前的空字符串长度，以长的为准
        '\n'.concat(nxtLineIndex > wrap.ind ? nxtLineIndex : wrap.ind, wrap.txt)
      )
    })
  })
}
