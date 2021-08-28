import { getSettingValue } from '../index'
// 根据配置处理单双引号
export const quotesFormat = logToInsert => {
  const selectQuotes = getSettingValue('Select Quotes') // 获取单双引号用配置信息
  return selectQuotes === 'single'
    ? logToInsert
    : logToInsert.split("'").join('"')
}
