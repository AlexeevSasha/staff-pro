import {FC, useMemo} from "react";
import {Column} from '@ant-design/plots';
import {invoicesObj} from "../../../core/utils/reduceInvoice";
import { Spin, Typography} from "antd";
import { useAppSelector} from "../../../core/redux/reduxType";
import {selectInvoices, selectLoadingDocuments} from "../../documents/documentSlice";
import {Wrapper, EmptyStyle} from "./style";

export const InvoicesGraphic: FC = () => {

    const invoices = useAppSelector(selectInvoices)
    const loading = useAppSelector(selectLoadingDocuments)
     const data = useMemo(() => invoices ? invoicesObj(invoices) : [], [invoices])
    const config = useMemo(() => ({
        data,
        xField: 'type',
        yField: 'count',
        columnWidthRatio: 0.8,
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    }), [data])
    return (
        <Wrapper>
            <Spin tip="Loading..." spinning={loading}>
            <Typography.Title level={3}>Invoices graphic</Typography.Title>
                {!data.length && !loading && <EmptyStyle/>}
            <Column {...config} style={{height: '250px'}} />
            </Spin>
        </Wrapper>
    )
}


