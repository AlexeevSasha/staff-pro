import {Drawer, Button, Form, Row, Col, Input, Select, InputNumber, DatePicker} from "antd";
import {FC} from "react";
import styled from "styled-components";
import {IInvoices} from "../../../api/documents/invoices/invoicesDto";
import {useAppDispatch} from "../../../core/redux/reduxType";
import {addInvoicesThunk} from "../documentThunk";

const {Option} = Select;

interface IProps {
    visible: boolean;
    closeDrawer: () => void;
}


const currency = (
    <Form.Item name="currency" noStyle initialValue='₽'>
        <Select style={{width: 60}}>
            <Option value="₽">₽</Option>
            <Option value="$">$</Option>
        </Select>
    </Form.Item>
);

export const AddNewInvoices: FC<IProps> = ({closeDrawer, visible}) => {
    const dispatch = useAppDispatch()

    const handlerForm = (values: IInvoices & { currency: string }) => {

        const {price, type, title, date, description, currency} = values;
        const invoice: IInvoices = {
            type,title,description,
            price: price + currency,
            date: new Date(date).toString()
        }
        dispatch(addInvoicesThunk(invoice))
    }

    return (
        <Drawer
            title="Create a new invoice"
            width={365}
            onClose={closeDrawer}
            visible={visible}
            bodyStyle={{paddingBottom: 80}}
        >
            <Form layout="vertical"  onFinish={handlerForm} name='invoices'>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {required: true, message: 'Please enter user title'},
                        {max: 30, message: 'No more than 30 characters'}
                    ]}
                >
                    <Input placeholder="Please enter title invoice"/>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{required: true, message: 'Please select price'}]}
                        >
                            <InputNumber addonAfter={currency} min={1}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{required: true, message: 'Please choose the type'}]}
                            initialValue='due'
                        >
                            <Select placeholder="Please choose the type">
                                <Option value="due">Due</Option>
                                <Option value="paid">Paid</Option>
                                <Option value="unpaid">Unpaid</Option>
                                <Option value="archived">Archived</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter description',
                                },
                                {max: 100, message: 'No more than 100 characters'}
                            ]}
                        >
                            <Input.TextArea showCount maxLength={100} rows={4}
                                            placeholder="Please enter url description"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Date" name='date' rules={[{required: true, message: 'Please enter date'}]}>
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>
                <Flex>
                    <Button style={{width: '100%'}} htmlType="submit" type="primary" >
                        Submit
                    </Button>
                    <Button onClick={closeDrawer}>Cancel</Button>
                </Flex>
            </Form>
        </Drawer>
    )
}

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding-top: 10px;
`