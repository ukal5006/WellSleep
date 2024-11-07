import { Image, ImageBackground, Switch, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const SleepLabContainer = styled(ImageBackground)`
    align-items: center;
    flex: 1;
`;

function SleepLab() {
    return <SleepLabContainer source={require('@assets/backgroundImg.png')}></SleepLabContainer>;
}

export default SleepLab;
