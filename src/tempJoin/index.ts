// 拼接模板
export const tempJoin = (temp, styles, selectVariable) => {
  if (styles) {
    return `console.log('%c ${temp}', '${styles}', ${selectVariable})`
  } else if (temp) {
    return `console.log('${temp}', ${selectVariable})`
  }
  return `console.log(${selectVariable})`
}
