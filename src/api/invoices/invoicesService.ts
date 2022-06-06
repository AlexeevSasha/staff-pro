import {post, get} from "../baseRequest";
import {IInvoices, InvoicesFromServer} from "./invoicesDto";


export const addInvoicesService =  (data: IInvoices): Promise<InvoicesFromServer[]> => {
    return  post('invoices', JSON.stringify(data))
}

export const getAllInvoicesService =  (): Promise<InvoicesFromServer[]> => get('invoices')
