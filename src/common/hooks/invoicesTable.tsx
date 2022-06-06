import {ColumnsType} from "antd/lib/table";
import {InvoicesFromServer, invoicesType} from "../../api/invoices/invoicesDto";
import moment from "moment";
import {Tag} from "antd";


const colorsType = (type: invoicesType) => {
    switch (type) {
        case "archived":
            return 'blue';
        case "unpaid":
            return 'red';
        case "paid":
            return 'green';
        case "due":
            return 'cyan';
    }
}

export const columns: ColumnsType<InvoicesFromServer> = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'id',
        render: text => <div style={{color: '#1890ff'}}>{text}</div>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'id',
        render: descr => <p style={{margin: 0}}>{descr}</p>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'id',
        sorter: (a, b) => Number(a.price.slice(0, -1)) - Number(b.price.slice(0, -1)),
        sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'id',
        render: (_, type) => {
            const color = colorsType(type.type)
            return (
                <Tag color={color} key={type.type}>
                    {type.type.toUpperCase()}
                </Tag>
            )
        },
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'id',
        render: (_, date) => (
            <>
                {moment(date.date).subtract(10, 'days').calendar()}
            </>
        ),
    },
];