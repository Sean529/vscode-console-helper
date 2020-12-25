# console-helper（日志小助手）

**console helper** — 旨在帮助开发人员编码时更快的输入/移除 log，搭配上醒目的主题，提高开发效率。

1. 迷你插件，**不占用内存资源，本插件不会让您的编辑器变得卡顿**
2. 一键搞定，告别手打 ~~log clg console.log() console.log('x', x) ...~~
3. 如果你跟我一样极(lan)客(ai)，那么这款扩展很适合你
4. 配置性强，可自由配置 log 样式

## setting

> 快速打开键盘快捷方式(快捷键)

* macOS: `cmd` + `k`,  `cmd` + `s`
* Windows: `ctrl` + `k`,  `ctrl` + `s`

> 修改快捷绑定(教程)

* macOS: Code > 首选项 > 键盘快捷方式 > 输入 **consoleLog**，将默认 **cmd + shift + l** 改为习惯的快捷键即可，推荐使用 **cmd + l**。
* Windows: 文件 > 首选项 > 键盘快捷方式 > 输入 **consoleLog**，将默认 **ctrl + l** 改为习惯的快捷键即可。

## Feature

* [x] 快捷输出 log
* [x] 快捷删除当前页面中所有 log
* [x] 支持代码片段
* [x] 自定义前缀标识
* [x] 自定义字体颜色
* [x] 自定义背景颜色
* [x] 自定义字号大小
* [x] 可配置末尾是否加分号(默认不加)
* [x] 支持选择 console.log 的参数数量

## Usages

### 将选中的变量打印

> 选中变量后按下快捷键，会在代码下方插入一行带颜色的 `console` 语句

![select-insert](https://qn.xiesz.com/AT/select-insert.gif)

快捷方式：

* macOS: `cmd` + `shift` + `l`
* Windows: `ctrl` + `l`

### 在当前行输出

> 在当前行输出 `console.log('[  ]', )` 语句，光标聚焦在输入位置，输入变量即可。

![insert](https://qn.xiesz.com/AT/insert.gif)

快捷方式：

* macOS: `cmd` + `shift` + `l`
* Windows: `ctrl` + `l`

### 快捷删除当前页面中所有 log

> 删除页面上所有 `log` ，删除后窗口右下角会提示一共删除了几条 `console.log` 语句

![delete-all-log](https://qn.xiesz.com/AT/delete-all-log.gif)

快捷方式：

* macOS: `cmd` + `shift` + `d`
* Windows: `ctrl` + `shift` + `d`

### 代码片段

* `clg` or `log` 输出 `console.log('[ ] >', )`

![snippet-log](https://qn.xiesz.com/AT/snippet-log.gif)

* `clog` 输出 `console.log('%c[ ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '')`

![snippet-clog](https://qn.xiesz.com/AT/snippet-clog.gif)

### 选择 console.log 入参数数量

> 配置 console.log 的参数数量

* macOS: Code > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。
* Windows: 文件 > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。

以 x 作为变量示例：

* 选择 [^console.log 接收 1 个参数] 输出 **console.log(x)**
* 选择 [^console.log 接收 2 个参数] 输出 **console.log('x', x)**
* 选择 [^console.log 接收 3 个参数] 输出 **console.log('x', 'color: #bf2c9f; background: pink; font-size: 13px; ', x)**

### 配置前缀标识

> 配置前缀标识可以在控制台中，更快速的找到你的日志，唯一标识可区分是谁的日志

配置 demo 已在配置说明中描述，快去配置专属于你的前缀吧

### 配置项

> 自定义小助手 console

![settings](https://qn.xiesz.com/AT/settings.gif)

* macOS: Code > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。
* Windows: 文件 > 首选项 > 设置 > 输入 **日志小助手/consoleLog**，可自定义配置项。

## Install

安装插件：[VisualStudio - Marketplace](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)，VSCode 最低版本要求： `v1.51.0+`

## QA

为什么我的不生效？

> 亲，可能是您的快捷键被占用了~
> 请打开键盘快捷方式列表，查看您的快捷键是否被占用，删除占用的命令或修改 consoleLog 绑定的快捷键即可，具体的操作如下：

在键盘快捷方式列表，输入被占用的快捷方式例如 **cmd + shift + l** ，右键选择删除或修改其他命令。

## Changelog

[CHANGELOG](./CHANGELOG.md)

## License

[LICENSE](./LICENSE)
