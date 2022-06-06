import {FC, useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {AddNewFormCustomers} from "./AddNewFormCustomers";
import { useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {getAllEmployeeThunk} from "../customersThunk";
import {EmployeeTable} from "./EmployeeTable";


export const Employee :FC = () => {
    const dispatch = useAppDispatch()
    const { employee} = useAppSelector(state => state.customers)
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllEmployeeThunk())
    }, [])
    return (
        <>
            <AddNewBtn ><strong>Пригласить сотрудника</strong><Button onClick={showDrawer} type="primary" icon={<PlusOutlined />} size='large' /></AddNewBtn>
            <AddNewFormCustomers visible={visible} closeDrawer={onClose} title='employee' isFlagEmployee/>
            {employee && <EmployeeTable employee={employee}/>}
        </>
    )
}

const AddNewBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`