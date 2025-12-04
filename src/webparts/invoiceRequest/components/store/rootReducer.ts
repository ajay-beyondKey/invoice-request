import { combineReducers } from "redux";
import invoiceReducer from "./invoice/invoiceReducer";

const rootReducer = combineReducers({
  invoice: invoiceReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
