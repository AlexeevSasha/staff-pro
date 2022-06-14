import {FC, useCallback, useEffect, useState} from "react";
import {Tabs, Button} from 'antd';
import styled from "styled-components";
import {TableInvoices} from "./components/TableInvoices";
import {AddNewInvoices} from "./components/AddNewInvoices";
import {useAppDispatch, useAppSelector} from "../../core/redux/reduxType";
import {getAllInvoicesThunk} from "./documentThunk";
import {selectInvoices} from "./documentSlice";
import {CardsInvoices} from "./components/CardsInvoices";

const {TabPane} = Tabs;


export const Invoices: FC = () => {
    const dispatch = useAppDispatch()
    const invoices = useAppSelector(selectInvoices)
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllInvoicesThunk())
    }, [dispatch])

    if (!invoices) return null;
    return (
        <>
            <TabsStyle defaultActiveKey="1"
                       tabBarExtraContent={<Button onClick={showDrawer} type='primary'>+ Add new invoice</Button>}>
                    <TabPaneStyle tab="All invoices" key="1">
                        <TableInvoices invoices={invoices}/>
                       <CardsInvoices invoices={invoices}/>
                    </TabPaneStyle>
                    <TabPaneStyle tab="Due" key="2">
                        <TableInvoices invoices={invoices.filter(el => el.type === 'due')}/>
                        <CardsInvoices invoices={invoices.filter(el => el.type === 'due')}/>
                    </TabPaneStyle>
                    <TabPaneStyle tab="Paid" key="3">
                        <TableInvoices invoices={invoices.filter(el => el.type === 'paid')}/>
                        <CardsInvoices invoices={invoices.filter(el => el.type === 'paid')}/>
                    </TabPaneStyle>
                    <TabPaneStyle tab="Unpaid" key="4">
                        <TableInvoices invoices={invoices.filter(el => el.type === 'unpaid')}/>
                        <CardsInvoices invoices={invoices.filter(el => el.type === 'unpaid')}/>
                    </TabPaneStyle>
                    <TabPaneStyle tab="Archived" key="5">
                        <TableInvoices invoices={invoices.filter(el => el.type === 'archived')}/>
                        <CardsInvoices invoices={invoices.filter(el => el.type === 'archived')}/>
                    </TabPaneStyle>
            </TabsStyle>
            <AddNewInvoices closeDrawer={onClose} visible={visible}/>
        </>
    )
}

const TabsStyle = styled(Tabs)`
  gap: 20px;

  &.ant-tabs>.ant-tabs-nav, .ant-tabs>div>.ant-tabs-nav{
    padding: 0 20px;
    background: white;
    margin: 0;
  }
  &.ant-tabs .ant-tabs-content-holder {
    margin: 0 20px;
  }
`

const TabPaneStyle = styled(TabPane)`
  height: 100%;
`
