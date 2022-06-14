import {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {selectDrafts} from "../documentSlice";
import {DraftForm, IDrafts} from "../../../api/documents/drafts/draftsDto";
import {Form, Typography, Popconfirm, Table} from "antd";
import {EditableCellDrafts} from "../../../common/hooks/EditableCellDrafts";
import {changeDraftThunk, deleteDraftThunk} from "../documentThunk";



export const TableDrafts: FC = () => {
    const dispatch = useAppDispatch()
    const drafts = useAppSelector(selectDrafts)
    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState<number | null>(null);

    const isEditing = (record: IDrafts) => record.id === editingKey;

    const edit = (record: IDrafts) => {
        form.setFieldsValue({...record});
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(null);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteDraftThunk(id))
    }

    const save = async (id: number) => {
        const data = (await form.validateFields()) as DraftForm;
        dispatch(changeDraftThunk({id, data}))
        cancel()
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '25%',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'body',
            editable: true,
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: 110,
            align: 'center',
            fixed: 'right',
            render: (_: any, record: IDrafts) => {
                const editable = isEditing(record);
                return editable ? (
                    <span style={{fontSize: 12}}>
            <Typography.Link onClick={() => save(record.id)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" placement="rightTop" onConfirm={cancel}>
              <a style={{color: "#ff8686"}}>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== null} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            align: 'center',
            fixed: 'right',
            width: 80,
            render: (_: any, record: IDrafts) => (
                <Popconfirm title={`Sure to delete №${record.id}?`} placement="rightTop"
                            onConfirm={() => handleDelete(record.id)}>
                    <a>Delete</a>
                </Popconfirm>
            )
        },
    ];

    const mergedColumns: any = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IDrafts) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    if (!drafts) return null;

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCellDrafts,
                    },
                }}
                scroll={{x: 700}}
                bordered
                columns={mergedColumns}
                dataSource={drafts}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowKey='id'
            />
        </Form>
    )
}