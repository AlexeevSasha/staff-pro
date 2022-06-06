import {FC} from "react";
import {Tabs} from 'antd';
import {Seeker} from "./components/Seeker";
import {Employee} from "./components/Employee";

const { TabPane } = Tabs;

export const Customers: FC = () => {
  return (
      <Tabs  type="card">
        <TabPane tab="Seeker" key="1">
            <Seeker/>
        </TabPane>
        <TabPane tab="Employee" key="2">
         <Employee/>
        </TabPane>
      </Tabs>
  )
}
