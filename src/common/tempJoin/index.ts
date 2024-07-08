import { getSettingValue } from "../getSettingValue"
import { window } from "vscode"
import { getRandomAnsiColorCode, getRandomAnsiColorCodeConfig } from "../tools"

// 根据语言拼不同的模板
const getTempByLanguage = (temp, styles, selectVariable, defaultType = "log") => {
  const editor = window.activeTextEditor
  const document = editor.document
  const languageId = document.languageId
  const wrapSelectVariable = getWrapSelectVariable(selectVariable)

  if (languageId === "python") {
    return pythonTemp(temp, styles, wrapSelectVariable)
  } else {
    return jsTemp(temp, styles, wrapSelectVariable, defaultType)
  }
}

// python 模板
const pythonTemp = (_temp, _styles, wrapSelectVariable) => {
  return `print(${wrapSelectVariable})`
}

// js 模板
const jsTemp = (temp, styles, wrapSelectVariable, defaultType = "log") => {
  // 支持 console 的所有类型，若不在支持范围则默认为 log
  const consoleType = ["log", "warn", "error", "info", "table", "count", "group", "groupCollapsed"].includes(defaultType)
    ? defaultType
    : "log"

  let result = ""

  // 终端随机颜色 - 权重比后面的都高
  if (getRandomAnsiColorCodeConfig()) {
    const randomColorCode = getRandomAnsiColorCode()
    return `console.${consoleType}('${randomColorCode} ${temp} \x1b[0m', ${wrapSelectVariable})`
  }

  if (styles) {
    result = `console.${consoleType}('%c ${temp}', '${styles}', ${wrapSelectVariable})`
  } else if (temp) {
    result = `console.${consoleType}('${temp}', ${wrapSelectVariable})`
  } else {
    result = `console.${consoleType}(${wrapSelectVariable})`
  }
  return result
}

// 拼接 console 模板
export const tempJoin = (temp, styles, selectVariable, defaultType = "log") => {
  return getTempByLanguage(temp, styles, selectVariable, defaultType)
}

// 包装选择的变量
export const getWrapSelectVariable = (selectVariable) => {
  const wrapSelectVariable = getSettingValue("Wrap Select Variable") + ""
  // 若未配置，则直接返回选择的变量
  if (wrapSelectVariable === "#" || wrapSelectVariable === "") {
    return selectVariable
  }
  // 变量替换 #
  return wrapSelectVariable.replace("#", selectVariable)
}
