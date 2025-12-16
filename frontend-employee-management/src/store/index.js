import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import deparmentsReducer from "./departmentsSlice";
import employeesReducer from "./emplyeesSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        departments: deparmentsReducer,
        employees: employeesReducer
    }
})
export default store;