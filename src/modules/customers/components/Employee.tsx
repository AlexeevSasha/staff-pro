import {FC, useCallback, useEffect, useState} from "react";
import {Button, Spin} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {AddNewFormCustomers} from "./AddNewFormCustomers";
import {useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {getAllEmployeeThunk} from "../customersThunk";
import {EmployeeTable} from "./EmployeeTable";
import {selectEmployee, selectLoadingCustomers} from "../customersSlice";
import {CardsCustom} from "./CardsCustom";


export const Employee: FC = () => {
    const dispatch = useAppDispatch()
    const employee = useAppSelector(selectEmployee)
    const loading = useAppSelector(selectLoadingCustomers)
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllEmployeeThunk())
    }, [dispatch])
    return (
        <>
            <AddNewBtn><strong>Пригласить сотрудника</strong><Button onClick={showDrawer} type="primary"
                                                                     icon={<PlusOutlined/>} size='large'/></AddNewBtn>
            <AddNewFormCustomers visible={visible} closeDrawer={onClose} title='employee' isFlagEmployee/>
            <Spin tip="Loading..." spinning={loading}>
                {employee && <EmployeeTable employee={employee}/>}
                {employee && <CardsCustom items={employee}/>}
            </Spin>
        </>
    )
}

const AddNewBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  
  @media ${({theme}) => theme.media._768} {
    margin-bottom: 10px;
  }
`