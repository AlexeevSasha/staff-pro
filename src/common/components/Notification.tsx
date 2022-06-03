import { message } from 'antd';

export const succesNotification = (str: string) : void => {
    message.success(str);
};

export const errorNotification = (str: string) : void => {
    message.error(str);
};

export const warningNotification = (str: string) : void  => {
    message.warning(str);
};