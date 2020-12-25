const vscode = require('vscode')

// TODO: 应该可以获取配置信息，后期可以改为从配置信息中获取变量名
const SETTINGS_LIST = [
  {
    name: 'Prefix Logo',
    default: '',
    description: '前缀标识'
  },
  {
    name: 'Color',
    default: '',
    description: '字体颜色'
  },
  {
    name: 'Color Bg',
    default: '',
    description: '背景颜色'
  },
  {
    name: 'Font Size',
    default: '',
    description: '字号大小'
  },
  {
    name: 'Show Semi',
    default: false,
    description: '末尾是否加分号'
  },
  {
    name: 'Number Argument',
    default: 'console.log 接收 2 个参数',
    description: 'console.log 接收的变量数量'
  }
]

// 变量占位符
const PLACEHOLDER = '#'

// 用户选择 console.log 的参数个数
const NUMBER_ARGUMENT = {
  oneArgument: 'console.log 接收 1 个参数',
  twoArgument: 'console.log 接收 2 个参数',
  threeArgument: 'console.log 接收 3 个参数'
}

// 样式 key
const STYLES = {
  color: 'color',
  colorBg: 'background',
  fontSize: 'font-size'
}

// 执行 log 写入
const insertText = val => {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    showErrorMessage()
    return
  }
  const { selection } = editor

  const range = new vscode.Range(selection.start, selection.end)
  editor.edit(editBuilder => {
    editBuilder.replace(range, val)
  })
}

// 文件无权限提示
const showErrorMessage = () => {
  vscode.window.showErrorMessage('无法插入 log，文件没有编辑权限')
}

// 获取全部 log 语句
const getAllLogStatements = (document, documentText) => {
  const logStatements = []
  const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\(([\s\S]*?)\);?/g
  let match
  while ((match = logRegex.exec(documentText))) {
    const matchRange = new vscode.Range(
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
  vscode.window.showInformationMessage(message)
}

// 执行删除 log 每行操作
const deleteFoundLogLines = (range, edit, document) => {
  for (let index = range.start.line; index <= range.end.line; index++) {
    edit.delete(document.lineAt(index).rangeIncludingLineBreak)
  }
}

// 删除所有找到的 log 语句
const deleteFoundLogStatements = logs => {
  const editor = vscode.window.activeTextEditor
  const { document } = editor
  editor.edit(edit => {
    logs.forEach(range => {
      deleteFoundLogLines(range, edit, document)
    })
    deleteSuccessShowMessage(logs)
  })
}

// 格式化前缀
const prefixFormat = ({ selectVariable, prefixLogo, statement }) => {
  if (!prefixLogo || prefixLogo === '#') {
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
    return `console.log('%c${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.log('${temp}', ${selectVariable})`
  }
  return `console.log(${selectVariable})`
}

// 语句末尾是否加分号
const statementSemi = data => {
  const {
    selectVariable,
    isShowSemi,
    prefixLogo,
    numberArgument,
    customStyles
  } = data

  let statement = tempJoin('', '', selectVariable)
  const temp = prefixFormat({ selectVariable, prefixLogo, statement })
  if (numberArgument === NUMBER_ARGUMENT.twoArgument) {
    statement = tempJoin(temp, '', selectVariable)
  } else if (numberArgument === NUMBER_ARGUMENT.threeArgument) {
    const styles = stylesTransform(customStyles) // ''
    statement = tempJoin(temp, styles, selectVariable)
  }
  return isShowSemi ? `${statement};` : `${statement}`
}

// log 插入
const insertLogStatement = context => {
  const insert = vscode.commands.registerCommand(
    'consoleLog.insertLogStatement',
    () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        showErrorMessage()
        return
      }

      const { selection } = editor
      const text = editor.document.getText(selection) // 选择的字符
      if (text) {
        // 将选择的字符美化后打印
        vscode.commands
          .executeCommand('editor.action.insertLineAfter')
          .then(() => {
            const selectVariable = text.replace(/'|"/g, '') // 编辑器中选中的文本（要打印的变量）
            const fontSize = getSettingValue('Font Size')
            const colorBg = getSettingValue('Color Bg')
            const color = getSettingValue('Color')
            const prefixLogo = getSettingValue('Prefix Logo')
            const isShowSemi = getSettingValue('Show Semi')
            const numberArgument = getSettingValue('Number Argument')
            // TODO: 后期这里需要开放为用户自定义更多样式
            // 自定义样式
            const customStyles = {
              fontSize,
              colorBg,
              color
            }
            const logToInsert = statementSemi({
              selectVariable,
              isShowSemi,
              prefixLogo,
              numberArgument,
              customStyles
            })
            insertText(logToInsert)
          })
      }
    }
  )

  context.subscriptions.push(insert)
}

const getSettingValue = name => {
  const value = vscode.workspace.getConfiguration().get(`consoleLog.${name}`)
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
  const deleteAllLogStatements = vscode.commands.registerCommand(
    'consoleLog.deleteAllLogStatements',
    () => {
      const editor = vscode.window.activeTextEditor
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

const activate = context => {
  insertLogStatement(context)
  deleteAllLog(context)
}

const deactivate = () => {}

module.exports = {
  activate,
  deactivate
}
