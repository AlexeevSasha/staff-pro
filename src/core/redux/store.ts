import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../../modules/auth/authSlice";
import documentsSlice from '../../modules/documents/documentSlice'
import customersSlice from "../../modules/customers/customersSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        documents: documentsSlice,
        customers: customersSlice
    }
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
