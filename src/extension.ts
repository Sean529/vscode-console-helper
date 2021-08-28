import { checkForUpdate, deleteAllLog, insertLogStatement } from './common'

export const activate = context => {
  checkForUpdate()
  insertLogStatement(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
