// 拼接模板
export const tempJoin = (temp, styles, selectVariable, defatltType) => {
  let consoleType = 'log'
  if (defatltType === 'warn') {
    consoleType = 'warn'
  }
  if (defatltType === 'error') {
    consoleType = 'error'
  }

  if (styles) {
    return `console.${consoleType}('%c ${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.${consoleType}('${temp}', ${selectVariable})`
  }
  return `console.${consoleType}(${selectVariable})`
}
