# console-helper（日志小助手）

**console helper** —— 旨在帮助开发人员编码时更快的输入/移除 log，搭配上醒目的主题，提高你的开发效率。

## 安装插件

安装插件：[VisualStudio - Marketplace](https://marketplace.visualstudio.com/items?itemName=AT-9420.console-helper)，VSCode 最低版本要求：`v1.51.0+`

## 使用方式

> 以下以 Mac 快捷键示例；Windows 系统将 cmd 替换为 ctrl 即可。

### 快捷输出 log

#### console.log

通过快捷键 **cmd + l**，会在当前行输出 `console.log` 语句

#### console.log('%c[ var ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', vat)

以变量 `var` 示例：

选中变量 `var` 后按快捷键 **cmd + l**，会在下方插入一行 `console.log('%c[ var ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', vat)` 语句

### 快捷删除当前页面中所有 log

通过快捷键 **cmd + shift + d** 删除页面上所有 log，删除后窗口右下角会提示一共删除了几条 `console.log` 语句

## 修改快捷键绑定

首选项 -> 打开快捷键盘方式 -> 输入 **cmd + l**， 将除了 **cmd + l** 外绑定的快捷键删除即可。

## Changelog

[CHANGELOG](./CHANGELOG.md)
