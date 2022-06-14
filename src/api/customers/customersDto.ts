export interface ICustomers {
    email: string;
    name: string;
    lastname: string;
    patronymic: string;
    day: number;
    month: string;
    year: number;
    phone?: string;
    sex: 'man' | 'woman';
}

export type EmployeeType = ICustomers & { position: string };
export type EmployeeFromServiceType = EmployeeType & {id: number};

export type SeekerType = ICustomers;
export type SeekerFromServiceType = SeekerType & {id: number};



