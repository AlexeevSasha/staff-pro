import {FC} from "react";
import {Spin, Table} from 'antd';
import {columns} from "../../../common/hooks/invoicesTable";
import {InvoicesFromServer} from "../../../api/documents/invoices/invoicesDto";
import {useAppSelector} from "../../../core/redux/reduxType";
import {selectLoadingDocuments} from "../documentSlice";
import { WrapperDisplayNone768} from "../../../common/components/Style";



interface IProps {
    invoices: InvoicesFromServer[]
}

export const TableInvoices: FC<IProps> = ({invoices}) => {
    const loading = useAppSelector(selectLoadingDocuments)
    return (
        <WrapperDisplayNone768>
            <Spin tip="Loading..." spinning={loading}>
                <Table columns={columns} dataSource={invoices} rowKey="id" pagination={{pageSize: 10}}
                       scroll={{x: 900}}/>
            </Spin>
        </WrapperDisplayNone768>
    )
}



