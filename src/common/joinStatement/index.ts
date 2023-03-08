import { window } from 'vscode'
import { setFontSizeStr } from '../../utils'
import { getCustomColor } from '../colorConfig/colorConfig'
import { getSettingValue } from '../getSettingValue'
import { NUMBER_ARGUMENT, prefixFormat, stylesTransform, tempJoin } from '../index'

// 语句末尾是否加分号
export const joinStatement = (data) => {
  return joinSemi(joinTemplateStr(data))
}

const joinSemi = (statement) => {
  const isShowSemi = getSettingValue('Show Semi')
  return isShowSemi ? `${statement};` : `${statement}`
}

const joinTemplateStr = ({ selectVariable, lineNumber }) => {
  const numberArgument = getSettingValue('Number Argument')
  const isShowLineCount = getSettingValue('Show LineNumber')
  const selectFileName = getSettingValue('Select FileName')
  const prefixLogo = getSettingValue('Prefix Logo')
  const fontSize = getSettingValue('Font Size')
  const defatltType = getSettingValue('Defatule Type')

  const fontSizeStr = setFontSizeStr(fontSize) // fontSize 的值
  const { colorBg, color } = getCustomColor()
  const { fileName } = window.activeTextEditor.document
  const customStyles = {
    fontSize: fontSizeStr,
    colorBg,
    color,
  }
  let statement = tempJoin('', '', selectVariable, '')
  const temp = prefixFormat({
    isShowLineCount,
    selectFileName,
    fileName,
    lineNumber,
    selectVariable,
    prefixLogo,
    statement,
  })
  if (numberArgument === NUMBER_ARGUMENT.twoArgument) {
    statement = tempJoin(temp, '', selectVariable, defatltType)
  } else if (numberArgument === NUMBER_ARGUMENT.threeArgument) {
    const styles = stylesTransform(customStyles)
    statement = tempJoin(temp, styles, selectVariable, defatltType)
  }

  return statement
}
