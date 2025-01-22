import { window, Range, commands } from "vscode"
import { getSettingValue, showErrorMessage } from "../index"

// 删除页面中全部 log
export const deleteAllLog = (context) => {
  const deleteAllLogStatements = commands.registerCommand("consoleLog.deleteAllLogStatements", () => {
    const editor = window.activeTextEditor
    if (!editor) {
      showErrorMessage()
      return
    }

    const document = editor.document
    const documentText = editor.document.getText()
    const logStatements = getAllLogStatements(document, documentText)
    deleteFoundLogStatements(logStatements)
  })
  context.subscriptions.push(deleteAllLogStatements)
}

// 获取全部 log 语句
const getAllLogStatements = (document, documentText) => {
  const logStatements = []
  let logFunctions = getSettingValue("Delete Log Functions")

  // 如果logFunctions类型是 boolean 则转换成字符串
  if (typeof logFunctions === "boolean") {
    logFunctions = logFunctions.toString()
  }

  // 去除前后空格
  logFunctions = logFunctions.trim()

  // 将配置的函数转换为数组
  let logFunctionsArr = logFunctions.split(",").map((f) => f.trim())

  // 默认的 console 方法
  const defaultLogFunctions = [
    "console.log",
    "console.debug",
    "console.info",
    "console.warn",
    "console.error",
    "console.assert",
    "console.dir",
    "console.dirxml",
    "console.trace",
    "console.group",
    "console.groupEnd",
    "console.time",
    "console.timeEnd",
    "console.profile",
    "console.profileEnd",
    "console.count",
  ]

  // 使用配置的函数或默认函数
  const types = logFunctions ? logFunctionsArr : defaultLogFunctions

  // 转义特殊字符并构建正则模式
  const escapedTypes = types.map((type) => type.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const logRegex = new RegExp(`(${escapedTypes.join("|")})\\(([\\s\\S]*?)\\);?`, "g")

  let match
  while ((match = logRegex.exec(documentText))) {
    const matchRange = new Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length))
    if (!matchRange.isEmpty) logStatements.push(matchRange)
  }
  return logStatements
}

// 删除所有找到的 log 语句
const deleteFoundLogStatements = (logs) => {
  const editor = window.activeTextEditor
  const { document } = editor
  editor.edit((edit) => {
    logs.forEach((range) => {
      deleteFoundLogLines(range, edit, document)
    })
    deleteSuccessShowMessage(logs)
  })
}

// 执行删除 log 每行操作
const deleteFoundLogLines = (range, edit, document) => {
  for (let index = range.start.line; index <= range.end.line; index++) {
    edit.delete(document.lineAt(index).rangeIncludingLineBreak)
  }
}

// 删除成功提示信息
const deleteSuccessShowMessage = (logs) => {
  const message = logs.length ? `${logs.length} console.logs deleted` : `${logs.length} console.log deleted`
  window.showInformationMessage(message)
}
