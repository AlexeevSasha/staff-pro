

import React, {FC} from 'react';
import { Menu} from 'antd';
import {
    PieChartOutlined,
    RiseOutlined,
    FileDoneOutlined,
    SettingOutlined,
    UserOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';
import styled from "styled-components";

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
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Reports', '2', <RiseOutlined />),
    getItem('Documents', 'sub1', <FileDoneOutlined />, [
        getItem('Invoices', '3'),
        getItem('Drafts', '4'),
        getItem('Templates', '5'),
    ]),
    getItem('Customers', 'sub2',<UserOutlined />, [
        getItem('Option 7', '6'),
        getItem('Option 8', '7'),
    ]),
    getItem('Settings', '8', <SettingOutlined />),
    getItem('Help & Contact', '9', <InfoCircleOutlined />),
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
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 50px;
  height: 100vh;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
`

