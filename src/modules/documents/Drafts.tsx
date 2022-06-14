import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Drawer, Spin, Form, Input} from 'antd';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../core/redux/reduxType";
import {getAllDraftsThunk} from "./documentThunk";
import {TableDrafts} from "./components/TableDrafts";
import { selectLoadingDocuments} from "./documentSlice";


export const Drafts: FC = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = useCallback(() => setVisible(true), []);
    const onClose = useCallback(() => setVisible(false), []);


    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectLoadingDocuments)

    useEffect(() => {
        dispatch(getAllDraftsThunk())
    }, [dispatch])

    return (
        <Wrapper>
            <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}>
                Add +
            </Button>
            <Spin spinning={loading}>
            <TableDrafts/>
            </Spin>
            <Drawer title="Add drafts" placement="right" onClose={onClose} visible={visible}>
               <Form>
                   <Form.Item  name="title" rules={[{
                       required: true,
                       message: 'Enter please title'
                   }]}>
                      <Input placeholder='Title'/>
                   </Form.Item>
                   <Form.Item name="body"
                              rules={[{
                                  required: true,
                                  message: 'Enter please description'
                              }]}
                   >
                   <Input.TextArea  placeholder='Description' showCount maxLength={250} autoSize />
                   </Form.Item>
                       <Form.Item>
                           <Button htmlType='submit' type='primary' style={{width: '100%'}}>Add</Button>
                           <Button htmlType='button' onClick={onClose}  style={{width: '100%', marginTop: 10}}>Cancel</Button>
                       </Form.Item>

               </Form>
            </Drawer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 20px;
`