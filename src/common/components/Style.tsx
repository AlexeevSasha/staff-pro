import styled from "styled-components";

export const WrapperDisplayNone768 = styled.div`
    display: block;
  @media ${({theme}) => theme.media._768} {
    display: none;
  }
`