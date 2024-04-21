import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import studentsReducer from './slice/studentsSlice'
import instructorsReducer from './slice/instructorSlice'
import coursesReducer from './slice/courseSlice'


const store= configureStore({
    reducer:{
        auth: authReducer,
        students: studentsReducer,
        instructors: instructorsReducer,
        courses: coursesReducer,
    }
})
export type AppDispatch=typeof store.dispatch
export default store