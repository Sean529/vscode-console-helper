import { filterEmptyObj, cloneDeep, isEmpty } from '../../utils'
import { STYLES } from '../index'
// 样式对象转为字符串
export const stylesTransform = customStyles => {
  // 将对象中为空的属性删除，参数是引用类型，避免改变实参，这了进行深度 clone
  const styles = filterEmptyObj(cloneDeep(customStyles))
  if (isEmpty(styles)) {
    return ''
  }

  let styleTemp = ''
  for (const key in styles) {
    const styleKey = STYLES[`${key}`]
    const styleValue = styles[key]
    styleTemp += `${styleKey}:${styleValue}; `
  }
  styleTemp = styleTemp.substring(0, styleTemp.length - 1) // 移除末尾的空格
  return styleTemp
}
