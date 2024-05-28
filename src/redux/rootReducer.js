// ** Reducers Imports
import auth from './authentication'

// ** Root Reducer
import project from "@src/views/pages/admin/project/store"
import question from "@src/views/pages/admin/questions/store"
import userProject from "@src/views/pages/users/project/store"


const rootReducer = {
  auth,
  project,
  question,
  userProject,

}

export default rootReducer
