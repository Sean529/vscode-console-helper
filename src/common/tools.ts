import { getSettingValue } from "./getSettingValue"

/**
 * const randomColorCode = getRandomAnsiColorCode()
 * console.log(`${randomColorCode}  AT 🥝 result 🥝-35  \x1b[0m`, "sss")
 */
export const getRandomAnsiColorCode = () => {
  // ANSI 色彩代码数组
  const colors = [
    "\x1b[30m",
    "\x1b[31m",
    "\x1b[32m",
    "\x1b[33m",
    "\x1b[34m",
    "\x1b[35m",
    "\x1b[36m", // 基本前景色
    "\x1b[90m",
    "\x1b[91m",
    "\x1b[92m",
    "\x1b[93m",
    "\x1b[94m",
    "\x1b[95m",
    "\x1b[96m", // 亮前景色
    "\x1b[40m",
    "\x1b[41m",
    "\x1b[42m",
    "\x1b[43m",
    "\x1b[44m",
    "\x1b[45m",
    "\x1b[46m", // 基本背景色
    "\x1b[38;5;196m",
    "\x1b[38;5;202m",
    "\x1b[38;5;208m",
    "\x1b[38;5;214m",
    "\x1b[38;5;220m", // 256 色前景色
    "\x1b[48;5;196m",
    "\x1b[48;5;202m",
    "\x1b[48;5;208m",
    "\x1b[48;5;214m",
    "\x1b[48;5;220m", // 256 色背景色
    "\x1b[38;2;255;0;0m",
    "\x1b[38;2;0;255;0m",
    "\x1b[38;2;0;0;255m",
    "\x1b[38;2;255;255;0m",
    "\x1b[38;2;255;0;255m", // TrueColor 前景色
    "\x1b[48;2;255;0;0m",
    "\x1b[48;2;0;255;0m",
    "\x1b[48;2;0;0;255m",
    "\x1b[48;2;255;255;0m",
    "\x1b[48;2;255;0;255m", // TrueColor 背景色
  ]

  // 生成一个随机索引
  const randomIndex = Math.floor(Math.random() * colors.length)

  // 返回随机的 ANSI 色彩代码
  return colors[randomIndex]
}

// 获取用户的配置，终端随机颜色
export const getRandomAnsiColorCodeConfig = () => {
  return getSettingValue("Random Color In Terminal")
}
