import { window, commands } from 'vscode'
import { quotesFormat } from '../quotesFormat'
import { getSettingValue } from '../getSettingValue'
import { setFontSizeStr } from '../utils'
import { joinStatement } from '../joinStatement'
import { showErrorMessage } from '../showErrorMessage'
import { insertText } from '../insertText'

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
      const text = editor.document.getText(selection) // 选择的字符
      if (text) {
        // 将选择的字符美化后打印
        commands.executeCommand('editor.action.insertLineAfter').then(() => {
          const selectVariable = text.replace(/'|"/g, '') // 编辑器中选中的文本（要打印的变量）
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
