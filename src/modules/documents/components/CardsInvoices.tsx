import {InvoicesFromServer} from "../../../api/documents/invoices/invoicesDto";
import {FC} from "react";
import styled from "styled-components";
import {CardInvoice} from "./CardInvoice";
import {List} from "antd";


interface IProps {
    invoices: InvoicesFromServer[]
}


export const CardsInvoices: FC<IProps> = ({invoices}) => {
    return (
        <CardsStyle>
            <List itemLayout='vertical'
                  pagination={{
                      pageSize: 5,
                  }}
                  dataSource={invoices} renderItem={item => {
                return <CardInvoice invoice={item}/>
            }}/>
        </CardsStyle>
    )
}
const CardsStyle = styled.div`
  display: none;
  @media ${({theme}) => theme.media._768} {
    display: block;
  }
`
