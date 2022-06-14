import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    EmployeeFromServiceType,
    EmployeeType,
    SeekerFromServiceType,
    SeekerType
} from "../../api/customers/customersDto";
import {
    addEmployee,
    addSeeker, deleteIdEmployee,
    deleteIdSeeker,
    getAllEmployee,
    getAllSeeker
} from "../../api/customers/customersService";


export const getAllSeekerThunk = createAsyncThunk<SeekerFromServiceType[]>(
    'customers/getAllSeeker',
    async ( ) => {
        const response = await getAllSeeker()
        return response
    }
)

export const addSeekerThunk = createAsyncThunk<SeekerFromServiceType[], SeekerType>(
    'customers/addSeeker',
    async (data ) => {
        const response = await addSeeker(data)
        return response
    }
)


export const deleteSeekerThunk = createAsyncThunk<void,  number>(
    'customers/deleteSeeker',
    async (id ) => {
       await deleteIdSeeker(id)
    }
)

export const getAllEmployeeThunk = createAsyncThunk<EmployeeFromServiceType[]>(
    'customers/getAllEmployee',
    async () => {
        const response = await getAllEmployee()
        return response
    }
)

export const addEmployeeThunk = createAsyncThunk<EmployeeFromServiceType[], EmployeeType>(
    'customers/addEmployee',
    async (data ) => {
        const response = await addEmployee(data)
        return response
    }
)

export const deleteEmployeeThunk = createAsyncThunk<void, number>(
    'customers/getAllEmployee',
    async (id) => {
       await deleteIdEmployee(id)
    }
)

