import {FC} from "react";
import {Link, useNavigate} from 'react-router-dom'
import styled from "styled-components";
import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import {monthOptions} from "../../../core/utils/options";
import {SignUpType} from "../../../api/auth/authDto";
import {useAppDispatch} from "../../../core/redux/reduxType";
import {registerThunk} from "../authThunk";

// cb: () => navigate('/dashboard')
export const SignUp: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onFinish = (data: SignUpType) => {
        delete data.agree;
        delete data.confirm;
        dispatch(registerThunk({data}))
    };
    return (
        <Flex>
            <Form
                name="signIn"
                layout='vertical'
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
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

                <WrapperItem>
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
                </WrapperItem>


                <Form.Item
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your password'},
                        {min: 8, max: 64, message: 'Password must be between 8 and 64 characters'}
                    ]}
                >
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        })
                    ]}
                >
                    <Input.Password placeholder="Повторите пароль"/>
                </Form.Item>

                {/*Date of Birth*/}
                <div style={{margin: '24px 0 8px'}}>Дата рождения</div>
                <WrapperItem>
                    <Form.Item
                        name="day"
                        rules={[{required: true, message: 'Required field'}]}
                    >
                        <InputNumber placeholder='День' min={1} max={31} style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        style={{width: '150%'}}
                        name="month"
                        rules={[{required: true, message: 'Required field'}]}
                    >
                        <Select placeholder='Месяц'>
                            {monthOptions.map(({value, label}, idx) => (
                                <Select.Option key={idx} value={value}>{label}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="year"
                        rules={[{required: true, message: 'Required field'}]}
                    >
                        <InputNumber placeholder='Год' min={1900} max={new Date().getFullYear()}
                                     style={{width: '100%'}}/>
                    </Form.Item>
                </WrapperItem>

                <WrapperItem>
                    <Form.Item
                        style={{width: '200%'}}
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

                </WrapperItem>


                <Form.Item name="agree" valuePropName="checked"
                           rules={[
                               {
                                   validator: (_, value) =>
                                       value ? Promise.resolve() : Promise.reject(new Error('To register, you must accept the terms of the agreement'))
                               }
                           ]}
                >
                    <Checkbox>Я согласен с пользовательским соглашением и политикой обработки персональных
                        данных пользователей</Checkbox>
                </Form.Item>


                <Button type="primary" htmlType="submit">
                    Создать аккаунт
                </Button>
            </Form>
            <div>Уже есть аккаунт в StaffPro?&nbsp;<Link to='/'>Войдите</Link></div>
        </Flex>
    )
}


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

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  padding: 24px;


  & > form {
    max-width: 500px;
    width: 100%;
    margin-bottom: 24px;

    & > button {
      width: 100%;
    }
  }
`