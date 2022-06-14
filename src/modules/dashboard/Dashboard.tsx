import {FC, useEffect} from "react";
import {InvoicesGraphic} from "./components/InvoicesGraphic";
import styled from "styled-components";
import {DiagramCustomers} from "./components/DiagramCustomers";
import {useAppDispatch} from "../../core/redux/reduxType";
import {getAllInvoicesThunk} from "../documents/documentThunk";
import {getAllEmployeeThunk, getAllSeekerThunk} from "../customers/customersThunk";



export const Dashboard: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllInvoicesThunk())
        dispatch(getAllEmployeeThunk())
        dispatch(getAllSeekerThunk())
    }, [dispatch])

    return (
        <Wrapper>
           <DiagramCustomers/>
           <InvoicesGraphic/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 20px;
`