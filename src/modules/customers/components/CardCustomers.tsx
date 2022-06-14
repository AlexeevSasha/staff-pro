import {EmployeeFromServiceType, SeekerFromServiceType} from "../../../api/customers/customersDto";
import {FC} from "react";
import {Button, Card, Popconfirm} from "antd";
import styled from "styled-components";
import {getDate} from "../../../core/utils/getAge";
import {deleteEmployeeThunk} from "../customersThunk";
import {useAppDispatch} from "../../../core/redux/reduxType";


interface IProps {
    item: EmployeeFromServiceType | SeekerFromServiceType & {position?: string},
}



export const CardCustomers: FC<IProps > = ({item}) => {
    const dispatch = useAppDispatch()
    const handleDelete = (id: number) => {
        dispatch(deleteEmployeeThunk(id))
    }

    return (
        <CardStyle title={`${item.lastname} ${item.name} ${item.patronymic}`} bordered={false}>
            <Flex>
                <span>Почта </span>
                <div>{item.email}</div>
            </Flex>
            {item?.position ?
                <Flex>
                    <span>Должность </span>
                    <div>{item.position}</div>
                </Flex> : ''
            }
            <Flex>
                <span>Пол</span>
                <div>{item.sex}</div>
            </Flex>
            <Flex>
                <span>Дата рождения </span>
                <div>{getDate(`${item.day}${item.month}${item.year}`)}</div>
            </Flex>


            <DeleteBtn>
                <Popconfirm title="Sure to delete?" placement="topRight" cancelText="no"  okText="yes" onConfirm={() => handleDelete(item.id)}>
                    <Button type='link'>Delete</Button>
                </Popconfirm>
                </DeleteBtn>
        </CardStyle>
    )
}

const CardStyle = styled(Card)`
  margin-bottom: 10px;
  width: 100%;

  & > .ant-card-body {
    padding-top: 0;
    padding-bottom: 5px;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  & > span {
    font-weight: 500;
  }
`

const DeleteBtn = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  & > button {
    padding: 0;
  }
`
