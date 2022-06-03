import {IAuthFromServes, SignUpType} from "./authDto";
import {post, get, patch} from "../baseRequest";


export const signUpService = (data: SignUpType): Promise<IAuthFromServes> => {
    return post('users', JSON.stringify(data))
}

export const searchEmailUsers = (email: string): Promise<IAuthFromServes[]> => {
    return get(`users?email=${email}`)
}


export const updatePasswordUser = (id: string, password: string): Promise<IAuthFromServes> => {
    return patch(`users/${id}`, JSON.stringify({password}))
}
