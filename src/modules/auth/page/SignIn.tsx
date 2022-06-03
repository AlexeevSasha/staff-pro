import {FC} from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import {Button, Checkbox, Form, Input} from "antd";
import {SignInType} from "../../../api/auth/authDto";
import {useAppDispatch} from "../../../core/redux/reduxType";
import {loginThunk} from "../authThunk";


export const SignIn: FC = () => {
    const dispatch = useAppDispatch()
    const onFinish = (values: SignInType) => {
        dispatch(loginThunk(values))
    };
    return (
        <>
            <NoAccount>Нет аккаунта?&nbsp;<Link to='/register'>Зарегистрироваться</Link></NoAccount>
            <Flex>
                <Form
                    name="signIn"
                    layout='vertical'
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Эл. адрес"
                        name="email"
                        rules={[
                            {required: true, message: 'Please input your email'},
                            {type: 'email', message: 'The input is not valid E-mail'},
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {required: true, message: 'Please input your password'},
                            {min: 8, max: 64, message: 'Password must be between 8 and 64 characters'}
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item name="remember" valuePropName="checked">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Checkbox>Запомнить меня</Checkbox>
                            <Link to='/forgot-password'>Забыли пароль?</Link>
                        </div>
                    </Form.Item>


                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form>
            </Flex>
        </>
    )
}


const NoAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  height: 64px;
`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  & > form {
    max-width: 500px;
    width: 100%;
    padding: 24px;
  }
`