import {AnyAction, createSlice} from '@reduxjs/toolkit'
import {STATUS} from "../../core/redux/reduxType";
import {IAuthFromServes} from "../../api/auth/authDto";
import {loginThunk, registerThunk} from "./authThunk";

interface IInitialState {
    user: IAuthFromServes | null;
    status: STATUS
}

const user = localStorage.getItem('user')

const initialState: IInitialState = {
    user: user ? JSON.parse(user) : null,
    status: STATUS.LOADED,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = STATUS.NEVER
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginThunk.pending, (state) => {
            state.status = STATUS.LOADED;
            state.user = null;
        })
        builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.user = payload;
        })
        builder.addCase(registerThunk.pending, (state) => {
            state.status = STATUS.LOADED;
            state.user = null;
        })
        builder.addCase(registerThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.user = payload;
        })

        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        })

    })
})


function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const {logout} = authSlice.actions

export default authSlice.reducer