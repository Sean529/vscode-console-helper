# console-helper（日志小助手）

**Console Helper** — 强大的日志辅助工具，让调试开发更轻松高效。

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/AT-9420.console-helper.svg?label=Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/AT-9420.console-helper.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)
[![Rating](https://img.shields.io/visual-studio-marketplace/stars/AT-9420.console-helper.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)

## Feature

### 核心功能

- 快捷输出日志
  - 光标位置一键打印
  - 选中变量快速打印
  - 支持多种日志函数（如 console.log、console.debug、DEBUG_LOG、print 等）
- 快捷输出简单日志
- 一键清理日志

### 日志样式

- 自定义前缀标识
- 显示行号和文件名
- 字体样式配置
  - 自定义颜色
  - 自定义背景色
  - 自定义字号
- 随机颜色效果
  - 浏览器控制台
  - 终端显示
- 变量格式化处理
  - 自动对复杂对象进行格式化，避免出现 `[object Object]` 这样难以阅读的输出

### 其他配置

- 日志参数数量（1-3 个参数）
- 代码片段快捷方式
- 引号类型（单/双引号）
- 分号配置（有/无）

### 快捷键设置

#### 查看当前快捷键

打开快捷键设置面板：

- macOS: `cmd` + `k`, `cmd` + `s`
- Windows: `ctrl` + `k`, `ctrl` + `s`

#### 自定义快捷键

1. 打开快捷键设置面板
2. 搜索 `consoleLog`
3. 设置你喜欢的快捷键组合：
   - macOS: 默认为 `cmd` + `shift` + `l`，推荐改为 `cmd` + `l`
   - Windows: 默认为 `ctrl` + `l`

## Usages

### 快速打印选中变量

> 一键生成带颜色的日志语句，自动获取变量名并添加行号信息

使用方式：

1. 选中要打印的变量
2. 按下快捷键：
   - macOS: `cmd` + `shift` + `l`
   - Windows: `ctrl` + `l`

<img width="600" alt="选中变量打印演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_select_insert.gif">

### 随机颜色

> 为每条日志设置不同的颜色，让输出更醒目易读

设置方法：

1. 打开 VSCode 设置（Code > 首选项 > 设置）
2. 搜索 "日志小助手"
3. 勾选 "是否随机颜色" 选项

效果如下：

<img width="600" alt="随机颜色演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/20220812_randomColor.gif">

### 终端日志着色

> 在终端中也能使用随机颜色功能，让日志更加醒目

设置方法：

1. 打开 VSCode 设置（Code > 首选项 > 设置）
2. 搜索 "日志小助手"
3. 勾选 "Random Color In Terminal" 选项

效果展示：
<img width="600" alt="终端日志着色演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2024_07_08_random_color_in_terminal.png">

### 快捷输出简单日志

> 快速插入一个空的日志语句，光标自动定位到输入位置

使用方式：

1. 将光标定位到目标行
2. 按下对应快捷键：
   - macOS: `cmd` + `y`
   - Windows: `ctrl` + `shift` + `l`
3. 输入变量名即可

示例：插入 `console.log('', )`

<img width="600" alt="简单日志演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/20220217_insert_simple.gif">

### 一键清理日志

> 快速删除当前文件中的所有日志语句，操作后会显示删除数量

使用方式：

1. 在需要清理的文件中
2. 按下对应快捷键：
   - macOS: `cmd` + `shift` + `d`
   - Windows: `ctrl` + `shift` + `d`
3. 右下角会显示删除的日志数量

<img width="600" alt="删除日志演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_delete_all_log.gif">

#### 自定义要删除的日志函数

可以指定需要删除的日志函数列表，方便批量清理特定类型的日志：

1. 打开设置，搜索 "日志小助手"
2. 找到 "Delete Log Functions" 配置项
3. 输入要删除的日志函数，多个函数用逗号分隔，例如：
   - `console.log,console.debug,console.info`
   - `debug.log,DEBUG_LOG,console.warn`

### 代码片段快捷方式

提供了多种代码片段，输入触发词后按 Tab 键即可使用：

1. 基础日志
   - 触发词：`clg` 或 `log`
   - 输出：`console.log('[ ] >', )`

<img width="600" alt="基础日志演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_snippet_log.gif">

2. 带样式的日志
   - 触发词：`clog`
   - 输出：带颜色和样式的日志语句
   - 默认样式：粉色背景，紫色文字

<img width="600" alt="带样式日志演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_snippet_clog.gif">

### 选择 console.log 参数数量

> 可以根据需要选择日志语句的参数个数，支持以下三种格式：

1. 单参数模式

   - 格式：`console.log(value)`
   - 示例：`console.log(data)`

2. 双参数模式（带标签）

   - 格式：`console.log('标签', value)`
   - 示例：`console.log('data', data)`

3. 三参数模式（带样式）
   - 格式：`console.log('标签', '样式', value)`
   - 示例：`console.log('data', 'color: #bf2c9f; background: pink;', data)`

设置方法：

1. 打开 VSCode 设置（Code > 首选项 > 设置）
2. 搜索 "日志小助手"
3. 选择期望的参数数量

### 自定义前缀标识

> 为日志添加独特的前缀标识，方便在控制台中快速定位和区分不同来源的日志

设置方法：

1. 打开 VSCode 设置（Code > 首选项 > 设置）
2. 搜索 "日志小助手"
3. 在 "Prefix" 配置项中输入你的标识，例如：
   - `[DEBUG]`
   - `[UserName]`
   - `[Module]`

效果示例：

```javascript
console.log("[DEBUG] data:", data)
console.log("[UserName] result:", result)
```

### 变量格式化处理

> 自动对复杂对象进行格式化，避免出现 `[object Object]` 这样难以阅读的输出

设置方法：

1. 打开 VSCode 设置（Code > 首选项 > 设置）
2. 搜索 "日志小助手"
3. 在 "Wrap Variable" 配置项中设置格式化方式：
   - `JSON.stringify(#)` - 转换为格式化的 JSON 字符串
   - `JSON.parse(JSON.stringify(#))` - 创建深拷贝并格式化

配置效果：

```javascript
// 原始输出
console.log(complexObject) // [object Object]

// 格式化后
console.log(JSON.stringify(complexObject)) // {"name": "example", "data": {...}}
```

<img width="600" alt="变量格式化处理演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2023_06_28_wrap_select_variable.png">

### 支持随机颜色在终端展示

在设置中勾选在终端中随机颜色

<img width="600" alt="支持随机颜色在终端展示演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2024_07_08_random_color_in_terminal.png">

### 自定义日志函数

> 可以自定义日志函数名称，支持各种格式的日志函数

在设置中配置 "Custom Log Function"，可以使用自定义的日志函数名称，例如：

- `console.log`（默认）
- `console.debug`
- `debug.log`
- `DEBUG_LOG`
- `LOG_DEBUG`
- `print`

配置后，插件会使用你设置的函数来打印日志，删除日志功能也会自动识别并删除这些自定义日志。

### 配置中心

所有功能都可以在 VSCode 设置中心统一配置：

1. 打开设置：
   - macOS: Code > 首选项 > 设置
   - Windows: 文件 > 首选项 > 设置
2. 搜索 "日志小助手" 查看所有配置项

<img width="600" alt="配置中心演示" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_settings.gif">

## 安装方法

1. 通过 VSCode 扩展商店安装：

   - 在扩展商店中搜索 `console-helper`
   - 或直接访问 [Marketplace](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)

2. 系统要求：
   - VSCode 版本 >= v1.51.0

## QA

### 快捷键无法使用？

可能原因：快捷键被其他插件或命令占用

解决方法：

1. 打开快捷键设置面板：
   - macOS: `cmd` + `k`, `cmd` + `s`
   - Windows: `ctrl` + `k`, `ctrl` + `s`
2. 搜索当前快捷键组合（如 `cmd` + `shift` + `l`）
3. 检查是否有冲突的命令
4. 选择处理方式：
   - 删除冲突命令的快捷键
   - 或为本插件设置新的快捷键

## 社区交流

### 加入微信群

方式一：扫描二维码

<img width="303" alt="微信群二维码" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_wechat_group.jpeg">

方式二：添加作者微信

- 微信号：`AT-0529`
- 备注：日志小助手

  <img width="303" alt="作者微信二维码" src="https://cdn.jsdelivr.net/gh/Sean529/at-pic-repo@master/consoleHelp/image/2021_01_27_wechat.jpeg">

### 支持项目

如果这个项目对您有帮助，欢迎：

- ⭐ 给项目点个 star
- 💡 分享使用心得
- 🐛 提交 issue 或 PR
- 👥 加入微信群交流

如果对您有帮助，给个 star 是对我最大的支持~

## Changelog

[CHANGELOG](./CHANGELOG.md)

## License

[LICENSE](./LICENSE)
