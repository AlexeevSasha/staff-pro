import {FC} from "react";
import { Table } from 'antd';
import {columns} from "../hooks/invoicesTable";
import { InvoicesFromServer} from "../../api/invoices/invoicesDto";


interface IProps {
    invoices : InvoicesFromServer[]
}

export const TableInvoices:FC<IProps> = ({invoices}) => {
    return (
        <Table columns={columns} dataSource={invoices}   rowKey="id"    pagination={{pageSize: 10}}/>
    )
}