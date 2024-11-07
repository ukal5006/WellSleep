import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Main from '../screens/Main';
import Mypage from '../screens/Mypage';
import Exampage from '../screens/Exampage';

const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="홈" component={Login} options={{ headerShown: false }} />
                <Tab.Screen name="수면일지" component={Exampage} options={{ headerShown: false }} />
                <Tab.Screen name="알람" component={Exampage} options={{ headerShown: false }} />
                <Tab.Screen name="마이페이지" component={Mypage} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default NavBar;
