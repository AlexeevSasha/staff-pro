import {FC} from "react";
import {Button, Form, Input, Typography} from "antd";
import {useAppDispatch} from "../../../../core/redux/reduxType";
import {changePasswordThunk} from "../../authThunk";
import {useNavigate} from "react-router-dom";

const {Title} = Typography


export const ChangePassword: FC<{id: string}> = ({id}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const changePassword =  ({password} : {password: string}) => {
            dispatch(changePasswordThunk({id, password, cb: () => navigate('/')}))
    };
    return (
        <>
            <Title level={3}>Введите новый пароль</Title>
            <Form
                name="signIn"
                layout='vertical'
                initialValues={{remember: true}}
                onFinish={changePassword}
                autoComplete="off"
            >
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

                <Button type="primary" htmlType="submit">
                    Подтвердить
                </Button>
            </Form>
        </>
    )
}