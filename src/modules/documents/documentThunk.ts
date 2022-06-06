import {createAsyncThunk} from "@reduxjs/toolkit";
import {IInvoices, InvoicesFromServer} from "../../api/invoices/invoicesDto";
import {addInvoicesService, getAllInvoicesService} from "../../api/invoices/invoicesService";


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
        localStorage.setItem('test', JSON.stringify(response[0]))
        return response
    }
)