import checkForUpdate from './update'
import { deleteAllLog } from './deleteAllLog'
import { insertLogStatement } from './insertLogStatement'

export const activate = context => {
  checkForUpdate()
  insertLogStatement(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
