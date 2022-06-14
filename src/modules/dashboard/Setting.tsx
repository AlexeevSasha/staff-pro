import {Button, Modal, Form, Input} from "antd";
import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../core/redux/reduxType";
import {changeOldPasswordThunk} from "../auth/authThunk";
import {errorNotification} from "../../common/components/Notification";


interface IChangePassword {
    oldPassword: string;
    newPassword: string
}


export const Setting = ( ) => {
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = useCallback(() => setIsModalVisible(true), [])
    const closeModal =   () => {
        form.resetFields();
        setIsModalVisible(false)
    }

    const handleOk = ({oldPassword, newPassword}: IChangePassword) => {
        if (oldPassword === newPassword) {
            errorNotification('Новый пароль не может быть, как старый')
            return;
        }
        if (!user) return;
        dispatch(changeOldPasswordThunk({id: user?.id, oldPassword, newPassword, cb: closeModal }))
    };

    return (
        <div>
            <Button type="text" onClick={showModal}>Change password</Button>
            <Modal title="Change password" visible={isModalVisible} onCancel={closeModal}
                   footer={[
                       <Button key='cancel' onClick={closeModal}>Cancel</Button>,
                       <Button key="submit" form='change-password' type="primary" htmlType="submit">
                           Change password
                       </Button>
                   ]}
            >
                <Form  form={form} layout='vertical' id='change-password' onFinish={handleOk}>
                    <Form.Item
                        label='Старый пароль'
                        name="oldPassword"
                        rules={[
                            {required: true, message: 'Please input your old password'},
                            {min: 8, max: 64, message: 'Password must be between 8 and 64 characters'}
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label='Новый пароль'
                        name="newPassword"
                        rules={[
                            {required: true, message: 'Please input your new password'},
                            {min: 8, max: 64, message: 'Password must be between 8 and 64 characters'}
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label='Подтверждение нового пароля'
                        name="confirm"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}