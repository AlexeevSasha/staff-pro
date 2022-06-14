import {FC, useCallback, useEffect, useState} from "react";
import {Button, Spin} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {AddNewFormCustomers} from "./AddNewFormCustomers";
import {SeekerTable} from "./SeekerTable";
import {useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {getAllSeekerThunk} from "../customersThunk";
import {selectLoadingCustomers, selectSeeker} from "../customersSlice";
import {CardsCustom} from "./CardsCustom";


export const Seeker: FC = () => {
    const seeker = useAppSelector(selectSeeker)
    const loading = useAppSelector(selectLoadingCustomers)
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false);
    const showDrawer = useCallback(() => setVisible(true), [])
    const onClose = useCallback(() => setVisible(false), [])

    useEffect(() => {
        dispatch(getAllSeekerThunk())
    }, [dispatch])
    return (
        <>
            <AddNewBtn><strong>Пригласить соискателя</strong><Button onClick={showDrawer} type="primary"
                                                                     icon={<PlusOutlined/>} size='large'/></AddNewBtn>
            <AddNewFormCustomers visible={visible} closeDrawer={onClose} title='seeker'/>
            <Spin tip="Loading..." spinning={loading}>
                {seeker && <SeekerTable seeker={seeker}/>}
                {seeker && <CardsCustom items={seeker}/>}
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