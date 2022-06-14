import {AnyAction, createSlice, isAsyncThunkAction, PayloadAction} from "@reduxjs/toolkit";
import {STATUS} from "../../core/redux/reduxType";
import { InvoicesFromServer} from "../../api/documents/invoices/invoicesDto";
import {addInvoicesThunk, getAllDraftsThunk, getAllInvoicesThunk} from "./documentThunk";
import {RootState} from "../../core/redux/store";
import {IDrafts} from "../../api/documents/drafts/draftsDto";


const isRequestAction = isAsyncThunkAction(addInvoicesThunk, getAllDraftsThunk, getAllInvoicesThunk)

interface IInitialState {
    invoices: InvoicesFromServer[] | null,
    drafts: IDrafts[] | null,
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
    reducers: {
    },
    extraReducers: (builder) => {
        //invoices////////////////
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

        ///////////////////////////////////////////
        //drafts
        //getAll
        builder.addCase(getAllDraftsThunk.pending, (state) => {
            state.status = STATUS.LOADING;
            state.drafts = null;
        });
        builder.addCase(getAllDraftsThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.drafts = payload;
        });

        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        });
    }
})

function isError(action: AnyAction) {
    if (isRequestAction(action)) {
        return action.type.endsWith('rejected')
    }
    return false;
}

export default documentsSlice.reducer;

export const selectInvoices = ((state: RootState) => state.documents.invoices)
export const selectDrafts = ((state: RootState) => state.documents.drafts)
export const selectLoadingDocuments = ((state: RootState) => state.documents.status === STATUS.LOADING)