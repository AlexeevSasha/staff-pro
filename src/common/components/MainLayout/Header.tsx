import {Layout, Button, Typography} from 'antd';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from "../../../core/redux/reduxType";
import {BreadcrumbComponent} from "./BreadcrumbComponent";
import {useLocation} from "react-router-dom";
import {logout, selectUser} from "../../../modules/auth/authSlice";
import {useCallback} from "react";

const {Header} = Layout;
const {Title, Paragraph} = Typography

export const HeaderMenu = () => {
    const dispatch = useAppDispatch()
    const location = useLocation();
    const user = useAppSelector(selectUser)
    const exit = useCallback(() => dispatch(logout()), [])
    const path = location.pathname.split('/')
    const lastElem = path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1).toLowerCase();

    return (
        <Header style={{background: 'white', padding: '10px 20px', height: '110px'}}>
            <BreadcrumbComponent/>
            <Flex style={{marginTop: 10}}>
                <Title level={3} style={{margin: 0}}>{lastElem}</Title>
                <User>
                    <Paragraph>{user?.name} {user?.lastname}</Paragraph>
                    <Button onClick={exit}>Выйти</Button>
                </User>
            </Flex>
        </Header>
    )
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media ${({theme}) => theme.media._480} {
    & > h3 {
      font-size: 16px;
    }
  }
`

const User = styled(Flex)`
  gap: 15px;

  & > div {
    margin: 0;
    line-height: 20px;
  }

  @media ${({theme}) => theme.media._480} {
    gap: 5px;
    & > div {
      font-size: 12px;
    }
    & > button {
      font-size: 12px;
      padding: 2px 10px;
    }
  }
`
