import { getSettingValue } from '../getSettingValue'

// 拼接模板
export const tempJoin = (temp, styles, selectVariable, defaultType = 'log') => {
  const wrapSelectVariable = getWrapSelectVariable(selectVariable)

  // 支持 console 的所有类型，若不在支持范围则默认为 log
  const consoleType = [
    'log',
    'warn',
    'error',
    'info',
    'table',
    'count',
    'group',
    'groupCollapsed'
  ].includes(defaultType)
    ? defaultType
    : 'log'

  if (styles) {
    return `console.${consoleType}('%c ${temp}', '${styles}', ${wrapSelectVariable})`
  } else if (temp) {
    return `console.${consoleType}('${temp}', ${wrapSelectVariable})`
  }
  return `console.${consoleType}(${wrapSelectVariable})`
}

// 包装选择的变量
export const getWrapSelectVariable = selectVariable => {
  const wrapSelectVariable = getSettingValue('Wrap Select Variable') + ''
  // 若未配置，则直接返回选择的变量
  if (wrapSelectVariable === '#' || wrapSelectVariable === '') {
    return selectVariable
  }
  // 变量替换 #
  return wrapSelectVariable.replace('#', selectVariable)
}
