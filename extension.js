const vscode = require('vscode')

// 执行 log 写入
const insertText = val => {
  // Todo: 不理解
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    showErrorMessage()
    return
  }
  // Todo: 不理解
  const { selection } = editor

  // Todo: 不理解
  const range = new vscode.Range(selection.start, selection.end)
  // Todo: 不理解
  editor.edit(editBuilder => {
    // Todo: 不理解
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
  const logRegex = /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?/g
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

// 删除所有找到的 log 语句
const deleteFoundLogStatements = (workspaceEdit, docUri, logs) => {
  logs.forEach(log => {
    workspaceEdit.delete(docUri, log)
  })

  vscode.workspace.applyEdit(workspaceEdit).then(() => {
    // 删除成功后提示
    if (logs.length) {
      vscode.window.showInformationMessage(
        `${logs.length} console.logs deleted`
      )
    } else {
      vscode.window.showInformationMessage(`${logs.length} console.log deleted`)
    }
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

      // Todo: 不理解
      const { selection } = editor
      // Todo: 不理解
      const text = editor.document.getText(selection) // 选择的字符
      if (text) {
        // 将选择的字符美化后打印
        vscode.commands
          .executeCommand('editor.action.insertLineAfter')
          .then(() => {
            const str = text.replace(/'|"/g, '')
            const logToInsert = `console.log('%c[ ${str} ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', ${text})`
            insertText(logToInsert)
          })
      }
    }
  )

  context.subscriptions.push(insert)
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

      const workspaceEdit = new vscode.WorkspaceEdit()

      const logStatements = getAllLogStatements(document, documentText)

      deleteFoundLogStatements(workspaceEdit, document.uri, logStatements)
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
