import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"

const store = configureStore({
    reducer:{
        auth:authReducer
    }
})
export type AppDispatch= typeof store.dispatch
export default store