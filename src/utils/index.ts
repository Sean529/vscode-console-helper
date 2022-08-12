// 对象深度克隆
export const cloneDeep = (obj) => {
  const copy = Object.create(Object.getPrototypeOf(obj))
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    Object.defineProperty(copy, name, desc)
  })
  return copy
}

// 判断对象是否为空
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

// 把对象的空值删除
export const filterEmptyObj = (obj) => {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}

// 对 size 处理，若无px则添加单位
export const setFontSizeStr = (fontSize) => {
  return fontSize.includes('px') ? fontSize : `${fontSize}px`
}

// 亮色
const LIGHT_COLOR = 68

/**
 * @description: 调整颜色更亮更暗
 * @param {string} color 六位十六进制颜色
 * @param {number} range 正负数决定颜色更改
 * @return {string} new color
 */
export const adjustColor = (color, range = LIGHT_COLOR) => {
  let newColor = '#'
  for (let i = 0; i < 3; i++) {
    const hxStr = color.substr(i * 2 + 1, 2)
    let val = parseInt(hxStr, 16)
    val += range
    if (val < 0) val = 0
    else if (val > 255) val = 255
    newColor += val.toString(16).padStart(2, '0')
  }
  return newColor
}
