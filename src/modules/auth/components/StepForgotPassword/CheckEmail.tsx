import {FC} from "react";
import {Button, Form, Input, Typography} from "antd";
import {Link} from "react-router-dom";
import {searchEmailUsers} from "../../../../api/auth/authService";
import {errorNotification} from "../../../../common/components/Notification";

const {Paragraph, Title} = Typography


interface IProps {
    idUser: (id: string) => void;
    isFlag: (bool: boolean) => void;
}

export const CheckEmail: FC<IProps> = ({isFlag, idUser}) => {
    const checkEmail = async ({email}: { email: string }) => {
        const searchEmail = await searchEmailUsers(email)
        if (!searchEmail.length) {
            errorNotification('Email не существует')
        } else {
            const id = searchEmail[0].id
            idUser(id)
            isFlag(true)
        }
    };
    return (
        <>
            <Title level={3}>Забыли пароль?</Title>
            <Paragraph style={{maxWidth: '300px', width: '100%'}}>Введите ваш эл. адрес, чтобы восстановить доступ к
                своему аккаунту</Paragraph>
            <Form
                name="signIn"
                layout='vertical'
                initialValues={{remember: true}}
                onFinish={checkEmail}
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

                <Button type="primary" htmlType="submit">
                    Подтвердить
                </Button>
            </Form>
            <div>Впервые в StaffPro?&nbsp;<Link to='/register'>Зарегистрироваться</Link>
            </div>
        </>
    )
}