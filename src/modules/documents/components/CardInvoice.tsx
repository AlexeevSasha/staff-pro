import styled from "styled-components";
import {Card, Tag} from "antd";
import {InvoicesFromServer} from "../../../api/documents/invoices/invoicesDto";
import {FC} from "react";
import {colorsType} from "../../../common/hooks/invoicesTable";
import moment from "moment";


interface IProps {
    invoice: InvoicesFromServer
}

export const CardInvoice: FC<IProps> = ({invoice}) => {
    return (
        <CardStyle bordered={false}>
            <Flex>
                <h3>{invoice.title}<span>{invoice.price}</span></h3>
                <Tag color={colorsType(invoice.type)}>
                    {invoice.type.toUpperCase()}
                </Tag>
            </Flex>
            <DownCard>{invoice.description}</DownCard>
            <FlexDate>{moment(invoice.date).subtract(10, 'days').calendar()}</FlexDate>
        </CardStyle>
    )
}

const DownCard = styled.div`
  margin-top: 10px;
`

const CardStyle = styled(Card)`
  margin-bottom: 10px;
  width: 100%;

  & > .ant-card-body {
    padding: 10px 10px 5px;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #ebe7e7;

  & > span {
    margin: 0;
  }
  & > h3 > span {
    margin-left: 10px;
    background-color:rgba(237, 145, 145, 0.1);
    padding: 5px;
  }
`

const FlexDate = styled(Flex)`
  justify-content: flex-end;
  padding-bottom: 0;
  border-bottom: none;
  font-weight: 500;
`