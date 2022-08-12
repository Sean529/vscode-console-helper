# console-helper（日志小助手）

**console helper** — 在代码中快速输出 console.log 的插件。

- 快捷键一键输出 log
- 支持自定义 log 样式

### 将选中的变量打印

> 选中变量后按下快捷键，会在代码下方插入一行带颜色的 `console` 语句

快捷方式：

- macOS: `cmd` + `shift` + `l`
- Windows: `ctrl` + `l`

![select-insert](https://at529.gitee.io/public-static/static/image/2021-01-27-select-insert.gif)

## Feature

- 快捷输出 log
  - 光标位置按下快捷键打印输出
  - 选中单词打印选中单词
- 快捷输出简单 log
- 快捷删除当前页面中所有 log
- 支持显示行号
- 自定义前缀标识
- 自定义字体颜色
- 自定义背景颜色
- 自定义字号大小
- 支持显示文件名
- 末尾是否分号(默认无分号)
- console.log 的参数数量配置
- 代码片段方式
- 单引号或双引号配置
- 是否开启随机颜色

## setting

> 快速打开键盘快捷方式(快捷键)

- macOS: `cmd` + `k`, `cmd` + `s`
- Windows: `ctrl` + `k`, `ctrl` + `s`

> 修改快捷绑定(教程)

- macOS: Code > 首选项 > 键盘快捷方式 > 输入 **consoleLog**，将默认 **cmd + shift + l** 改为习惯的快捷键即可，推荐使用 **cmd + l**。
- Windows: 文件 > 首选项 > 键盘快捷方式 > 输入 **consoleLog**，将默认 **ctrl + l** 改为习惯的快捷键即可。

## Usages

### 随机颜色

> 打印的每条 log 都会有不同的颜色

开启方式：进入 vscode 设置，搜索**日志小助手**, 勾选**否随机颜色**复选框。效果如下：
![randomColor](https://at529.gitee.io/public-static/static/image/20220812-randomColor.gif)


### 快捷输出简单 log

> 在当前行输出 `console.log('', )` 语句，光标聚焦在输入位置，输入变量即可。

快捷方式：

- macOS: `cmd` + `y`
- Windows: `ctrl` + `shift` + `l`

![insert-simple](https://at529.gitee.io/public-static/static/image/20220217-insert-simple.gif)

### 快捷删除当前页面中所有 log

> 删除页面上所有 `log` ，删除后窗口右下角会提示一共删除了几条 `console.log` 语句

快捷方式：

- macOS: `cmd` + `shift` + `d`
- Windows: `ctrl` + `shift` + `d`

![delete-all-log](https://at529.gitee.io/public-static/static/image/2021-01-27-delete-all-log.gif)

### 代码片段

- `clg` or `log` 输出 `console.log('[ ] >', )`

![snippet-log](https://at529.gitee.io/public-static/static/image/2021-01-27-snippet-log.gif)

- `clog` 输出 `console.log('%c [ ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '')`

![snippet-clog](https://at529.gitee.io/public-static/static/image/2021-01-27-snippet-clog.gif)

### 选择 console.log 参数数量

> 配置 console.log 的参数数量

首先打开配置入口

- macOS: Code > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。
- Windows: 文件 > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。

各个选项以 AT 作为变量示例：

- 选择 [^console.log 接收 1 个参数] 输将会在页面上出 **console.log(AT)**
- 选择 [^console.log 接收 2 个参数] 输将会在页面上出 **console.log('AT', AT)**
- 选择 [^console.log 接收 3 个参数] 输将会在页面上出 **console.log('AT', 'color: #bf2c9f; background: pink; font-size: 13px; ', AT)**

### 配置前缀标识

> 配置前缀标识可以在控制台中，更快速的找到你的日志，唯一标识可区分是谁的日志

配置 demo 已在配置说明中描述，快去配置专属于你的前缀吧

### 配置项

> 自定义小助手 console

快捷方式：

- macOS: Code > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。
- Windows: 文件 > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。

![settings](https://at529.gitee.io/public-static/static/image/2021-01-27-settings.gif)

## Install

安装插件：[VisualStudio - Marketplace](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)，VSCode 最低版本要求： `v1.51.0+`

## QA

为什么我的不生效？

> 亲，可能是您的快捷键被占用了~
> 请打开键盘快捷方式列表，查看您的快捷键是否被占用，删除占用的命令或修改 consoleLog 绑定的快捷键即可，具体的操作如下：

在键盘快捷方式列表，输入被占用的快捷方式例如 **cmd + shift + l** ，右键选择删除或修改其他命令。

## 交流群

扫码加群:

<img style="display: block" width="303" alt="微信群" src="https://at529.gitee.io/public-static/static/image/2021-01-27-wechat-group.jpeg">

若扫码进不去，可加微信拉入 **console helper 日志小助手群**：

<img style="display: block" width="303" alt="微信号" src="https://at529.gitee.io/public-static/static/image/2021-01-27-wechat.jpeg">

或通过微信号： `AT-0529` 加好友，备注：**日志小助手**

**如果对您有帮助，给个 star 是对我最大的支持~**

## Changelog

[CHANGELOG](./CHANGELOG.md)

## License

[LICENSE](./LICENSE)
