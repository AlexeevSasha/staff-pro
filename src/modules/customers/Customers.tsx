import {FC} from "react";
import {Tabs} from 'antd';
import {Seeker} from "./components/Seeker";
import {Employee} from "./components/Employee";
import styled from "styled-components";

const { TabPane } = Tabs;

export const Customers: FC = () => {
  return (
      <TabsStyle  type="card">
        <TabPane tab="Seeker" key="1">
            <Seeker/>
        </TabPane>
        <TabPane tab="Employee" key="2">
         <Employee/>
        </TabPane>
      </TabsStyle>
  )
}

const TabsStyle = styled(Tabs)`
  gap: 20px;

  &.ant-tabs>.ant-tabs-nav, .ant-tabs>div>.ant-tabs-nav{
    padding: 0 20px;
    background: white;
    margin: 0;
  }
  &.ant-tabs .ant-tabs-content-holder {
    margin: 0 20px;
  }

  @media ${({theme}) => theme.media._768} {
    gap: 10px;
  }
`
