import { adjustColor } from '../../utils'
import { getSettingValue } from '../getSettingValue'

// 获取颜色，若开启随机颜色，则随机生成颜色
export const getCustomColor = () => {
  let colorBg = getSettingValue('Color Bg')
  let color = getSettingValue('Color')

  if (getRandomColorConfig()) {
    colorBg = getRandomColor()
    color = getRandomColor(colorBg)
  }
  return { colorBg, color }
}

// 获取用户配置 是否开启随机颜色
const getRandomColorConfig = () => {
  return getSettingValue('Random Color')
}

// 获取随机颜色
const getRandomColor = (color = '') => {
  if (color) {
    return generateColor2Color(color)
  }
  return generateRandomColor()
}

// 生成随机颜色
const generateRandomColor = (): string => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  return randomColor
}

// 根据字体颜色生成颜色
const generateColor2Color = (color): string => {
	// 根据传入的颜色生成更亮的颜色
  return adjustColor(color)
}
