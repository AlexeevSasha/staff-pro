import {InvoicesFromServer} from "../../api/documents/invoices/invoicesDto";

type objType = {
    "paid": number,
    "due": number,
    "unpaid": number,
    'archived': number
}

export const invoicesObj = (data: InvoicesFromServer[]) => {
   const obj: objType =  data.reduce((acc, curr) => {
        acc[curr.type] += 1
        return acc;
    }, {
        "paid": 0,
        "due": 0,
        "unpaid": 0,
        'archived': 0
    })

    return Object.entries(obj).map((item) => ({type: item[0], count: item[1]}))
}
