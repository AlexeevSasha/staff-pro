import {Drawer, Button, Form, Input, Select, InputNumber} from "antd";
import {FC} from "react";
import styled from "styled-components";
import {monthOptions} from "../../../core/utils/options";
import {EmployeeType, SeekerType} from "../../../api/customers/customersDto";
import {useAppDispatch} from "../../../core/redux/reduxType";
import {addEmployeeThunk, addSeekerThunk} from "../customersThunk";


interface IProps {
    visible: boolean;
    closeDrawer: () => void;
    title: string;
    isFlagEmployee?: boolean
}


export const AddNewFormCustomers: FC<IProps> = ({closeDrawer, visible, title, isFlagEmployee}) => {
    const dispatch = useAppDispatch()

    const handlerForm = (values: any) => {
        if (isFlagEmployee) {
            dispatch(addEmployeeThunk(values as EmployeeType))
        } else {
            dispatch(addSeekerThunk(values as SeekerType))
        }
    }

    return (
        <Drawer
            title={`Add a new ${title}`}
            width={365}
            onClose={closeDrawer}
            visible={visible}
            bodyStyle={{paddingBottom: 20}}
        >
            <FormStyle layout="vertical" onFinish={handlerForm}>
                <div>
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Please input your email'},
                            {type: 'email', message: 'The input is not valid E-mail'},
                        ]}
                    >
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        rules={[{required: true, message: 'Please input your lastname'}]}
                    >
                        <Input placeholder='Фамилия'/>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please input your name'}]}
                    >
                        <Input placeholder='Имя'/>
                    </Form.Item>

                    <Form.Item
                        name="patronymic"
                        rules={[{required: true, message: 'Please input your patronymic'}]}
                    >
                        <Input placeholder='Отчество'/>
                    </Form.Item>

                    {isFlagEmployee && <Form.Item
                        name="position"
                        rules={[{required: true, message: 'Please input your position'}]}
                    >
                        <Input placeholder='Должность'/>
                    </Form.Item>}

                    <div style={{margin: '24px 0 8px'}}>Дата рождения</div>
                    <WrapperItem>
                        <Form.Item
                            name="day"
                            rules={[{required: true, message: 'Required'}]}
                        >
                            <InputNumber placeholder='День' min={1} max={31} style={{width: '100%'}}/>
                        </Form.Item>

                        <Form.Item
                            style={{width: '150%'}}
                            name="month"
                            rules={[{required: true, message: 'Required'}]}
                        >
                            <Select placeholder='Месяц'>
                                {monthOptions.map(({value, label}, idx) => (
                                    <Select.Option key={idx} value={value}>{label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="year"
                            rules={[{required: true, message: 'Required'}]}
                        >
                            <InputNumber placeholder='Год' min={1900} max={new Date().getFullYear()}
                                         style={{width: '100%'}}/>
                        </Form.Item>
                    </WrapperItem>

                    <Form.Item
                        name="phone"
                        rules={[{
                            pattern: new RegExp("(^((8|\\+7)[\\- ]?)?(\\(?\\d{3,4}\\)?[\\- ]?)?[\\d\\- ]{5,10}$)"),
                            message: "This number does not exist"
                        },]}
                    >
                        <Input placeholder='Телефон (опционально)'/>
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        rules={[{required: true, message: 'Required field'}]}
                    >
                        <Select placeholder='Пол'>
                            <Select.Option value="man">Мужской</Select.Option>
                            <Select.Option value="woman">Женский</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Flex>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button htmlType="submit" type="primary">invite </Button>
                </Flex>
            </FormStyle>
        </Drawer>
    )
}

const FormStyle = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

`

const Flex = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  gap: 10px;
  padding-top: 10px;

  &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 365px;
    left: -24px;
    background: #f0f0f0;
    top: -10px;
  }
`

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  & > div {
    width: 100%;
  }

  @media ${({theme}) => theme.media._480} {
    gap: 10px;
  }
`