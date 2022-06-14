import {createAsyncThunk} from "@reduxjs/toolkit";
import {IInvoices, InvoicesFromServer} from "../../api/documents/invoices/invoicesDto";
import {addInvoicesService, getAllInvoicesService} from "../../api/documents/invoices/invoicesService";
import {DraftForm, IDrafts} from "../../api/documents/drafts/draftsDto";
import {
    deleteByIDDraftService,
    getAllDraftsService,
    getChangeByIDDraftService
} from "../../api/documents/drafts/draftsService";

//invoices
export const addInvoicesThunk = createAsyncThunk<InvoicesFromServer[], IInvoices>(
    'documents/addInvoices',
    async (data ) => {
        const response = await addInvoicesService(data)
        return response
    }
)

export const getAllInvoicesThunk = createAsyncThunk<InvoicesFromServer[]>(
    'documents/getAllInvoices',
    async () => {
        const response = await getAllInvoicesService()
        return response
    }
)


//drafts
export const getAllDraftsThunk = createAsyncThunk<IDrafts[]>(
    'documents/getAllDrafts',
    async () => {
        const response = await getAllDraftsService()
        return response
    }
)

export const changeDraftThunk = createAsyncThunk<IDrafts, {id: number, data: DraftForm}>(
    'documents/changeDraft',
    async ({id, data}) => {
        const response = await getChangeByIDDraftService(id, data)
        return response
    }
)

export const deleteDraftThunk = createAsyncThunk<void, number>(
    'documents/deleteDraft',
    async (id) => {
        await deleteByIDDraftService(id)
    }
)

