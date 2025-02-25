// TODO: 应该可以获取配置信息，后期可以改为从配置信息中获取变量名
export const SETTINGS_LIST = [
  {
    name: "Prefix Logo",
    default: "",
    description: "前缀标识",
  },
  {
    name: "Color",
    default: "",
    description: "字体颜色",
  },
  {
    name: "Color Bg",
    default: "",
    description: "背景颜色",
  },
  {
    name: "Font Size",
    default: "",
    description: "字号大小",
  },
  {
    name: "Show Semi",
    default: false,
    description: "末尾是否加分号",
  },
  {
    name: "Show LineNumber",
    default: false,
    description: "是否显示行号",
  },
  {
    name: "Select FileName",
    default: "不打印",
    description: "是否打印文件名",
  },
  {
    name: "Number Argument",
    default: "console.log 接收 2 个参数",
    description: "console.log 接收的变量数量",
  },
  {
    name: "Select Quotes",
    default: "single",
    description: "请选择单引号或双引号",
  },
  {
    name: "Random Color",
    default: false,
    description: "是否随机颜色",
  },
  {
    name: "Wrap Select Variable",
    default: "#",
    description: "包装选择的变量，例如：JSON.stringify(#)",
  },
  {
    name: "Delete Log Functions",
    default: "console.log,console.debug,console.info",
    description: "要删除的日志函数列表，多个函数用逗号隔开。例如：console.log,debug.log,DEBUG_LOG",
  },
  {
    name: "Random Color In Terminal",
    default: false,
    description: "是否在终端中随机颜色，权重比 Random Color 高",
  },
  {
    name: "Custom Log Function",
    default: "console.log",
    description: "自定义 console.log 函数",
  },
  {
    name: "Cursor Position",
    default: "end",
    description: "插入console.log后光标的位置：end=最后一个括号后，inside=最后一个括号内，after_prefix=第一个括号后，none=保持不动",
  },
]

// 变量占位符
export const PLACEHOLDER = "#"

// 用户选择 console.log 的参数个数
export const NUMBER_ARGUMENT = {
  oneArgument: "console.log 接收 1 个参数",
  twoArgument: "console.log 接收 2 个参数",
  threeArgument: "console.log 接收 3 个参数",
}

// 样式 key
export const STYLES = {
  color: "color",
  colorBg: "background",
  fontSize: "font-size",
}

// 光标位置选项类型
export type CursorPosition = "end" | "inside" | "none" | "before_first_paren"

// 光标位置选项
export const CURSOR_POSITIONS: Record<CursorPosition, CursorPosition> = {
  none: "none", // 保持不动
  end: "end", // 最后一个括号后
  inside: "inside", // 最后一个括号内
  before_first_paren: "before_first_paren", // 光标位于第一个括号前
}
