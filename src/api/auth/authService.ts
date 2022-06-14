import {IAuthFromServes, SignUpType} from "./authDto";
import {post, get, patch} from "../baseRequest";


export const signUpService = (data: SignUpType): Promise<IAuthFromServes> => post('users', JSON.stringify(data))

export const searchEmailUsers = (email: string): Promise<IAuthFromServes[]> => get(`users?email=${email}`)

export const getByIdUser = (id: string): Promise<IAuthFromServes[]> => get(`users?id=${id}`)

export const updatePasswordUser = (id: string, password: string): Promise<IAuthFromServes> => patch(`users/${id}`, JSON.stringify({password}))




