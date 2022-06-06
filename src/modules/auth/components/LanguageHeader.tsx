import {Layout, Typography, Select,} from "antd";
import {GlobalOutlined, CloseOutlined} from "@ant-design/icons";
import styled from "styled-components";

const {Header} = Layout;
const {Text} = Typography;
const {Option} = Select;

export const LanguageHeader = () => {

    return (
        <HeaderStyle>
            <Flex>
                <GlobalOutlined style={{fontSize: 21, color: '#8C8C8C'}}/>
                <TextStyle>Сменить язык на <span style={{color: '#1890ff'}}>english</span>? </TextStyle>
                <SelectStyle defaultValue="русский" bordered={false} dropdownStyle={{minWidth: "120px"}}>
                    <Option value="русский">Русский</Option>
                    <Option value="english">English</Option>
                </SelectStyle>
            </Flex>
            <CloseOutlined/>
        </HeaderStyle>
    )
}

const SelectStyle = styled(Select)`
  padding: 0;
  color: #1890ff;
  width: 100px;

  .ant-select-arrow .anticon > svg {
    fill: ${({theme}) => theme.colors.blue};
  }

  @media ${({theme}) => theme.media._480} {
    font-size: 14px;
  }
`

const HeaderStyle = styled(Header)`
  position: relative;
  background: white;
  z-index: 5;
  box-shadow: 0 3px 5px 0 rgba(34, 60, 80, 0.2);
  font-size: 16px;
  line-height: 0;

  & > span {
    cursor: pointer;
    position: absolute;
    top: 24px;
    right: 30px;
    color: #E8E8E8;
  }

  @media ${({theme}) => theme.media._480} {
    padding: 0 16px;
    font-size: 12px;

    & > span {
      right: 8px;
      top: 26px;
    }
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const TextStyle = styled(Text)`
  position: relative;
  margin-left: 12px;
  padding-right: 12px;

  &::after {
    position: absolute;
    content: '';
    right: 0;
    top: -11px;
    width: 1px;
    height: 24px;
    background: #E8E8E8;
  }


`
