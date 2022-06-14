import styled from "styled-components";
import {Empty} from "antd";

export const Wrapper = styled.div`
  position: relative;
  background: white;
  padding: 0 20px;
  margin-bottom: 10px;

  & > h3 {
    margin-bottom: 25px;
  }
`
export const EmptyStyle = styled(Empty)`
  position: absolute;
  top: 50%;  
  left: 50%;
  transform: translate(-50%, -50%);
`
