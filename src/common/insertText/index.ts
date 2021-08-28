import { window, Range } from 'vscode'

// 执行 log 写入
export const insertText = val => {
  const editor = window.activeTextEditor
  const { selection } = editor
  const range = new Range(selection.start, selection.end)
  editor.edit(editBuilder => {
    // 14
    // console.log('%c [ judith ]-14', 'font-size:13px; background:pink; color:#bf2c9f;', abc)
    editBuilder.replace(range, val)
  })
}

const abc = {}
console.log(
  '%c [ judith ]-14',
  'font-size:13px; background:pink; color:#bf2c9f;',
  abc
)
