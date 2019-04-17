import { combineReducers } from "redux";

import auth from "./auth/auth";
import routes from "./routes/routes";
import { reducer as form } from "redux-form";

export default combineReducers({
  auth,
  routes,
  form
});
