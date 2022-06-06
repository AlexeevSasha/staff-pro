import React, {FC} from 'react';
import {Menu} from 'antd';
import {
    PieChartOutlined,
    RiseOutlined,
    FileDoneOutlined,
    SettingOutlined,
    UserOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd/es/menu';
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to='/dashboard'>Dashboard</NavLink>, '1', <PieChartOutlined/>),
    getItem(<NavLink to='/reports'>Reports</NavLink>, '2', <RiseOutlined/>),
    getItem('Documents', 'sub1', <FileDoneOutlined/>, [
        getItem(<NavLink to='/documents/invoices'>Invoices</NavLink>, '3'),
        getItem(<NavLink to='/documents/drafts'>Drafts</NavLink>, '4'),
        getItem(<NavLink to='/documents/templates'>Templates</NavLink>, '5'),
    ]),
    getItem(<NavLink to='/customers'>Customers</NavLink>, '6', <UserOutlined/>),
    getItem('Settings', '7', <SettingOutlined/>),
    getItem('Help & Contact', '8', <InfoCircleOutlined/>),
];

export const LeftMenu: FC = () => {

    return (
        <MenuStyle
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={items}
        />
    );
}

const MenuStyle = styled(Menu)`
  padding-top: 50px;
  height: 100vh;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
`

