import { View } from 'react-native';
import styled from 'styled-components/native'; // styled-components/native로 변경
import LoginBtn from '../../components/LoginBtn';
import LogoutBtn from '../../components/LogoutBtn';

const StyledView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

function Login() {
    return (
        <StyledView>
            <LoginBtn />
            <LogoutBtn />
        </StyledView>
    );
}

export default Login;
