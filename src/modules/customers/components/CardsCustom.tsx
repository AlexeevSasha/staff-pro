import {FC} from "react";
import {EmployeeFromServiceType, SeekerFromServiceType} from "../../../api/customers/customersDto";
import styled from "styled-components";
import {List} from "antd";
import {CardCustomers} from "./CardCustomers";



interface IProps {
    items:  SeekerFromServiceType[] | EmployeeFromServiceType[]
}

export const CardsCustom: FC<IProps> = ({items}) => {
    return (
        <CardsStyle>
            <List itemLayout='vertical'
                  pagination={{
                      pageSize: 3,
                  }}
                  dataSource={items} renderItem={item => {
                return <CardCustomers item={item}/>
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