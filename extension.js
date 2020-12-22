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
    default: '#bf2c9f',
    description: '字体颜色'
  },
  {
    name: 'Color Bg',
    default: 'pink',
    description: '背景颜色'
  },
  {
    name: 'Font Size',
    default: '13px',
    description: '字号大小'
  },
  {
    name: 'Show Semi',
    default: false,
    description: '末尾是否加分号'
  }
]

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

// log 插入
const insertLogStatement = context => {
  const insert = vscode.commands.registerCommand(
    'consoleHelper.insertLogStatement',
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
            const str = text.replace(/'|"/g, '')
            const fontSize = getSettingValue('Font Size')
            const colorBg = getSettingValue('Color Bg')
            const color = getSettingValue('Color')
            const prefixLogo = getSettingValue('Prefix Logo')
            const isShowSemi = getSettingValue('Show Semi')
            let logToInsert = ''
            if (prefixLogo) {
              const showSemi = `console.log('%c${prefixLogo}-[ ${str} ]: ', 'color: ${color}; background: ${colorBg}; font-size: ${fontSize};', ${text});`
              const notShowSemi = `console.log('%c${prefixLogo}-[ ${str} ]: ', 'color: ${color}; background: ${colorBg}; font-size: ${fontSize};', ${text})`
              logToInsert = isShowSemi ? showSemi : notShowSemi
            } else {
              const showSemi = `console.log('%c[ ${str} ]: ', 'color: ${color}; background: ${colorBg}; font-size: ${fontSize};', ${text});`
              const notShowSemi = `console.log('%c[ ${str} ]: ', 'color: ${color}; background: ${colorBg}; font-size: ${fontSize};', ${text})`
              logToInsert = isShowSemi ? showSemi : notShowSemi
            }
            insertText(logToInsert)
          })
      }
    }
  )

  context.subscriptions.push(insert)
}

const getSettingValue = name => {
  const value = vscode.workspace.getConfiguration().get(`consoleHelper.${name}`)
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
    'consoleHelper.deleteAllLogStatements',
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
