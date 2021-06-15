import { PLACEHOLDER } from '../Enum/Enum'
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
    if (!prefixLogo || prefixLogo === '#') {
      template = `${lineNumber}`
    } else {
      template = `${prefixLogo}-${lineNumber}`
    }
  }
  if (selectFileName !== '不打印' || !selectFileName) {
    fileName = switchFileName(selectFileName, fileName)
    if (template) {
      template = `${template}-「${fileName}」`
    } else {
      template = `「${fileName}」`
    }
  }
  return template
}

const switchFileName = (selectFileName, fileName) => {
  switch (selectFileName) {
    case '打印文件名':
      // 完成
      return fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
    case '打印文件名+文件后缀名':
      // 完成
      return fileName.replace(/(.*\/)*([^.]+)/gi, '$2')
    case '打印完整路径':
      // 完成
      return fileName
  }
}
