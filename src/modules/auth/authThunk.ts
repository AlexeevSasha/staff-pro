import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthFromServes, SignInType, SignUpType} from "../../api/auth/authDto";
import {searchEmailUsers, signUpService, updatePasswordUser} from "../../api/auth/authService";
import {errorNotification} from "../../common/components/Notification";


export const loginThunk = createAsyncThunk<IAuthFromServes, SignInType>(
    "auth/signIn",
    async (data) => {
        const searchEmail = await searchEmailUsers(data.email)
        const user = searchEmail[0];
        if (!user) {
            errorNotification('Пользователя не существует')
            throw new Error('Пользователя не существует')
        }
        if (user.password !== data.password) {
            errorNotification('Неверный пароль')
            throw new Error('Неверный пароль')
        }

        delete user.password
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    },
);

export const registerThunk = createAsyncThunk<IAuthFromServes, { data: SignUpType, cb?: () => void }>(
    "auth/signUp",
    async ({data, cb}) => {
        const searchEmail = await searchEmailUsers(data.email)
        if (searchEmail.length !== 0) {
            errorNotification('Такой логин уже существует')
            throw new Error('Такой логин уже существует')
        }
        const user = await signUpService(data)
        delete user.password
        localStorage.setItem("user", JSON.stringify(user));
        cb && cb()
        return user;
    },
);

export const changePasswordThunk = createAsyncThunk<IAuthFromServes, { id: string, password: string, cb: () => void }>(
    "auth/changePassword",
    async ({id, password, cb}) => {
        const user = await updatePasswordUser(id, password)
        cb()
        return user
    },
);
