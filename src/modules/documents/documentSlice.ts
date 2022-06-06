import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../../core/redux/reduxType";
import { InvoicesFromServer} from "../../api/invoices/invoicesDto";
import {addInvoicesThunk, getAllInvoicesThunk} from "./documentThunk";

interface IInitialState {
    invoices: InvoicesFromServer[] | null,
    drafts: null,
    templates: null,
    status: STATUS
}

const initialState: IInitialState  = {
    invoices: null,
    drafts: null,
    templates: null,
    status: STATUS.NEVER
}

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        //getAll
        builder.addCase(getAllInvoicesThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.invoices = null;
        });
        builder.addCase(getAllInvoicesThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.invoices = payload;
        });
        //add
        builder.addCase(addInvoicesThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.invoices = null;
        });
        builder.addCase(addInvoicesThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.invoices = payload;
        });
        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        });
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export default documentsSlice.reducer;