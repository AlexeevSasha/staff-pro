import {AnyAction, createSlice, isAsyncThunkAction, PayloadAction} from '@reduxjs/toolkit'
import {STATUS} from "../../core/redux/reduxType";
import {IAuthFromServes} from "../../api/auth/authDto";
import {loginThunk, registerThunk} from "./authThunk";
import {RootState} from "../../core/redux/store";

interface IInitialState {
    user: IAuthFromServes | null;
    status: STATUS
}

const isRequestAction = isAsyncThunkAction(loginThunk, registerThunk)

const user = localStorage.getItem('user')

const initialState: IInitialState = {
    user: user ? JSON.parse(user) : null,
    status: STATUS.NEVER,
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

        builder.addMatcher(isLoading, (state) => {
            state.status = STATUS.LOADING;
            state.user = null;
        })

        builder.addMatcher(isSuccess, (state, {payload}  :PayloadAction<IAuthFromServes>) => {
            state.status = STATUS.LOADED;
            state.user = payload;
        })

        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        })

    })
})

function isSuccess(action: AnyAction) {
    if (isRequestAction(action)) {
        return action.type.endsWith('fulfilled')
    }
    return false;
}

function isLoading(action: AnyAction) {
    if (isRequestAction(action)) {
        return action.type.endsWith('pending')
    }
    return false;
}

function isError(action: AnyAction) {
    if (isRequestAction(action)) {
        return action.type.endsWith('rejected')
    }
    return false;
}

export const {logout} = authSlice.actions

export default authSlice.reducer


export const selectUser = ((state: RootState) => state.auth.user)
export const selectLoadingUser = ((state: RootState) => state.auth.status === STATUS.LOADING)