import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../../core/redux/reduxType";
import {EmployeeFromServiceType, SeekerFromServiceType} from "../../api/customers/customersDto";
import {
    addEmployeeThunk,
    addSeekerThunk,
    deleteSeekerThunk,
    getAllEmployeeThunk,
    getAllSeekerThunk
} from "./customersThunk";



interface IInitialState {
    seeker:  SeekerFromServiceType[] | null,
    employee: EmployeeFromServiceType[] | null,
    status: STATUS
}

const initialState: IInitialState  = {
    seeker: null,
    employee: null,
    status: STATUS.NEVER
}

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        //getAll
        builder.addCase(getAllSeekerThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.seeker = null;
        });
        builder.addCase(getAllSeekerThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.seeker = payload;
        });

        //addSeeker
        builder.addCase(addSeekerThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.seeker = null;
        });
        builder.addCase(addSeekerThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.seeker = payload;
        });

        //getAllEmployee
        builder.addCase(getAllEmployeeThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.employee = null;
        });
        builder.addCase(getAllEmployeeThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.employee = payload;
        });

        //addEmployee
        builder.addCase(addEmployeeThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.employee = null;
        });
        builder.addCase(addEmployeeThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.employee = payload;
        });

        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        });
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export default customersSlice.reducer;