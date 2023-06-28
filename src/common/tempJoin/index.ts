// 拼接模板
export const tempJoin = (temp, styles, selectVariable, defaultType = "log") => {
  let consoleType = "log"
  if (defaultType === "warn") {
    consoleType = "warn"
  }
  if (defaultType === "error") {
    consoleType = "error"
  }

  if (styles) {
    return `console.${consoleType}('%c ${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.${consoleType}('${temp}', ${selectVariable})`
  }
  return `console.${consoleType}(${selectVariable})`
}
