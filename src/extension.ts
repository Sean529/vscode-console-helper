import { window, Range, commands, workspace } from 'vscode'
import checkForUpdate from './update'
import {
  SETTINGS_LIST,
  PLACEHOLDER,
  NUMBER_ARGUMENT,
  STYLES
} from './Enum/Enum'

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

// 格式化前缀
const prefixFormat = ({
  isShowLineCount,
  selectFileName,
  fileName,
  lineNumber,
  selectVariable,
  prefixLogo,
  statement
}) => {
  prefixLogo = joinLineCount({
    prefixLogo,
    isShowLineCount,
    lineNumber,
    fileName,
    selectFileName
  })
  if (!prefixLogo || prefixLogo === '#') {
    // '' / '#'
    // 未填写或填写的是 #
    return `${selectVariable}`
  } else if (prefixLogo.includes('#')) {
    // 正确填写，替换占位符
    return prefixLogo.replace(PLACEHOLDER, selectVariable)
  } else if (!prefixLogo.includes('#')) {
    // 有填写且未填写占位符
    return prefixLogo
  }
  return statement
}

const joinLineCount = ({
  prefixLogo,
  isShowLineCount,
  lineNumber,
  fileName,
  selectFileName
}) => {
  let template = prefixLogo
  if (isShowLineCount) {
    if (!prefixLogo || prefixLogo === '#') {
      template = `${lineNumber}`
    } else {
      template = `${prefixLogo}-${lineNumber}`
    }
  }
  if (selectFileName !== '不打印' || !selectFileName) {
    fileName = switchFileName(selectFileName, fileName)
    if (template) {
      template = `${template}-「${fileName}」`
    } else {
      template = `「${fileName}」`
    }
  }
  return template
}

const switchFileName = (selectFileName, fileName) => {
  switch (selectFileName) {
    case '打印文件名':
      // 完成
      return fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
    case '打印文件名+文件后缀名':
      // 完成
      return fileName.replace(/(.*\/)*([^.]+)/gi, '$2')
    case '打印完整路径':
      // 完成
      return fileName
  }
}

// 对象深度克隆
const cloneDeep = obj => {
  const copy = Object.create(Object.getPrototypeOf(obj))
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    Object.defineProperty(copy, name, desc)
  })
  return copy
}

// 判断对象是否为空
const isEmpty = obj => {
  return Object.keys(obj).length === 0
}

// 把对象的空值删除
const filterEmptyObj = obj => {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}

// 样式对象转为字符串
const stylesTransform = customStyles => {
  // 将对象中为空的属性删除，参数是引用类型，避免改变实参，这了进行深度 clone
  const styles = filterEmptyObj(cloneDeep(customStyles))
  if (isEmpty(styles)) {
    return ''
  }

  let styleTemp = ''
  for (const key in styles) {
    const styleKey = STYLES[`${key}`]
    const styleValue = styles[key]
    styleTemp += `${styleKey}:${styleValue}; `
  }
  styleTemp = styleTemp.substring(0, styleTemp.length - 1) // 移除末尾的空格
  return styleTemp
}

// 拼接模板
const tempJoin = (temp, styles, selectVariable) => {
  if (styles) {
    return `console.log('%c ${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.log('${temp}', ${selectVariable})`
  }
  return `console.log(${selectVariable})`
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
          console.log('%c 「extension.ts」-342-AT-[ fileName ]', 'font-size:13px; background:#de4307; color:#f6d04d;', fileName)
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
          insertText(logToInsert)
        })
      }
    }
  )
  context.subscriptions.push(insert)
}

const getSettingValue = name => {
  const value = workspace.getConfiguration().get(`consoleLog.${name}`)
  const len = SETTINGS_LIST.length
  for (let i = 0; i < len; i++) {
    const item = SETTINGS_LIST[i]
    if (item.name === name) {
      return value || item.default
    }
  }
  return ''
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
