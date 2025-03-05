import { getSettingValue } from "../getSettingValue"
import { window } from "vscode"
import { getRandomAnsiColorCode, getRandomAnsiColorCodeConfig } from "../tools"

// 根据语言拼不同的模板
const getTempByLanguage = (temp, styles, selectVariable) => {
  const editor = window.activeTextEditor
  const document = editor.document
  const languageId = document.languageId
  const wrapSelectVariable = getWrapSelectVariable(selectVariable)

  if (languageId === "python") {
    return pythonTemp(temp, styles, wrapSelectVariable)
  } else {
    return jsTemp(temp, styles, wrapSelectVariable)
  }
}

// python 模板
const pythonTemp = (_temp, _styles, wrapSelectVariable) => {
  return `print(${wrapSelectVariable})`
}

// js 模板
const jsTemp = (temp, styles, wrapSelectVariable) => {
  let result = ""
  let customLogFunction = getSettingValue("Custom Log Function") || "console.log"

  // 终端随机颜色 - 权重比后面的都高
  if (getRandomAnsiColorCodeConfig()) {
    const randomColorCode = getRandomAnsiColorCode()
    return `${customLogFunction}('${randomColorCode} ${temp} \x1b[0m', ${wrapSelectVariable})`
  }

  if (styles) {
    result = `${customLogFunction}('%c ${temp}', '${styles}', ${wrapSelectVariable})`
  } else if (temp) {
    result = `${customLogFunction}('${temp}', ${wrapSelectVariable})`
  } else {
    result = `${customLogFunction}(${wrapSelectVariable})`
  }
  return result
}

// 拼接 console 模板
export const tempJoin = (temp, styles, selectVariable) => {
  return getTempByLanguage(temp, styles, selectVariable)
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
