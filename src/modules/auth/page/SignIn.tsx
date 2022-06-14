import {FC} from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import {Button, Checkbox, Form, Input, Spin} from "antd";
import {SignInType} from "../../../api/auth/authDto";
import { useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {loginThunk} from "../authThunk";
import {selectLoadingUser} from "../authSlice";
import {useTranslation} from "react-i18next";


export const SignIn: FC = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectLoadingUser)
    const onFinish = (values: SignInType) => {
        dispatch(loginThunk(values))
    };
    return (
        <>
            <NoAccount>{t('auth.no_account')}&nbsp;<Link to='/register'>{t('auth.sign_up')}</Link></NoAccount>
            <Spin tip="Loading..." spinning={loading}>
                <Flex>
                    <Form
                        name="signIn"
                        layout='vertical'
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {required: true, message: 'Please input your email'},
                                {type: 'email', message: 'The input is not valid E-mail'},
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label={t('auth.password')}
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
                                <Checkbox>{t('auth.remember_me')}</Checkbox>
                                <Link to='/forgot-password'>{t('auth.forgot_password')}</Link>
                            </div>
                        </Form.Item>


                        <Button type="primary" htmlType="submit">
                            {t('auth.sign_in')}
                        </Button>
                    </Form>
                </Flex>
            </Spin>
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