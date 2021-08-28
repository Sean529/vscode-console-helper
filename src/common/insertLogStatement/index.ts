import { window, commands } from 'vscode'
import { setFontSizeStr } from '../../utils'
import {
  quotesFormat,
  getSettingValue,
  joinStatement,
  showErrorMessage,
  insertText
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
          // 获取配置信息
          const fontSize = getSettingValue('Font Size')
          const fontSizeStr = setFontSizeStr(fontSize) // fontSize 的值
          const colorBg = getSettingValue('Color Bg')
          const color = getSettingValue('Color')
          const prefixLogo = getSettingValue('Prefix Logo')
          const isShowSemi = getSettingValue('Show Semi')
          const isShowLineCount = getSettingValue('Show LineNumber')
          const selectFileName = getSettingValue('Select FileName')
          const numberArgument = getSettingValue('Number Argument')
          // 自定义样式
          const customStyles = {
            fontSize: fontSizeStr,
            colorBg,
            color
          }
          const { fileName } = window.activeTextEditor.document
          const lineNumber = selection.end.line + 2 // console 所在的行号
          const logToInsert = joinStatement({
            selectVariable,
            isShowSemi,
            prefixLogo,
            numberArgument,
            customStyles,
            isShowLineCount,
            selectFileName,
            lineNumber,
            fileName
          })
          // 根据配置处理单双引号
          const logText = quotesFormat(logToInsert)
          insertText(logText)
        })
      }
    }
  )
  context.subscriptions.push(insert)
}
