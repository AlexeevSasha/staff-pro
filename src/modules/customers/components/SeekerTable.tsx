import {FC, useMemo} from "react";
import {Popconfirm, Table} from "antd";
import type {ColumnsType} from 'antd/lib/table';
import {SeekerFromServiceType} from "../../../api/customers/customersDto";
import {getAge} from "../../../core/utils/getAge";
import {firstCharUppercase} from "../../../core/utils/firstCharUppercase";
import {useAppDispatch} from "../../../core/redux/reduxType";
import {deleteSeekerThunk} from "../customersThunk";
import {WrapperDisplayNone768} from "../../../common/components/Style";


interface IProps {
    seeker: SeekerFromServiceType[],
}

export const SeekerTable: FC<IProps> = ({seeker}) => {
    const dispatch = useAppDispatch()
    const handleDelete = (id: number) => {
        dispatch(deleteSeekerThunk(id))
    }

    const columns: ColumnsType<SeekerFromServiceType> = useMemo(() => (
        [
            {
                title: 'Name', dataIndex: 'name', key: 'id',
                render: (_, {name, lastname}) =>
                    <div>{firstCharUppercase(name)}&nbsp;{firstCharUppercase(lastname)}</div>
            },
            {
                title: 'Age', dataIndex: 'age', key: 'id',
                render: (_, {year, month, day}) => <div>{getAge(`${year}/${month}/${day}`)}</div>,
                sorter: (a, b) => getAge(`${a.year}/${a.month}/${a.day}`) - getAge(`${b.year}/${b.month}/${b.day}`),
                sortDirections: ['ascend', 'descend', 'ascend'],
            },
            {title: 'Email', dataIndex: 'email', key: 'id'},
            {
                title: 'Sex', dataIndex: 'sex', key: 'id',
                filters: [
                    {
                        text: 'man',
                        value: 'man',
                    },
                    {
                        text: 'woman',
                        value: 'woman',
                    },
                ],
                onFilter: (value: any, {sex}) => sex.indexOf(value) === 0,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (_, {id}) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(id)}>
                        <a>Delete</a>
                    </Popconfirm>
                )
            },
        ]
    ), [])

    return (
        <WrapperDisplayNone768>
            <Table
                columns={columns}
                dataSource={seeker}
                rowKey="id"
                pagination={{pageSize: 10}}
            />
        </WrapperDisplayNone768>
    )
}
