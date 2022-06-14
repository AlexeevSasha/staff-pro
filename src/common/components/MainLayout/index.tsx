import {LeftMenu} from "./Menu";
import styled from "styled-components";
import {HeaderMenu} from "./Header";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {Button, Layout} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";


const {Content} = Layout;

export const MainLayout = () => {
    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible(!visible);
    return (
        <>
            <BlackDiv visible={visible} onClick={toggle}/>
            <div style={{background: '#F0F2F5', minHeight: '100vh'}}>
                <Wrapper><HeaderMenu/></Wrapper>
                <LeftMenuStyle visible={visible}>
                    <LeftMenu/>
                    <Button onClick={toggle} type="primary" icon={visible ? <MenuFoldOutlined/> : <MenuUnfoldOutlined />}/>
                </LeftMenuStyle>
                <Wrapper>
                    <ContentStyle>
                        <Outlet/>
                    </ContentStyle>
                </Wrapper>
            </div>
        </>
    );
}

const ContentStyle = styled(Content)`
    min-height: calc(100vh - 110px);
`

const BlackDiv = styled.div<{ visible: boolean }>`
  position: fixed;
  display: none;
  width: 100vw;
  height: 100%;
  opacity: .5;
  z-index: 1;
  background: black;
  @media ${({theme}) => theme.media._980} {
    display: ${({visible}) => visible ? 'block' : 'none'};
  }
 
`

const Wrapper = styled.div`
  margin-left: 200px;
  @media ${({theme}) => theme.media._980} {
    margin-left: 0;
  }
`
const LeftMenuStyle = styled.div<{ visible: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  & > button {
    display: none;
    position: absolute;
    right: -32px;
    top: 30px;
    opacity: .5;
    
  }
}

@media ${({theme}) => theme.media._980} {
  transition: all .3s linear;
  left: ${({visible}) => visible ? '0' : '-200px'};
  & > button {
    display: block;
  }
`



