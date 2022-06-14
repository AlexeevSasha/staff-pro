import {FC} from "react";
import {Pie} from '@ant-design/plots';
import {useAppSelector} from "../../../core/redux/reduxType";
import {selectEmployee, selectLoadingCustomers, selectSeeker} from "../../customers/customersSlice";
import {Spin, Typography} from "antd";
import {EmptyStyle, Wrapper} from './style'


export const DiagramCustomers: FC = () => {
    const employee = useAppSelector(selectEmployee)
    const seeker = useAppSelector(selectSeeker)
    const loading = useAppSelector(selectLoadingCustomers)
    const data = seeker?.length && employee?.length ? [
        {
            type: 'Seeker',
            count: seeker.length,
        },
        {
            type: 'Employee',
            count: employee.length,
        },
    ] : [];

    const config = {
        appendPadding: 10,
        data,
        angleField: 'count',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <Wrapper>
            <Spin tip="Loading..." spinning={loading}>
                <Typography.Title level={3}>Customers graphic</Typography.Title>
                {!data.length && !loading &&  <EmptyStyle/>}
                <Pie {...config} style={{height: '300px'}}/>
            </Spin>
        </Wrapper>
    )
}
