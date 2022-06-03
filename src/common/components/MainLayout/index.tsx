import {LeftMenu} from "./Menu";
import styled from "styled-components";


export const MainLayout = () => {
    return (
        <div style={{background: '#F0F2F5', height: '100vh'}}>
            <Header>asfasdfsdfsaddasd</Header>
            <LeftMenu/>
            <div style={{marginLeft: 200}}>
                <Content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem fugit laudantium nostrum
                    reprehenderit
                    temporibus. Aliquid delectus enim est eum facere fugit. Assumenda autem cum cumque doloribus esse,
                    ipsam
                    itaque omnis.
                </Content>
            </div>
        </div>
    );
}

const Header = styled.div`
 margin-left: 200px;
  background: white;
`

const Content = styled.div`
  background: white;
`




