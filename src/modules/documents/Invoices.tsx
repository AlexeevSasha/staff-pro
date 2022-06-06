import {FC, useCallback, useEffect, useState} from "react";
import {Tabs, Button} from 'antd';
import styled from "styled-components";
import {TableInvoices} from "../../common/components/TableInvoices";
import {AddNewInvoices} from "../../common/components/AddNewInvoices";
import {useAppDispatch, useAppSelector} from "../../core/redux/reduxType";
import {getAllInvoicesThunk} from "./documentThunk";

const {TabPane} = Tabs;


export const Invoices: FC = () => {
    const dispatch = useAppDispatch()
    const {invoices} = useAppSelector(state => state.documents)
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllInvoicesThunk())
    }, [])

    if (!invoices) return null;
    return (
        <>
            <TabsStyle defaultActiveKey="1"
                       tabBarExtraContent={<Button onClick={showDrawer} type='primary'>+ Add new invoice</Button>}>
                <TabPaneStyle tab="All invoices" key="1">
                    <TableInvoices invoices={invoices}/>
                </TabPaneStyle>
                <TabPaneStyle tab="Due" key="2">
                    <TableInvoices invoices={invoices.filter(el => el.type === 'due')}/>
                </TabPaneStyle>
                <TabPaneStyle tab="Paid" key="3">
                    <TableInvoices invoices={invoices.filter(el => el.type === 'paid')}/>
                </TabPaneStyle>
                <TabPaneStyle tab="Unpaid" key="4">
                    <TableInvoices invoices={invoices.filter(el => el.type === 'unpaid')}/>
                </TabPaneStyle>
                <TabPaneStyle tab="Archived" key="5">
                    <TableInvoices invoices={invoices.filter(el => el.type === 'archived')}/>
                </TabPaneStyle>
            </TabsStyle>
            <AddNewInvoices closeDrawer={onClose} visible={visible}/>
        </>
    )
}

const TabsStyle = styled(Tabs)`
  gap: 20px;
`

const TabPaneStyle = styled(TabPane)`
  height: 100%;
`