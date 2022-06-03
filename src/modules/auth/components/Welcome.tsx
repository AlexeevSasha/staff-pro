import {FC} from "react";
import styled from 'styled-components'
import {Typography} from 'antd'
import {FigureAuth} from "../../../common/components/SVG";

const {Text, Title} = Typography;

export const Welcome: FC = () => {
    return (
        <Wrapper>
            <div>
                <Text>Staff Pro</Text>
                <Title level={4}>HR processes are automated,
                    welcome back!
                </Title>
            </div>
            <FigureAuth/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({theme}) => theme.colors.blue};
  width: 500px;
  height: 100%;
  padding: 40px;
  box-shadow: 3px 0 4px 0 rgba(34, 60, 80, 0.2);
  & > div {
    
    & > span {
      color: white;
      font-size: 20px;
      line-height: 28px;
    }

    & > h4 {
      margin-top: 20px !important;
      max-width: 300px;
      width: 100%;
      color: white;
      font-weight: 600;
      font-size: 38px;
    }
    
  }
  
`

