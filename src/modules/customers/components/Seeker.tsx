import {FC, useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {AddNewFormCustomers} from "./AddNewFormCustomers";
import {SeekerTable} from "./SeekerTable";
import {useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {getAllSeekerThunk} from "../customersThunk";


export const Seeker :FC = () => {
    const {seeker} = useAppSelector(state => state.customers)
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllSeekerThunk())
    }, [])
    return (
        <>
            <AddNewBtn ><strong>Пригласить соискателя</strong><Button onClick={showDrawer} type="primary" icon={<PlusOutlined />} size='large' /></AddNewBtn>
            <AddNewFormCustomers visible={visible} closeDrawer={onClose} title='seeker'/>
            {seeker &&   <SeekerTable seeker={seeker}/>}
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