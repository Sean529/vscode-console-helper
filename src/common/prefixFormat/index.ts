import { PLACEHOLDER, getSettingValue } from '../index'
// 格式化前缀
export const prefixFormat = ({
  isShowLineCount,
  selectFileName,
  fileName,
  lineNumber,
  selectVariable,
  prefixLogo,
  statement
}) => {
  prefixLogo = joinLineCount({
    prefixLogo,
    isShowLineCount,
    lineNumber,
    fileName,
    selectFileName
  })
  if (!prefixLogo || prefixLogo === '#') {
    // '' / '#'
    // 未填写或填写的是 #
    return `${selectVariable}`
  } else if (prefixLogo.includes('#')) {
    // 若是双引号，则变量要改为单引号；若是单引号，则变量要改为双引号
    const selectQuotes = getSettingValue('Select Quotes') // 获取单双引号用配置信息
    if (selectQuotes === 'double') {
      selectVariable = selectVariable.replace(/\"/g, "'")
      // 若是双引号，则变量要改为单引号
    } else {
      // 若是单引号，则变量要改为双引号
      selectVariable = selectVariable.replace(/\'/g, '"')
    }
    // 正确填写，替换占位符
    return prefixLogo.replace(PLACEHOLDER, selectVariable)
  } else if (!prefixLogo.includes('#')) {
    // 有填写且未填写占位符
    return prefixLogo
  }
  return statement
}

const joinLineCount = ({
  prefixLogo,
  isShowLineCount,
  lineNumber,
  fileName,
  selectFileName
}) => {
  let template = prefixLogo
  if (isShowLineCount) {
    template =
      !prefixLogo || prefixLogo === '#'
        ? `${lineNumber}`
        : `${prefixLogo}-${lineNumber}`
  }
  if (selectFileName !== '不打印' || !selectFileName) {
    fileName = switchFileName(selectFileName, fileName)
    template = template ? `${template}-「${fileName}」` : `「${fileName}」`
  }
  return template
}

const switchFileName = (selectFileName, fileName) => {
  switch (selectFileName) {
    case '打印文件名':
      // 完成
      return winPath(fileName.replace(/(.*\/)*([^.]+).*/gi, '$2'))
    case '打印文件名+文件后缀名':
      // 完成
      return winPath(fileName.replace(/(.*\/)*([^.]+)/gi, '$2'))
    case '打印文件名+后缀名+上级目录':
      // 完成
      return winPath(fileName.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'))
    case '打印完整路径':
      // 完成
      return winPath(fileName)
  }
}

// windows 路径 '\' 转换为 '/'
const winPath = path => {
  return path.replace(/\\/g, '/')
}
