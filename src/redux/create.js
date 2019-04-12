import { createStore as _createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./modules/reducer";

export default function createStore() {
  return _createStore(reducers, {}, applyMiddleware(reduxThunk));
}
