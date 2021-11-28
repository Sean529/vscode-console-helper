import { joinStatement, quotesFormat } from '..'

export const formatVar = (selectVariable, lineNumber) => {
  // 获取配置信息
  const logToInsert = joinStatement({
    selectVariable,
    lineNumber
  })
  // 根据配置处理单双引号
  return quotesFormat(logToInsert)
}
