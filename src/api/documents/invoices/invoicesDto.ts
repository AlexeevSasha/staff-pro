export type invoicesType = 'paid' | 'due' | 'unpaid' | 'archived';

export interface IInvoices {
    title: string;
    price: string;
    description: string;
    date: string;
    type: invoicesType;
}

export type InvoicesFromServer = IInvoices & {id: string};