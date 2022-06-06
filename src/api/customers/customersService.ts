import {SeekerType, EmployeeType, EmployeeFromServiceType, SeekerFromServiceType} from "./customersDto";
import {post, get, remove} from "../baseRequest";


export const addSeeker = (data : SeekerType): Promise<SeekerFromServiceType[]> => {
    return post('seeker', JSON.stringify(data))
}
export const getAllSeeker = (): Promise<SeekerFromServiceType[]> => get('seeker')
export const deleteIdSeeker = (id: number): Promise<SeekerFromServiceType[]> => remove(`seeker/${id}`)



export const addEmployee = (data : EmployeeType): Promise<EmployeeFromServiceType[]> => {
    return post('employee', JSON.stringify(data))
}
export const getAllEmployee = (): Promise<EmployeeFromServiceType[]> => get('employee')

export const deleteIdEmployee = (id: number): Promise<EmployeeFromServiceType[]> => remove(`employee/${id}`)

