import {FC} from "react";
import {Outlet} from 'react-router-dom'
import {Layout, Col, Row} from 'antd';
import {Welcome} from "./Welcome";
import {LanguageHeader} from "./LanguageHeader";
import styled from "styled-components";

const {Content} = Layout;

export const LayoutAuth: FC = () => {
    return (
        <Layout>
            <LanguageHeader/>
            <Layout>
                <RowStyle wrap={false}>
                    <ColStyle flex='500px'>
                        <Welcome/>
                    </ColStyle>
                    <Col flex="auto">
                        <Content style={{height: '100%'}}>
                            <Outlet/>
                        </Content>
                    </Col>
                </RowStyle>
            </Layout>

        </Layout>
    )
}

const RowStyle = styled(Row)`
  min-height: calc(100vh - 64px);
`

const ColStyle = styled(Col)`
  @media ${({theme}) => theme.media._980} {
    display: none;
  }
`
