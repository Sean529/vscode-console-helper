import {
  checkForUpdate,
  deleteAllLog,
  insertLogStatement,
  insertValue
} from './common'

export const activate = context => {
  checkForUpdate()
  insertLogStatement(context)
  insertValue(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
