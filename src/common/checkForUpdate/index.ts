import { commands, extensions, window } from 'vscode'
import axios from 'axios'
const compareVersions = require('compare-versions')

export const checkForUpdate = () => {
  const consoleHelperExt = extensions.getExtension('at-9420.console-helper')
  const version = consoleHelperExt?.packageJSON?.version
  // tags 没找到分页查询，数据大的时候考虑删除过旧的tags
  axios
    .get(
      'https://api.github.com/repos/shangZhengXie/vscode-console-helper/tags'
    )
    .then(res => {
      const [newTag] = res.data
      const latestVersion = newTag.name // git release 版本号 / 2.4.3 注意版本号不要带前缀
      if (compareVersions(version, latestVersion) === -1) {
        // 若插件的版本号小于 git release 版本则触发插件升级提醒
        window
          .showInformationMessage(
            '检查到 [ console helper ] 插件有新版本，是否立即升级？',
            '去升级',
            '取消'
          )
          .then(res => {
            if (res === '去升级') {
              commands.executeCommand(
                'workbench.extensions.action.showInstalledExtensions'
              )
            }
          })
      }
    })
}
