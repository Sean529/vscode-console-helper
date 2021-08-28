import {
  NUMBER_ARGUMENT,
  prefixFormat,
  stylesTransform,
  tempJoin
} from '../index'

// 语句末尾是否加分号
export const joinStatement = data => {
  const { isShowSemi } = data
  return joinSemi(isShowSemi, joinTemplateStr(data))
}

const joinSemi = (isShowSemi, statement) => {
  return isShowSemi ? `${statement};` : `${statement}`
}

const joinTemplateStr = ({
  selectVariable,
  prefixLogo,
  numberArgument,
  customStyles,
  isShowLineCount,
  selectFileName,
  fileName,
  lineNumber
}) => {
  let statement = tempJoin('', '', selectVariable)
  const temp = prefixFormat({
    isShowLineCount,
    selectFileName,
    fileName,
    lineNumber,
    selectVariable,
    prefixLogo,
    statement
  })
  if (numberArgument === NUMBER_ARGUMENT.twoArgument) {
    statement = tempJoin(temp, '', selectVariable)
  } else if (numberArgument === NUMBER_ARGUMENT.threeArgument) {
    const styles = stylesTransform(customStyles)
    statement = tempJoin(temp, styles, selectVariable)
  }
  return statement
}
