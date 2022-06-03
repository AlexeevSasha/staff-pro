export interface IAuth {
    email: string;
    name: string;
    lastname: string;
    patronymic: string;
    day: number;
    month: string;
    year: number;
    phone?: string;
    sex: 'man' | 'woman';
    remember: boolean;
    password?: string
}
export interface IAuthFromServes extends IAuth {
    id: string;
}

export type SignInType = Pick<IAuth, 'email' | 'remember' | 'password'>
export type SignUpType = IAuth & {confirm?: string, agree?: boolean}