// 对象深度克隆
export const cloneDeep = obj => {
  const copy = Object.create(Object.getPrototypeOf(obj))
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(obj, name)
    Object.defineProperty(copy, name, desc)
  })
  return copy
}

// 判断对象是否为空
export const isEmpty = obj => {
  return Object.keys(obj).length === 0
}

// 把对象的空值删除
export const filterEmptyObj = obj => {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}
