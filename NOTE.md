## 发布到插件市场

1. 本地登录此用户
   `vsce login (publisher name)`
2. 发布插件
   `vsce publish`

## 版本升级

当插件内容发生变更时，重新发布时最好更新版本号，vsce 可以遵循语义化版本指定升级大(`major`)/小(`minor`)/补丁(`patch`)版本，也可以直接指定版本号。例如只升级小版本：

`vsce publish minor`
