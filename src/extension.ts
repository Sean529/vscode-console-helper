import { window, Range, commands } from 'vscode'
import checkForUpdate from './update'
import { NUMBER_ARGUMENT } from './Enum/Enum'
import { quotesFormat } from './quotesFormat'
import { getSettingValue } from './getSettingValue'
import { prefixFormat } from './prefixFormat'
import { stylesTransform } from './stylesTransform'
import { tempJoin } from './tempJoin'

// 执行 log 写入
const insertText = val => {
  const editor = window.activeTextEditor
  if (!editor) {
    showErrorMessage()
    return
  }
  const { selection } = editor

  const range = new Range(selection.start, selection.end)
  editor.edit(editBuilder => {
    editBuilder.replace(range, val)
  })
}

// 文件无权限提示
const showErrorMessage = () => {
  window.showErrorMessage('无法插入 log，文件没有编辑权限')
}

// 获取全部 log 语句
const getAllLogStatements = (document, documentText) => {
  const logStatements = []
  const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\(([\s\S]*?)\);?/g
  let match
  while ((match = logRegex.exec(documentText))) {
    const matchRange = new Range(
      document.positionAt(match.index),
      document.positionAt(match.index + match[0].length)
    )
    if (!matchRange.isEmpty) logStatements.push(matchRange)
  }
  return logStatements
}

// 删除成功提示信息
const deleteSuccessShowMessage = logs => {
  const message = logs.length
    ? `${logs.length} console.logs deleted`
    : `${logs.length} console.log deleted`
  window.showInformationMessage(message)
}

// 执行删除 log 每行操作
const deleteFoundLogLines = (range, edit, document) => {
  for (let index = range.start.line; index <= range.end.line; index++) {
    edit.delete(document.lineAt(index).rangeIncludingLineBreak)
  }
}

// 删除所有找到的 log 语句
const deleteFoundLogStatements = logs => {
  const editor = window.activeTextEditor
  const { document } = editor
  editor.edit(edit => {
    logs.forEach(range => {
      deleteFoundLogLines(range, edit, document)
    })
    deleteSuccessShowMessage(logs)
  })
}

// 语句末尾是否加分号
const joinStatement = data => {
  const { isShowSemi } = data
  return joinSemi(isShowSemi, joinTemplateStr(data))
}

const joinSemi = (isShowSemi, statement) => {
  return isShowSemi ? `${statement};` : `${statement}`
}

const joinTemplateStr = ({
  selectVariable,
  prefixLogo,
  numberArgument,
  customStyles,
  isShowLineCount,
  selectFileName,
  fileName,
  lineNumber
}) => {
  let statement = tempJoin('', '', selectVariable)
  const temp = prefixFormat({
    isShowLineCount,
    selectFileName,
    fileName,
    lineNumber,
    selectVariable,
    prefixLogo,
    statement
  })
  if (numberArgument === NUMBER_ARGUMENT.twoArgument) {
    statement = tempJoin(temp, '', selectVariable)
  } else if (numberArgument === NUMBER_ARGUMENT.threeArgument) {
    const styles = stylesTransform(customStyles)
    statement = tempJoin(temp, styles, selectVariable)
  }
  return statement
}

// 对 size 处理，若无px则添加单位
const setFontSizeStr = fontSize => {
  return fontSize.includes('px') ? fontSize : `${fontSize}px`
}

// log 插入
const insertLogStatement = context => {
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

// 删除页面中全部 log
const deleteAllLog = context => {
  const deleteAllLogStatements = commands.registerCommand(
    'consoleLog.deleteAllLogStatements',
    () => {
      const editor = window.activeTextEditor
      if (!editor) {
        showErrorMessage()
        return
      }

      const document = editor.document
      const documentText = editor.document.getText()
      const logStatements = getAllLogStatements(document, documentText)
      deleteFoundLogStatements(logStatements)
    }
  )
  context.subscriptions.push(deleteAllLogStatements)
}

export const activate = context => {
  checkForUpdate()
  insertLogStatement(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
