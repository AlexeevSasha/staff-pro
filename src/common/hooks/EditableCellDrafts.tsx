import React from 'react'
import {IDrafts} from "../../api/documents/drafts/draftsDto";
import {Input, Form} from "antd";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    record: IDrafts;
    index: number;
    children: React.ReactNode;
}

export const EditableCellDrafts: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {


    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};