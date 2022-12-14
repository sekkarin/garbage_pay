const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
import { Text, View, StyleSheet, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons'
import Colors from '../constants/Colors';
import Textstyles from '../constants/Textstyles';
import Dashboard from '../screens/admin/Dashboard';
import BillScreen from '../screens/admin/BillScreen';

const Tab = createBottomTabNavigator();



function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

export default Main = () => {
    return <Tab.Navigator screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: { height: 83 },
        tabBarLabelStyle: { fontSize: 18, color: "black" },
        
      }}>
        <Tab.Screen options={{

            title: "ภาพรวม", tabBarIcon: () => {
                return <Icon name="home" size={47} color={Colors.secondary} />
            }
        }} name="Dashboard" component={Dashboard} />
        <Tab.Screen options={{
            title: "บิล", tabBarIcon: () => {
                return <Image source={require('../assets/icons/coin.png')} style={{ height: 47, width: 47 }} />
            }
        }} name="BillScrenn" component={BillScreen} />
        <Tab.Screen options={{
            title: "จัดการสมาชิก", tabBarIcon: () => {
                return <Image source={require('../assets/icons/more.png')} style={{ height: 47, width: 47 }} />
            }
        }} name="Settings" component={SettingsScreen} />
        {/* <Tab.Screen name='Bill' component={NavigationBill}/> */}
    </Tab.Navigator>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerStyle: {
        backgroundColor: Colors.primary,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        height: 65,
    },
    headerTitleStyle: {

        fontSize: Textstyles.fontTitle,
        fontFamily: Textstyles.fontMainBold

    }
})
