import {FC, useState} from "react";
import styled from "styled-components";
import {CheckEmail} from "../components/StepForgotPassword/CheckEmail";
import {ChangePassword} from "../components/StepForgotPassword/ChangePassword";


export const ForgotPassword: FC = () => {
    const [isFlag, setIsFlag] = useState(false)
    const [idUser, setIdUser] = useState('')
    return (
        <Flex>
            {isFlag ? <ChangePassword id={idUser}/> :  <CheckEmail  idUser={setIdUser} isFlag={setIsFlag}/>}
        </Flex>
    )
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  height: 100%;

  & > div, h3 {
    margin: 0;
  }

  & > form {
    max-width: 300px;
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`