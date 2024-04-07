import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import studentsReducer from "./slice/studentsSlice"

const store = configureStore({
    reducer:{
        auth:authReducer,
        students: studentsReducer,
    }
})
export type AppDispatch= typeof store.dispatch
export default store