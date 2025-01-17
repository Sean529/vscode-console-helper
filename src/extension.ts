import { checkForUpdate, deleteAllLog, insertLogStatement, insertVariable } from "./common"

export const activate = (context) => {
  checkForUpdate()
  insertLogStatement(context)
  insertVariable(context)
  deleteAllLog(context)
}

export const deactivate = () => {}
