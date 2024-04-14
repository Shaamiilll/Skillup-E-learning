import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import studentsReducer from './slice/studentsSlice'
import instructorsReducer from './slice/instructorSlice'


const store= configureStore({
    reducer:{
        auth: authReducer,
        students: studentsReducer,
        instructors: instructorsReducer,
    }
})
export type AppDispatch=typeof store.dispatch
export default store