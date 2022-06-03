import {AnyAction, createSlice} from '@reduxjs/toolkit'
import {STATUS} from "../../core/redux/reduxType";
import {IAuthFromServes} from "../../api/auth/authDto";
import {changePasswordThunk, loginThunk, registerThunk} from "./authThunk";

interface IInitialState {
    user: IAuthFromServes | null;
    status: STATUS
}

const user = localStorage.getItem('user')

const initialState: IInitialState = {
    // user: user ? JSON.parse(user) : null,
    user: null,
    status: STATUS.LOADED,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.user = payload;
        })
        builder.addCase(registerThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            console.log(payload)
            // state.user = payload;
        })
        builder.addMatcher(isLoading, (state) => {
            state.status = STATUS.LOADING;
            state.user = null;
        })
        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        })

    })
})

function isLoading(action: AnyAction) {
    return action.type.endsWith('pending')
}

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export default authSlice.reducer